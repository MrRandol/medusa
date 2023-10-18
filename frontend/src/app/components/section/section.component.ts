import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from '../media/media.component';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from 'src/app/helpers/helper';
import { Row } from 'src/app/models/Row';
import { Media } from 'src/app/models/Media';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, MediaComponent, MatCardModule],
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
