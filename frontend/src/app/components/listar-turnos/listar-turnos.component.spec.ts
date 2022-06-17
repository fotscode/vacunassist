import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTurnosComponent } from './listar-turnos.component';

describe('ListarTurnosComponent', () => {
  let component: ListarTurnosComponent;
  let fixture: ComponentFixture<ListarTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
