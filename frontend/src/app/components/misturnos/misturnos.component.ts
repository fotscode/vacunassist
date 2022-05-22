import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css']
})
export class MisturnosComponent implements OnInit {

  turnos=[{
    id:'12',
    vacuna:" covid",
    fecha:" 10 de enero del 2022"
  },
  {
    id:'15',
    vacuna:"gripe",
    fecha:" 20 de mayo del 2022"
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
