import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCuentasComponent } from './reporte-cuentas.component';

describe('ReporteCuentasComponent', () => {
  let component: ReporteCuentasComponent;
  let fixture: ComponentFixture<ReporteCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
