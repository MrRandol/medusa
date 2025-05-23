package org.randol.medusa.controllers;

import org.randol.medusa.services.LocalImportService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/import/v1")
@RequiredArgsConstructor
@Validated
@Slf4j
@Tag(name = "Import", description = "Media Import APIs")
public class LocalImportController {

    private final LocalImportService localImportService;

    @PostMapping("/start")
    @Operation(summary = "Start the local import process from a specified folder")
    public ResponseEntity<String> startImport(
        @Parameter(description = "Path to the folder containing media files to import")
        @RequestParam String folderPath
    ) {
        localImportService.startImport(folderPath);
        return ResponseEntity.ok("Import started successfully");
    }
}