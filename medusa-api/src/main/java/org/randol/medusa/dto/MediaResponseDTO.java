package org.randol.medusa.dto;

import lombok.Data;
import java.time.LocalDateTime;

import org.randol.medusa.entities.Media;
import org.springframework.beans.BeanUtils;

@Data
public class MediaResponseDTO {
    private Integer id;
    private String filename;
    private String storageLocation;
    private LocalDateTime importedAt;
    private LocalDateTime lastModified;

    public static MediaResponseDTO fromEntity(Media media) {
        MediaResponseDTO dto = new MediaResponseDTO();
        BeanUtils.copyProperties(media, dto);
        return dto;
    }
} 