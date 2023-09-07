import { Component, Input } from '@angular/core';
import { Row } from 'src/app/models/Row';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent {
  @Input() row: Row;  
}
