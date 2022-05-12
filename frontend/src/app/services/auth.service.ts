import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import * as moment from 'moment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:3000/api/users'
  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: any) {
    return this.http.post<any>(this.URL + '/signup', user)
  }

  signIn(user: any) {
    return this.http.post<any>(this.URL + '/login', user)
  }

  public loggedIn(): Boolean {
    //return moment().isBefore(this.getExpiration(),"second")
    return !!(localStorage.getItem("token")) 
  }
  
  loggedOut(): Boolean {
    return !this.loggedIn()
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires')
    return expiration ? moment(JSON.parse(expiration)) : moment()
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('expires')
    this.router.navigate(['/signin'])
  }
}
