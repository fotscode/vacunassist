import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasEditComponent } from './vacunas-edit.component';

describe('VacunasEditComponent', () => {
  let component: VacunasEditComponent;
  let fixture: ComponentFixture<VacunasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
