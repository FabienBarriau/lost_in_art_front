import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandationGalleryComponent } from './recommandation-gallery.component';

describe('RecommandationGalleryComponent', () => {
  let component: RecommandationGalleryComponent;
  let fixture: ComponentFixture<RecommandationGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommandationGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommandationGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
