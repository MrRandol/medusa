package org.randol.medusa.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import org.randol.medusa.exceptions.MedusaException;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeTypeUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class LocalImportService {

    private final MediaService mediaService;
    // Hardcoded folder path (adjust as needed)
    private static final String IMPORT_FOLDER_PATH = "E:/MedusaTest";

    // Allowed MIME types (e.g., images and videos)
    private static final List<String> ALLOWED_MIME_TYPES = Arrays.asList(
        MimeTypeUtils.IMAGE_JPEG_VALUE,
        MimeTypeUtils.IMAGE_PNG_VALUE,
        MimeTypeUtils.IMAGE_GIF_VALUE,
        "video/mp4",
        "video/quicktime"
    );

    public void startImport(String folderPath) {
        log.info("Starting local import from folder: {}", folderPath);

        File importFolder = new File(folderPath);
        if (!importFolder.exists() || !importFolder.isDirectory()) {
            throw new MedusaException(
                "Import folder does not exist or is not a directory: " + folderPath,
                MedusaException.ErrorType.FILESYSTEM
            );
        }

        // List files in the folder
        File[] files = importFolder.listFiles();
        if (files == null || files.length == 0) {
            throw new MedusaException(
                "No files found in the import folder: " + folderPath,
                MedusaException.ErrorType.FILESYSTEM
            );
        }

        // Filter and process media files
        for (File file : files) {
            log.info("Processing file: {}", file.getName());
            if (file.isFile() && isMediaFile(file)) {
                importFile(file);
            }
        }
    }

    private boolean isMediaFile(File file) {
        try {
            String mimeType = Files.probeContentType(file.toPath());
            return mimeType != null && ALLOWED_MIME_TYPES.contains(mimeType);
        } catch (IOException e) {
            return false;
        }
    }

    private void importFile(File file) {
        try {
            Path path = Paths.get(file.getAbsolutePath());
            String fileName = file.getName();
            String contentType = Files.probeContentType(path);
            
            log.info("Importing file: " + fileName + " (MIME: " + contentType + ")");
            mediaService.createMedia(file);
        } catch (IOException e) {
            log.error("Failed to import file: " + file.getName());
            e.printStackTrace();
        }
    }
}