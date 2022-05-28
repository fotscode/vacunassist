import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTurnosEditComponent } from './admin-turnos-edit.component';

describe('AdminTurnosEditComponent', () => {
  let component: AdminTurnosEditComponent;
  let fixture: ComponentFixture<AdminTurnosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTurnosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTurnosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
