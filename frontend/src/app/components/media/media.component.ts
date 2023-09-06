import { Component, Input } from "@angular/core";
import { Media } from "src/app/models/Media";
import { MediaService } from "src/app/services/media.service";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})

export class MediaComponent {
  @Input() media: Media;  
  @Input() height: number;  
  
  index:number = -1;

  constructor(s: MediaService) {
    this.index = s.getNextIndex();
  }
}
