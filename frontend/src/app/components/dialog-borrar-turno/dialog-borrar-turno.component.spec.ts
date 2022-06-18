import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBorrarTurnoComponent } from './dialog-borrar-turno.component';

describe('DialogBorrarTurnoComponent', () => {
  let component: DialogBorrarTurnoComponent;
  let fixture: ComponentFixture<DialogBorrarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBorrarTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBorrarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
