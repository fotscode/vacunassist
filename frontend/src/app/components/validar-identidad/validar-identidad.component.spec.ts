import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarIdentidadComponent } from './validar-identidad.component';

describe('ValidarIdentidadComponent', () => {
  let component: ValidarIdentidadComponent;
  let fixture: ComponentFixture<ValidarIdentidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarIdentidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarIdentidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
