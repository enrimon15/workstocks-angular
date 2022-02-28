import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineCvFormComponent } from './online-cv-form.component';

describe('OnlineCvFormComponent', () => {
  let component: OnlineCvFormComponent;
  let fixture: ComponentFixture<OnlineCvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineCvFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineCvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
