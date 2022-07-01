import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTurnosComponent } from './reporte-turnos.component';

describe('ReporteTurnosComponent', () => {
  let component: ReporteTurnosComponent;
  let fixture: ComponentFixture<ReporteTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
