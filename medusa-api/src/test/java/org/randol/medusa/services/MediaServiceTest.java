package org.randol.medusa.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.randol.medusa.dto.MediaRequestDTO;
import org.randol.medusa.entities.Media;
import org.randol.medusa.repositories.MediaRepository;
import org.randol.medusa.exceptions.MedusaException;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MediaServiceTest {
    @Mock
    private MediaRepository mediaRepository;
    
    @Mock
    private FileStorageService fileStorageService;
    
    @InjectMocks
    private MediaService mediaService;

    @Test
    void shouldGetAllMedias() {
        // Given
        Media media1 = new Media();
        media1.setId(1);
        media1.setFilename("test1.jpg");
        
        Media media2 = new Media();
        media2.setId(2);
        media2.setFilename("test2.jpg");
        
        when(mediaRepository.findAll()).thenReturn(Arrays.asList(media1, media2));
        
        // When
        List<Media> result = mediaService.getAllMedias();
        
        // Then
        assertEquals(2, result.size());
        assertEquals("test1.jpg", result.get(0).getFilename());
        assertEquals("test2.jpg", result.get(1).getFilename());
    }

    @Test
    void shouldGetMediaById() {
        // Given
        Media media = new Media();
        media.setId(1);
        media.setFilename("test.jpg");
        when(mediaRepository.findById(1)).thenReturn(Optional.of(media));
        
        // When
        Media result = mediaService.getMediaById(1);
        
        // Then
        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("test.jpg", result.getFilename());
    }

    @Test
    void shouldCreateMedia() throws IOException {
        // Given
        MultipartFile file = mock(MultipartFile.class);
        when(file.getOriginalFilename()).thenReturn("test.jpg");
        when(fileStorageService.storeFile(file)).thenReturn("stored-file.jpg");
        
        Media savedMedia = new Media();
        savedMedia.setId(1);
        savedMedia.setFilename("test.jpg");
        savedMedia.setStorageLocation("stored-file.jpg");
        savedMedia.setImportedAt(LocalDateTime.now());
        savedMedia.setLastModified(LocalDateTime.now());
        when(mediaRepository.save(any(Media.class))).thenReturn(savedMedia);
        
        // When
        Media result = mediaService.createMedia(file);
        
        // Then
        assertNotNull(result);
        assertEquals("test.jpg", result.getFilename());
        assertEquals("stored-file.jpg", result.getStorageLocation());
        assertNotNull(result.getImportedAt());
        assertNotNull(result.getLastModified());
        verify(mediaRepository).save(any(Media.class));
    }

    @Test
    void shouldUpdateMedia() {
        // Given
        Media existingMedia = new Media();
        existingMedia.setId(1);
        existingMedia.setFilename("old.jpg");
        existingMedia.setStorageLocation("old-location.jpg");
        existingMedia.setImportedAt(LocalDateTime.now().minusDays(1));
        
        when(mediaRepository.findById(1)).thenReturn(Optional.of(existingMedia));
        when(mediaRepository.save(any(Media.class))).thenReturn(existingMedia);
        
        // When
        MediaRequestDTO requestDTO = new MediaRequestDTO();
        requestDTO.setFilename("new.jpg");
        requestDTO.setStorageLocation("new-location.jpg");
        Media result = mediaService.updateMedia(1, requestDTO);
        
        // Then
        assertNotNull(result);
        assertEquals("new.jpg", result.getFilename());
        assertEquals("new-location.jpg", result.getStorageLocation());
        assertTrue(result.getLastModified().isAfter(result.getImportedAt()));
    }

    @Test
    void shouldGetFileForMediaId() throws IOException {
        // Given
        Media media = new Media();
        media.setId(1);
        media.setStorageLocation("test.jpg");
        Resource mockResource = mock(Resource.class);
        
        when(mediaRepository.findById(1)).thenReturn(Optional.of(media));
        when(fileStorageService.getFile("test.jpg")).thenReturn(mockResource);
        
        // When
        Resource result = mediaService.getFileForMediaId(1);
        
        // Then
        assertNotNull(result);
        verify(fileStorageService).getFile("test.jpg");
    }

    @Test
    void shouldDeleteMediaAndFile() {
        // Given
        Media media = new Media();
        media.setId(1);
        media.setStorageLocation("test.jpg");
        when(mediaRepository.findById(1)).thenReturn(Optional.of(media));
        
        // When
        mediaService.deleteMediaById(1);
        
        // Then
        verify(fileStorageService).deleteFile("test.jpg");
        verify(mediaRepository).deleteById(1);
    }

    @Test
    void shouldThrowExceptionWhenMediaNotFound() {
        when(mediaRepository.findById(1)).thenReturn(Optional.empty());
        assertThrows(MedusaException.class, () -> mediaService.getMediaById(1));
    }

    @Test
    void shouldThrowExceptionWhenFileStorageFails() throws IOException {
        // Given
        MultipartFile file = mock(MultipartFile.class);
        when(file.getOriginalFilename()).thenReturn("test.jpg");
        when(fileStorageService.storeFile(file)).thenThrow(new MedusaException("Storage failed", MedusaException.ErrorType.FILESYSTEM));
        
        // When/Then
        assertThrows(MedusaException.class, () -> mediaService.createMedia(file));
    }
} 