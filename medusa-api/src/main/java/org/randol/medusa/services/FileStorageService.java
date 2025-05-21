package org.randol.medusa.services;

import org.apache.tika.Tika;
import org.apache.tika.mime.MimeType;
import org.apache.tika.mime.MimeTypeException;
import org.apache.tika.mime.MimeTypes;
import org.randol.medusa.config.FileStorageConfig;
import org.randol.medusa.exceptions.MedusaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FileStorageService {
    private final Path fileStorageLocation;
    private final Tika tika;
    private final Set<String> allowedMimeTypes;
    private final long maxFileSize;

    @Autowired
    public FileStorageService(FileStorageConfig fileStorageConfig) {
        this.fileStorageLocation = Paths.get(fileStorageConfig.getUploadDir())
                .toAbsolutePath().normalize();
        this.allowedMimeTypes = fileStorageConfig.getAllowedMimeTypes();
        this.maxFileSize = fileStorageConfig.getMaxFileSize();
        this.tika = new Tika();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new MedusaException("Could not create the directory where the uploaded files will be stored.", 
                MedusaException.ErrorType.FILESYSTEM, ex);
        }
    }

    public Resource getFile(String filename) {
        try {
            Path filePath = this.fileStorageLocation.resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());
            return (resource.exists() && resource.isReadable()) ? resource : null;
        } catch (IOException e) {
            log.error("Error accessing file {}: {}", filename, e.getMessage(), e);
            return null;
        }
    }
    
    // Existing method for MultipartFile
    public String storeFile(MultipartFile file) throws IOException {
        // Your existing logic to store MultipartFile
        String fileName = UUID.randomUUID().toString();
        Path targetLocation = this.fileStorageLocation.resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation);
        return fileName;
    }

    // New method for File
    public String storeFile(File file) throws IOException {
        // Convert File to MultipartFile and delegate to the existing method
        MultipartFile multipartFile = new CustomMultipartFile(file, Files.probeContentType(file.toPath()));
        return storeFile(multipartFile);
    }

    // Reuse your existing utility class (or define it here if not already done)
    private static class CustomMultipartFile implements MultipartFile {
        private final File file;
        private final String contentType;

        public CustomMultipartFile(File file, String contentType) {
            this.file = file;
            this.contentType = contentType;
        }

        @Override
        public String getName() {
            return "file";
        }

        @Override
        public String getOriginalFilename() {
            return file.getName();
        }

        @Override
        public String getContentType() {
            return contentType;
        }

        @Override
        public boolean isEmpty() {
            return file.length() == 0;
        }

        @Override
        public long getSize() {
            return file.length();
        }

        @Override
        public byte[] getBytes() throws IOException {
            return Files.readAllBytes(file.toPath());
        }

        @Override
        public InputStream getInputStream() throws IOException {
            return new FileInputStream(file);
        }

        @Override
        public void transferTo(File dest) throws IOException {
            Files.copy(file.toPath(), dest.toPath());
        }
    }

    private void validateFile(MultipartFile file) {
        log.debug("Validating file: {}", file.getOriginalFilename());
        if (file.isEmpty()) {
            throw new MedusaException("Failed to store empty file", MedusaException.ErrorType.VALIDATION);
        }

        if (file.getSize() > maxFileSize) {
            throw new MedusaException("File size exceeds maximum limit of 100MB", MedusaException.ErrorType.VALIDATION);
        }

        String mimeType = detectMimeType(file);
        if (!allowedMimeTypes.contains(mimeType)) {
            throw new MedusaException("File type not allowed. Allowed types: " + 
                String.join(", ", allowedMimeTypes), 
                MedusaException.ErrorType.VALIDATION);
        }
    }

    private String detectMimeType(MultipartFile file) {
        log.debug("Detecting MIME type for file: {}", file.getOriginalFilename());
        try {
            String mimeType = tika.detect(file.getInputStream());
            log.debug("Detected MIME type: {} for file: {}", mimeType, file.getOriginalFilename());
            return mimeType;
        } catch (IOException e) {
            log.error("Error detecting MIME type for file {}: {}", file.getOriginalFilename(), e.getMessage(), e);
            throw new MedusaException("Error detecting file type", 
                MedusaException.ErrorType.FILESYSTEM, e);
        }
    }

    private String getExtensionFromMimeType(String mimeType) {
        try {
            MimeType mime = MimeTypes.getDefaultMimeTypes().forName(mimeType);
            return mime.getExtension().substring(1); // Remove the leading dot
        } catch (MimeTypeException e) {
            throw new MedusaException("Error getting file extension for MIME type: " + mimeType, 
                MedusaException.ErrorType.FILESYSTEM, e);
        }
    }

    public void deleteFile(String filename) {
        log.info("Deleting file: {}", filename);
        try {
            Path filePath = this.fileStorageLocation.resolve(filename);
            Files.deleteIfExists(filePath);
            log.info("Successfully deleted file: {}", filename);
        } catch (IOException ex) {
            log.error("Failed to delete file {}: {}", filename, ex.getMessage(), ex);
            throw new MedusaException("Could not delete file " + filename, 
                MedusaException.ErrorType.FILESYSTEM, ex);
        }
    }

} 