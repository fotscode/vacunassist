import { Component, Inject, OnInit } from '@angular/core'
import { AuthGuard } from 'src/app/auth.guard'
import { AuthService } from 'src/app/services/auth.service'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { DialogDeleteAccountComponent } from '../dialog-delete-account/dialog-delete-account.component'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css'],
})
export class NavigationHeaderComponent implements OnInit {
  turnosPendientes: number = 2
  validated: boolean = false
  usuario:string=''
  

  private URL: string = environment.baseApiUrl + '/users'
  constructor(
    private authService: AuthService,
    public popup: MatDialog,
    private http: HttpClient,
    @Inject(MatSnackBar) private snackBar : MatSnackBar,
    private router: Router
  ) {
    if (this.isLogged()) {
      this.http.get(this.URL + '/user/' + this.authService.getId()).subscribe(
        (user) => {
          this.validated = Object.entries(user).filter(
            (e) => e[0] == 'validated'
          )[0][1]
            this.usuario=Object.entries(user).filter((e)=>e[0]=="firstName")[0][1]
        },
        (err) => {}
      )
    }
  }

  isLogged() {
    return this.authService.loggedIn()
  }

  isAdmin() {
    return this.authService.getRol() == 3
  }

  logOut() {
    this.authService.logout()
    this.snackBar.open('Se ha cerrado la sesion', void 0, { duration: 3000 })
  }

  deleteAccount() {
    this.http.delete(this.URL + '/user/' + this.authService.getId()).subscribe(
      (res) => {
        console.log(res)
        this.logOut()
        this.router.navigate(['/Login'])
        this.snackBar.open('Se ha eliminado su cuenta', void 0, { duration: 3000 })
      },
      (err) => {
        console.log(err)
        this.snackBar.open('Se produjo un error, intentelo de nuevo mas tarde', void 0, { duration: 3000 })
      }
    )
  }

  deleteAccountAttempt() {
    if (this.turnosPendientes > 0) {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = false
      dialogConfig.width = '500px'
      const referencia = this.popup.open(
        DialogDeleteAccountComponent,
        dialogConfig
      )
      referencia.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteAccount()
        }
      })
    }
  }
  isValidated(): boolean {
    return this.validated
  }

  ngOnInit(): void {}
}
