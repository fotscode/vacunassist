import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public constructor(private titleService: Title){
    this.titleService.setTitle("Log-In");  
  }

  ngOnInit(): void {
  }

}
