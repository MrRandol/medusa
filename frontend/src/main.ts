import {bootstrapApplication} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MediaComponent } from './app/components/media/media.component';
import { AppComponent } from './app/components/app.component';
import { GalleryComponent } from './app/components/gallery/gallery.component';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {path: '', component: GalleryComponent, pathMatch: 'full'},
      {path: 'media/:id', component: MediaComponent}
    ])
  ],
});
