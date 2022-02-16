import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedErrorComponent } from './denied-error.component';

describe('DeniedErrorComponent', () => {
  let component: DeniedErrorComponent;
  let fixture: ComponentFixture<DeniedErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeniedErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
