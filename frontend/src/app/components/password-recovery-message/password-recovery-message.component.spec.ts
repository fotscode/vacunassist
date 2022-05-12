import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryMessageComponent } from './password-recovery-message.component';

describe('PasswordRecoveryMessageComponent', () => {
  let component: PasswordRecoveryMessageComponent;
  let fixture: ComponentFixture<PasswordRecoveryMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoveryMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
