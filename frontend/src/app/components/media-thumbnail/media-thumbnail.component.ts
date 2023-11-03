import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Media } from "src/app/models/Media";

@Component({
  selector: 'app-media-thumbnail',
  templateUrl: './media-thumbnail.component.html',
  styleUrls: ['./media-thumbnail.component.css'],
  standalone: true,
  imports: [CommonModule]
})

export class MediaThumbnailComponent {
  @Input() media: Media;  
  @Input() height: number;  
  @Input() width: number;  
  @Input() widthShift: number;
  @Input() heightShift: number;

  loader:string='https://media.tenor.com/images/f864cbf3ea7916572605edd3b3fe637f/tenor.gif';
  isLoading:boolean;
  
  constructor(private router: Router) { 
    this.isLoading=true;
  }

  hideLoader(){
    this.isLoading=false;
  }

  goToMediaDetails(id: number) {
    this.router.navigate(['/media', id]);
  }
}