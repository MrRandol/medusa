import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaThumbnailComponent } from '../media-thumbnail/media-thumbnail.component';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from 'src/app/helpers/helper';
import { Row } from 'src/app/models/Row';
import { Media } from 'src/app/models/Media';
import { environment } from 'environment';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, MediaThumbnailComponent, MatCardModule],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  @Input() medias: Media[];
  @Input() width: number;

  sectionHeight: number = 0
  heightShift: number = 0
  rows: Row[] = [];

  constructor() {}

  ngOnInit() {
    this.heightShift = 0;
    this.rows = HelperService.generateSectionRows(this.medias, this.width);
    this.sectionHeight = Math.round(this.rows.reduce((acc, r) => acc+r.height, 0) + ((this.rows.length - 1) * environment.gutter_size));
  }

  cumulativeHeight(rowIndex: number): number {
    var cumulativeHeight = 0;
    for (var i = 0; i < rowIndex; i++) {
      cumulativeHeight += this.rows[i].height + environment.gutter_size;
    }
    return cumulativeHeight;
  }

  cumulativeWidth(row: Row, columnIndex: number): number {
    var cumulativeWidth = 0;
    for (var i = 0; i < columnIndex; i++) {
      cumulativeWidth += row.medias[i].width * row.height / row.medias[i].height + environment.gutter_size;
    }
    return cumulativeWidth;
  }
}
