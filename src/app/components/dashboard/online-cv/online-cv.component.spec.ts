import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineCvComponent } from './online-cv.component';

describe('OnlineCvComponent', () => {
  let component: OnlineCvComponent;
  let fixture: ComponentFixture<OnlineCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
