package org.randol.medusa.services;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.randol.medusa.config.FileStorageConfig;
import org.randol.medusa.exceptions.MedusaException;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FileStorageServiceTest {
    @Mock
    private FileStorageConfig config;
    
    @Mock
    private MultipartFile file;
    
    private FileStorageService fileStorageService;
    
    private static final long MAX_FILE_SIZE = 104857600;
    
    @BeforeEach
    void setUp() throws IOException {
        // Create test directory
        Path testDir = Paths.get("./test-uploads");
        Files.createDirectories(testDir);
        
        // Setup config
        when(config.getUploadDir()).thenReturn(testDir.toString());
        when(config.getMaxFileSize()).thenReturn(100L * 1024 * 1024); // 100MB
        when(config.getAllowedMimeTypes()).thenReturn(Set.of("image/jpeg", "image/png"));
        
        // Initialize service
        fileStorageService = new FileStorageService(config);
    }

    @AfterEach
    void tearDown() throws IOException {
        // Cleanup test directory
        Path testDir = Paths.get("./test-uploads");
        Files.walk(testDir)
            .sorted(Comparator.reverseOrder())
            .forEach(path -> {
                try {
                    Files.delete(path);
                } catch (IOException e) {
                    // Ignore
                }
            });
    }

    @Test
    void shouldRejectNullFile() {
        assertThrows(MedusaException.class, () -> fileStorageService.storeFile(null));
    }

    @Test
    void shouldRejectEmptyFile() throws IOException {
        when(file.isEmpty()).thenReturn(true);
        assertThrows(MedusaException.class, () -> fileStorageService.storeFile(file));
    }

    @Test
    void shouldRejectFileExceedingMaxSize() throws IOException {
        when(file.isEmpty()).thenReturn(false);
        when(file.getSize()).thenReturn(MAX_FILE_SIZE); // 200MB
        assertThrows(MedusaException.class, () -> fileStorageService.storeFile(file));
    }

    @Test
    void shouldRejectInvalidMimeType() throws IOException {
        when(file.isEmpty()).thenReturn(false);
        when(file.getSize()).thenReturn(1024L); // 1KB
        when(file.getInputStream()).thenReturn(new ByteArrayInputStream(new byte[0]));
        // Mock Tika to return invalid MIME type
        assertThrows(MedusaException.class, () -> fileStorageService.storeFile(file));
    }
} 