import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Media } from 'src/app/models/Media';
import { HelperService } from 'src/app/helpers/helper';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {
  id: string;
  private sub: any;
  media: Media;

  constructor(private route: ActivatedRoute, private helper: HelperService, private router: Router) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.media = this.helper.generateMediaMock(parseInt(this.id));
       // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeMedia() {
    this.router.navigate(["/"]);
  }
}
