import { Component, OnInit } from '@angular/core';

interface Sede{
  id: number
  nombre: String
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})

export class ProfileEditComponent implements OnInit {
  nivel = "Paciente"
  nombre = "Juan"
  apellido = "Perez"
  email = "juan.perez@gmail.com"
  cuil = "20-385672453-5"
  riesgo : boolean = false
  sedes: Sede[] = [
    {id: 1, nombre: "Bosque"},
    {id: 2, nombre: "Centro"},
    {id: 3, nombre: "Estadio"},
  ]
  sede: Sede = this.sedes[1]
  dosis = ["Gripe: 1", "COVID: 2"]

  constructor() { }

  ngOnInit(): void {
  }

  switch(){
    this.riesgo = !this.riesgo
  }

  setSede(s: Sede){
    this.sede = s;
  }
}
