import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasViewComponent } from './vacunas-view.component';

describe('VacunasViewComponent', () => {
  let component: VacunasViewComponent;
  let fixture: ComponentFixture<VacunasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
