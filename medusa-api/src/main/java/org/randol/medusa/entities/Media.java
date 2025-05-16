package org.randol.medusa.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "media")
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Filename is required")
    @NotBlank(message = "Filename cannot be blank")
    @JsonProperty("filename")
    private String filename;

    @NotNull(message = "Storage location is required")
    @NotBlank(message = "Storage location cannot be blank")
    @JsonProperty("storageLocation")
    private String storageLocation;

    private LocalDateTime importedAt;

    private LocalDateTime lastModified;
}