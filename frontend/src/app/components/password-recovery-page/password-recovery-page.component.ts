import { Component, OnInit } from '@angular/core'
import { MatDialogRef, MatDialog } from '@angular/material/dialog'
import { PasswordRecoveryMessageComponent } from '../password-recovery-message/password-recovery-message.component'

@Component({
  selector: 'app-password-recovery-page',
  templateUrl: './password-recovery-page.component.html',
  styleUrls: ['./password-recovery-page.component.css'],
})
export class PasswordRecoveryPageComponent implements OnInit {
  dialogRef: any

  user = {
    cuil: '',
    email: '',
  }
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  errorMsg = ''
  recoverPassword() {
    this.dialogRef = this.dialog.open(PasswordRecoveryMessageComponent, {
      data: { message: 'Confirmación requerida', cuil: this.user.cuil },
    })
    this.dialogRef.afterClosed().subscribe((res: any) => {
      this.errorMsg=res
    })
  }
}
