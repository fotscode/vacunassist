import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNoticiaDeleteComponent } from './dialog-noticia-delete.component';

describe('DialogNoticiaDeleteComponent', () => {
  let component: DialogNoticiaDeleteComponent;
  let fixture: ComponentFixture<DialogNoticiaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNoticiaDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNoticiaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
