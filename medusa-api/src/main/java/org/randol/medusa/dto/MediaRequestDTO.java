package org.randol.medusa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class MediaRequestDTO {
    private Integer id;

    @NotNull(message = "Filename is required")
    @NotBlank(message = "Filename cannot be blank")
    @JsonProperty("filename")
    private String filename;

    @NotNull(message = "Storage location is required")
    @NotBlank(message = "Storage location cannot be blank")
    @JsonProperty("storageLocation")
    private String storageLocation;
} 