import { Component, ElementRef, ViewChild } from '@angular/core';
import { MedusaBackendService } from '../../services/medusa-backend.service';
import { Gallery } from '../../models/Gallery';
import { HelperService } from 'src/app/helpers/helper';
import { Row } from 'src/app/models/Row';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent {
  @ViewChild('gallery') galleryRef: ElementRef;

  gallery: Gallery | undefined;
  rows: Row[] = [];

  constructor(private backendService: MedusaBackendService) {}

  ngOnInit() {
    this.gallery = HelperService.generateMockGalley(25);
    var containerWidth = this.galleryRef ? this.galleryRef.nativeElement.offsetWidth : window.innerWidth * 0.9;
    this.rows = HelperService.generateRows(this.gallery, containerWidth);
  }

}
