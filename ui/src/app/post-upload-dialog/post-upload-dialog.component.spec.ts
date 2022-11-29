import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostUploadDialogComponent } from './post-upload-dialog.component';

describe('PostUploadDialogComponent', () => {
  let component: PostUploadDialogComponent;
  let fixture: ComponentFixture<PostUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostUploadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
