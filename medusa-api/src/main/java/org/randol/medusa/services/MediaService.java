package org.randol.medusa.services;

import org.randol.medusa.dto.MediaRequestDTO;
import org.randol.medusa.entities.Media;
import org.randol.medusa.repositories.MediaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.randol.medusa.exceptions.MedusaException;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service layer is where all the business logic lies
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService {

    private final MediaRepository mediaRepository;
    private final FileStorageService fileStorageService;

    public List<Media> getAllMedias() {
        log.debug("Fetching all media items");
        List<Media> mediaList = mediaRepository.findAll();
        log.debug("Found {} media items", mediaList.size());
        return mediaList;
    }

    public Media getMediaById(Integer id) {
        log.debug("Fetching media with id: {}", id);
        return mediaRepository.findById(id)
            .orElseThrow(() -> {
                log.warn("No media found with id: {}", id);
                return new MedusaException("No media found with id: " + id, MedusaException.ErrorType.NOT_FOUND);
            });
    }

    @Transactional
    public Media createMedia(MultipartFile file) {
        log.info("Creating new media with file: {}", file.getOriginalFilename());
        try {
            String storageLocation = fileStorageService.storeFile(file);
            Media media = new Media();
            media.setFilename(file.getOriginalFilename());
            media.setStorageLocation(storageLocation);
            media.setImportedAt(LocalDateTime.now());
            media.setLastModified(LocalDateTime.now());
            Media savedMedia = mediaRepository.save(media);
            log.info("Successfully created media with id: {}", savedMedia.getId());
            return savedMedia;
        } catch (Exception e) {
            log.error("Error creating media: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    public Media updateMedia(Integer id, MediaRequestDTO requestDTO) {
        log.info("Updating media with id: {}", id);
        try {
            Media existingMedia = getMediaById(id);
            existingMedia.setFilename(requestDTO.getFilename());
            existingMedia.setStorageLocation(requestDTO.getStorageLocation());
            existingMedia.setLastModified(LocalDateTime.now());
            
            Media updatedMedia = mediaRepository.save(existingMedia);
            log.info("Successfully updated media with id: {}", id);
            return updatedMedia;
        } catch (Exception e) {
            log.error("Error updating media with id {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    public void deleteMediaById(Integer id) {
        log.info("Deleting media with id: {}", id);
        try {
            Media media = getMediaById(id);
            fileStorageService.deleteFile(media.getStorageLocation());
            mediaRepository.deleteById(id);
            log.info("Successfully deleted media with id: {}", id);
        } catch (Exception e) {
            log.error("Error deleting media with id {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }

    public Resource getFileForMediaId(Integer id) {
        log.info("Getting file for media with id: {}", id);
        try {
            Media media = getMediaById(id);
            // TODO : look into implementing a mapping between id and filename in the db + caching
            Resource resource = fileStorageService.getFile(media.getStorageLocation());
            log.info("Successfully retrieved file for media with id: {}", id);
            return resource;
        } catch (Exception e) {
            log.error("Error getting file for media with id {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }
}