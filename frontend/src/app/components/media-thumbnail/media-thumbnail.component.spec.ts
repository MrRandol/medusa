import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaThumbnailComponent } from './media-thumbnail.component';

describe('MediaThumbnailComponent', () => {
  let component: MediaThumbnailComponent;
  let fixture: ComponentFixture<MediaThumbnailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaThumbnailComponent]
    });
    fixture = TestBed.createComponent(MediaThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
