import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSedesComponent } from './dialog-sedes.component';

describe('DialogSedesComponent', () => {
  let component: DialogSedesComponent;
  let fixture: ComponentFixture<DialogSedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSedesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
