import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbComponent } from './textb.component';

describe('TextbComponent', () => {
  let component: TextbComponent;
  let fixture: ComponentFixture<TextbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
