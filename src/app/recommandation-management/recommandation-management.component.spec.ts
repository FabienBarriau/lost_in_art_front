import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandationManagementComponent } from './recommandation-management.component';

describe('RecommandationManagementComponent', () => {
  let component: RecommandationManagementComponent;
  let fixture: ComponentFixture<RecommandationManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommandationManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommandationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
