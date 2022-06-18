import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmarVisitaComponent } from './dialog-confirmar-visita.component';

describe('DialogConfirmarVisitaComponent', () => {
  let component: DialogConfirmarVisitaComponent;
  let fixture: ComponentFixture<DialogConfirmarVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmarVisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmarVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
