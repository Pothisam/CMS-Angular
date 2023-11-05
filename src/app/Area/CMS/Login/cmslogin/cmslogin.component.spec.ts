import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSLoginComponent } from './cmslogin.component';

describe('CMSLoginComponent', () => {
  let component: CMSLoginComponent;
  let fixture: ComponentFixture<CMSLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMSLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
