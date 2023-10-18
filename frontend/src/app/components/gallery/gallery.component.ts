import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HelperService } from 'src/app/helpers/helper';
import { Gallery } from '../../models/Gallery';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  standalone: true,
  imports: [CommonModule, SectionComponent]
})

export class GalleryComponent {
  @ViewChild('gallery') galleryRef: ElementRef;

  mediaGallery: Gallery;
  containerWidth: number;

  constructor() {}

  ngOnInit() {
    this.mediaGallery = {data: [
      HelperService.generateMockSection(25),
      HelperService.generateMockSection(12),
      HelperService.generateMockSection(17)
    ]};
    this.containerWidth = this.galleryRef ? this.galleryRef.nativeElement.offsetWidth : window.innerWidth * 0.9;
  }


}
