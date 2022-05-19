import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(public authService: AuthService, private title:Title){
    title.setTitle("Vacunassist")
  }
}
