import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  public constructor(private titleService: Title){
    this.titleService.setTitle("ERROR 404");  
  }
  ngOnInit(): void {
  }

}
