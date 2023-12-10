import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasLectorQRComponent } from './entradas-lector-qr.component';

describe('EntradasLectorQRComponent', () => {
  let component: EntradasLectorQRComponent;
  let fixture: ComponentFixture<EntradasLectorQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradasLectorQRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradasLectorQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
