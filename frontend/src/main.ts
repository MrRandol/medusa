import {bootstrapApplication} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { GalleryComponent } from './app/components/gallery/gallery.component';


bootstrapApplication(GalleryComponent, {
  providers: [
    provideRouter([
      {path: 'gallery', component: GalleryComponent},
      {path: '', redirectTo: '/gallery', pathMatch: 'full' }
      //{path: '**', component: ErrorPageComponentComponent }
    ])
  ]
});
