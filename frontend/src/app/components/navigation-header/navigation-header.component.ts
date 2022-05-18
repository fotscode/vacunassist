import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {


  constructor(private authService: AuthService) {}

  isLogged(){
    return this.authService.loggedIn();
  }

  isAdmin(){
    return this.authService.getRol()==3;
  }

  logOut(){
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}

