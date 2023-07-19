import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MediaComponent } from './components/media/media.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    MediaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'gallery', component: GalleryComponent},
      {path: '', redirectTo: '/gallery', pathMatch: 'full' }
      //{path: '**', component: ErrorPageComponentComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
