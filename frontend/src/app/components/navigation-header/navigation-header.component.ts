import { Component, OnInit } from '@angular/core'
import { AuthGuard } from 'src/app/auth.guard'
import { AuthService } from 'src/app/services/auth.service'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { DialogDeleteAccountComponent } from '../dialog-delete-account/dialog-delete-account.component'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css'],
})
export class NavigationHeaderComponent implements OnInit {
  turnosPendientes: number = 2
  validated: boolean = false

  private URL: string = environment.baseApiUrl + '/users'
  constructor(
    private authService: AuthService,
    public popup: MatDialog,
    private http: HttpClient,
    private router: Router
  ) {
    if (this.isLogged()) {
      this.http.get(this.URL + '/user/' + this.authService.getId()).subscribe(
        (user) => {
          this.validated = Object.entries(user).filter(
            (e) => e[0] == 'validated'
          )[0][1]
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
  }

  deleteAccount() {
    this.http.delete(this.URL + '/user/' + this.authService.getId()).subscribe(
      (res) => {
        console.log(res)
        this.logOut()
        this.router.navigate(['/Login'])
      },
      (err) => {
        console.log(err)
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
