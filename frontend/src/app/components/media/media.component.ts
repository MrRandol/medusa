import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Media } from "src/app/models/Media";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  standalone: true,
  imports: [CommonModule]
})

export class MediaComponent {
  @Input() media: Media;  
  @Input() height: number;  
  @Input() width: number;  
  @Input() widthShift: number;
  @Input() heightShift: number;

  loader:string='https://media.tenor.com/images/f864cbf3ea7916572605edd3b3fe637f/tenor.gif';
  isLoading:boolean;
  
  constructor() { 
    this.isLoading=true;
  }

  hideLoader(){
    this.isLoading=false;
  }
}