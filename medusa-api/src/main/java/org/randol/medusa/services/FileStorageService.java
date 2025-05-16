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
import java.io.IOException;
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
    
    public String storeFile(MultipartFile file) {
        if (file == null) {
            throw new MedusaException("File cannot be null", MedusaException.ErrorType.VALIDATION);
        }
        String filename = file.getOriginalFilename();
        if (filename == null) {
            log.info("No filename provided, generating random UUID");
            filename = UUID.randomUUID().toString();
        }
        String originalFilename = StringUtils.cleanPath(filename);
        log.info("Storing file: {}", originalFilename);

        validateFile(file);

        String mimeType = detectMimeType(file);
        String fileExtension = getExtensionFromMimeType(mimeType);
        String newFilename = UUID.randomUUID().toString() + "." + fileExtension;

        try {
            Path targetLocation = this.fileStorageLocation.resolve(newFilename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            log.info("Successfully stored file: {} as {}", originalFilename, newFilename);
            return newFilename;
        } catch (IOException ex) {
            log.error("Failed to store file {}: {}", originalFilename, ex.getMessage(), ex);
            throw new MedusaException("Could not store file " + originalFilename + ". Please try again!", 
                MedusaException.ErrorType.FILESYSTEM, ex);
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