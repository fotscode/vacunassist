import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVacunasEditComponent } from './admin-vacunas-edit.component';

describe('AdminVacunasEditComponent', () => {
  let component: AdminVacunasEditComponent;
  let fixture: ComponentFixture<AdminVacunasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVacunasEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVacunasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
