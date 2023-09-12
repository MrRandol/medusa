import { Component, Input } from '@angular/core';
import { Row } from 'src/app/models/Row';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent {
  @Input() row: Row;  
  @Input() heightShift: number;

  cumulativeHeight(columnIndex: number): number {
    var cumulativeHeight = 0;
    for (var i = 0; i < columnIndex; i++) {
      cumulativeHeight += this.row.medias[i].width * this.row.height / this.row.medias[i].height;
    }
    return cumulativeHeight;
  }

}

