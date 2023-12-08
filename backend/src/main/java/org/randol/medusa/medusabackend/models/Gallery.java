package org.randol.medusa.medusabackend.models;

import java.util.List;

public record Gallery (List<Section> sections) {
 
    public static Gallery getGallery() {
        return new Gallery(Section.getAllSections());
    }
}