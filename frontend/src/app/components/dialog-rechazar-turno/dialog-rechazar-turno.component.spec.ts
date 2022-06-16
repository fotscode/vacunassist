import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRechazarTurnoComponent } from './dialog-rechazar-turno.component';

describe('DialogRechazarTurnoComponent', () => {
  let component: DialogRechazarTurnoComponent;
  let fixture: ComponentFixture<DialogRechazarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRechazarTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRechazarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
