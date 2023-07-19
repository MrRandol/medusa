import { Component, Input } from "@angular/core";
import { Media } from "src/app/models/Media";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})

export class MediaComponent {
  @Input() media: Media;  
}
