import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSedeDeleteComponent } from './dialog-sede-delete.component';

describe('DialogSedeDeleteComponent', () => {
  let component: DialogSedeDeleteComponent;
  let fixture: ComponentFixture<DialogSedeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSedeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSedeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
