import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTurnosViewComponent } from './admin-turnos-view.component';

describe('AdminTurnosViewComponent', () => {
  let component: AdminTurnosViewComponent;
  let fixture: ComponentFixture<AdminTurnosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTurnosViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTurnosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
