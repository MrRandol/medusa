import { Component, ElementRef, ViewChild } from '@angular/core';
import { MedusaBackendService } from '../../services/medusa-backend.service';
import { Gallery } from '../../models/Gallery';
import { HelperService } from 'src/app/helpers/helper';
import { Row } from 'src/app/models/Row';
import { MediaComponent } from '../media/media.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  standalone: true,
  imports: [CommonModule, MediaComponent]
})

export class GalleryComponent {
  @ViewChild('gallery') galleryRef: ElementRef;

  gallery: Gallery | undefined;
  rows: Row[] = [];
  sectionHeight: number = 0
  heightShift: number = 0

  constructor(private backendService: MedusaBackendService) {}

  ngOnInit() {
    this.heightShift = 0;
    this.gallery = HelperService.generateMockGalley(25);
    var containerWidth = this.galleryRef ? this.galleryRef.nativeElement.offsetWidth : window.innerWidth * 0.9;
    this.rows = HelperService.generateRows(this.gallery, containerWidth);
    this.sectionHeight = this.rows.reduce((acc, r) => acc+r.height, 0);
  }

  cumulativeHeight(rowIndex: number): number {
    var cumulativeHeight = 0;
    for (var i = 0; i < rowIndex; i++) {
      cumulativeHeight += this.rows[i].height;
    }
    return cumulativeHeight;
  }

  cumulativeWidth(row: Row, columnIndex: number): number {
    var cumulativeHeight = 0;
    for (var i = 0; i < columnIndex; i++) {
      cumulativeHeight += row.medias[i].width * row.height / row.medias[i].height;
    }
    return cumulativeHeight;
  }

}
