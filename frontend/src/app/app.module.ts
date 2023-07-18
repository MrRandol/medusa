import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MediaDetailsComponent } from './media-details/media-details.component';
import { RouterModule } from '@angular/router';
import { ErrorPageComponentComponent } from './error-page-component/error-page-component.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    MediaDetailsComponent,
    ErrorPageComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'gallery', component: GalleryComponent},
      {path: 'media-details', component: MediaDetailsComponent},
      {path: '', redirectTo: '/gallery', pathMatch: 'full' },
      {path: '**', component: ErrorPageComponentComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
