import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MediaDetailsComponent } from './media-details/media-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    MediaDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'gallery', component: GalleryComponent},
      {path: 'media-details', component: MediaDetailsComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
