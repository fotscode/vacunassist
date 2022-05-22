import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { environment } from 'src/environments/environment'
import { AuthService } from './services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class ValidatedGuard implements CanActivate {
  private URL: string = environment.baseApiUrl + '/users'
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}
  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.get(this.URL + '/user/' + this.authService.getId()).subscribe(
        (user) => {
          let validated = Object.entries(user).filter(
            (e) => e[0] == 'validated'
          )[0][1]
          if (validated) {
            this.router.navigate(['/Home'])
            resolve(false)
          } else {
            resolve(true)
          }
        },
        (err) => {
          this.router.navigate(['/Home'])
          resolve(false)
        }
      )
    })
  }
}
