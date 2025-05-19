package org.randol.medusa.controllers;

import org.randol.medusa.dto.MediaRequestDTO;
import org.randol.medusa.dto.MediaResponseDTO;
import org.randol.medusa.entities.Media;
import org.randol.medusa.services.MediaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import java.util.List;
import java.util.stream.Collectors;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/media/v1")
@RequiredArgsConstructor
@Validated
@Slf4j
@Tag(name = "Media", description = "Media management APIs")
public class MediaController {

    private final MediaService mediaService;

    @GetMapping
    @Operation(summary = "Get all media items")
    public ResponseEntity<List<MediaResponseDTO>> getAllMedias() {
        List<Media> medias = mediaService.getAllMedias();
        List<MediaResponseDTO> responseDTOs = medias.stream()
            .map(MediaResponseDTO::fromEntity)
            .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @Operation(summary = "Get media by ID")
    @GetMapping("/{id}")
    public ResponseEntity<MediaResponseDTO> getMediaById(@Parameter @PathVariable Integer id) {
        Media media = mediaService.getMediaById(id);
        return ResponseEntity.ok(MediaResponseDTO.fromEntity(media));
    }

    @Operation(summary = "Get media file by ID")
    @GetMapping("/{id}/file")
    public ResponseEntity<Resource> getFileForMediaId(@Parameter @PathVariable Integer id) {
        try {
            Resource file = mediaService.getFileForMediaId(id);
            if (file != null) {
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                    .body(file);
            } else {
                log.error("Media was found but value is null. Returning error");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error serving media file with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Create new media")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MediaResponseDTO> createMedia(@Parameter @RequestParam("file") MultipartFile file) {
        Media media = mediaService.createMedia(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(MediaResponseDTO.fromEntity(media));
    }

    @Operation(summary = "Update media")
    @PutMapping("/{id}")
    public ResponseEntity<MediaResponseDTO> updateMedia(@Parameter @PathVariable Integer id, @Parameter @Valid @RequestBody MediaRequestDTO requestDTO) {
        Media media = mediaService.updateMedia(id, requestDTO);
        return ResponseEntity.ok(MediaResponseDTO.fromEntity(media));
    }

    @Operation(summary = "Delete media by id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@Parameter @PathVariable Integer id) {
        mediaService.deleteMediaById(id);
        return ResponseEntity.noContent().build();
    }

}