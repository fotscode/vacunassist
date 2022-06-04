import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCancelTurnoComponent } from './dialog-cancel-turno.component';

describe('DialogCancelTurnoComponent', () => {
  let component: DialogCancelTurnoComponent;
  let fixture: ComponentFixture<DialogCancelTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCancelTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCancelTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
