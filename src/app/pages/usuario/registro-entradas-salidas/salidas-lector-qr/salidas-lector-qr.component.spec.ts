import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasLectorQRComponent } from './SalidasLectorQRComponent';

describe('SalidasLectorQRComponent', () => {
  let component: SalidasLectorQRComponent;
  let fixture: ComponentFixture<SalidasLectorQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidasLectorQRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidasLectorQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
