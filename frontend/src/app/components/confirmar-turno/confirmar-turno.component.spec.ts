import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarTurnoComponent } from './confirmar-turno.component';

describe('ConfirmarTurnoComponent', () => {
  let component: ConfirmarTurnoComponent;
  let fixture: ComponentFixture<ConfirmarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
