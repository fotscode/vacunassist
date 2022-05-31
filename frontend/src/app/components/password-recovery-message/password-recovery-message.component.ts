import { HttpClient } from '@angular/common/http'
import { Component, Inject, Injectable, Optional } from '@angular/core'
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-password-recovery-message',
  templateUrl: './password-recovery-message.component.html',
  styleUrls: ['./password-recovery-message.component.css'],
})
export class PasswordRecoveryMessageComponent {
  private URL = environment.baseApiUrl + '/users'
  constructor(
    private http: HttpClient,
    @Optional()
    private dialogRef: MatDialogRef<PasswordRecoveryMessageComponent>,
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  errorMsg = ''

  public acceptRecover() {
    this.http
      .put<any>(this.URL + '/recover', { cuil: this.data.cuil })
      .subscribe(
        (res) => {
          this.closeMe()
          this.snackBar.open(
            'Se ha enviado un mail con la nueva contraseña',
            void 0,
            { duration: 3000 }
          )
          this.router.navigate(['/Login'])
        },
        (err) => {
          
          this.snackBar.open(
            'El cuil ingresado es incorrecto',
            void 0,
            { duration: 3000 }
          )
          this.closeMe()
        }
      )
  }

  public closeMe() {
    this.dialogRef.close(this.errorMsg)
  }
}
