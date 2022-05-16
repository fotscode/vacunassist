import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthGuard } from 'src/app/auth.guard';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  constructor() { }

  isLogged(){
    return AuthGuard;
  }

  ngOnInit(): void {
  }

}

