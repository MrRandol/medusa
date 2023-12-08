package org.randol.medusa.medusabackend.controllers;

import java.util.List;

import org.randol.medusa.medusabackend.models.Gallery;
import org.randol.medusa.medusabackend.models.Media;
import org.randol.medusa.medusabackend.models.Section;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class GalleryController {
    @QueryMapping
    public Gallery galleryIndex() {
        return Gallery.getGallery();
    }

    @SchemaMapping
    public List<Media> medias(Section s) {
        return Media.getByYear(s.year());
    }
}