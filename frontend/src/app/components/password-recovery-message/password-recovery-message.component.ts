import { HttpClient } from '@angular/common/http'
import { Component, Inject, Injectable, Optional } from '@angular/core'
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog'
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
  private URL = environment.apiUrl
  constructor(
    private http: HttpClient,
    @Optional()
    private dialogRef: MatDialogRef<PasswordRecoveryMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public acceptRecover() {
    this.http
      .put<any>(this.URL + '/recover', { cuil: this.data.cuil })
      .subscribe(
        (res) => {
          this.closeMe()
        },
        (err) => {
          // TODO error mas amigable
          console.log(err)
        }
      )
  }

  public closeMe() {
    this.dialogRef.close()
  }
}
