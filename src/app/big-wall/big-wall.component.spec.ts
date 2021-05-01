import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigWallComponent } from './big-wall.component';

describe('BigWallComponent', () => {
  let component: BigWallComponent;
  let fixture: ComponentFixture<BigWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
