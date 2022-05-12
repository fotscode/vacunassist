import { Component, Inject, Injectable, Optional } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

@Component({
  selector: 'app-password-recovery-message',
  templateUrl: './password-recovery-message.component.html',
  styleUrls: ['./password-recovery-message.component.css']
})
export class PasswordRecoveryMessageComponent{

  constructor(@Optional() private dialogRef: MatDialogRef<PasswordRecoveryMessageComponent>,  @Inject(MAT_DIALOG_DATA) public  data:  any){ }

  public acceptRecover(){
    console.log(this.data)
  }

  public closeMe() {
    this.dialogRef.close();
  }

}
