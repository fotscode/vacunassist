import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVacunasViewComponent } from './admin-vacunas-view.component';

describe('AdminVacunasViewComponent', () => {
  let component: AdminVacunasViewComponent;
  let fixture: ComponentFixture<AdminVacunasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVacunasViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVacunasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
