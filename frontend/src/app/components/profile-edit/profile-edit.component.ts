import { Component, OnInit } from '@angular/core';

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
  riesgo = "Sí"
  sede = "Bosque"
  dosis = ["Gripe: 1", "COVID: 2"]

  constructor() { }

  ngOnInit(): void {
  }

}
