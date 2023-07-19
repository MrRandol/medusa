import { Component } from '@angular/core';
import { MedusaBackendService } from '../../services/medusa-backend.service';
import { Gallery } from '../../models/Gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  gallery: Gallery | undefined;

  constructor(private backendService: MedusaBackendService) {}

  ngOnInit() {
    this.fetchGallery();
  }

  fetchGallery() {
    this.backendService.getGallery()
      // clone the data object, using its known Config shape
      .subscribe((data: Gallery) => {
        this.gallery = { ...data }
      });
  }
}
