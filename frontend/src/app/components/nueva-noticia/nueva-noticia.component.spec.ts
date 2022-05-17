import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaNoticiaComponent } from './nueva-noticia.component';

describe('NuevaNoticiaComponent', () => {
  let component: NuevaNoticiaComponent;
  let fixture: ComponentFixture<NuevaNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
