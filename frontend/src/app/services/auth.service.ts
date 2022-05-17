import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = environment.apiUrl 
  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: any) {
    return this.http.post<any>(this.URL + '/signup', user)
  }

  signIn(user: any) {
    return this.http.post<any>(this.URL + '/login', user)
  }

  loggedIn(): Boolean {
    return !!(localStorage.getItem("token")) 
  }
  
  loggedOut(): Boolean {
    return !this.loggedIn()
  }

  getToken() {
    return localStorage.getItem('token')
  }

  private getPayload(){
    let x= this.getToken()?.split(" ")[1].split(".")[1];
    return (x) ? JSON.parse(atob(x)) : null
  }

  getRol(){
    return (this.getPayload()) ? this.getPayload().role : -1
  }

  getId(){
    return (this.getPayload()) ? this.getPayload().sub : -1
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires')
    return expiration ? moment(JSON.parse(expiration)) : moment()
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('expires')
    this.router.navigate(['/Login'])
  }
}
