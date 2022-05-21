import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  styleUrls: ['./vacunas.component.css']
})
export class VacunasComponent implements OnInit {
  dosisCovid:number=1;
  dosisGripe:number=0;
  dosisFiebre:number=0;
  hoy = new Date()
  constructor() { }

  ngOnInit(): void {
  }

}
