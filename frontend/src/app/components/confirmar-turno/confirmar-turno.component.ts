import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import {FormControl} from '@angular/forms'

@Component({
  selector: 'app-confirmar-turno',
  templateUrl: './confirmar-turno.component.html',
  styleUrls: ['./confirmar-turno.component.css']
})
export class ConfirmarTurnoComponent implements OnInit {
  hoy = new FormControl(new Date());

  constructor(@Inject(MatSnackBar) private snackBar: MatSnackBar,
              private router: Router) { }

  confirmarTurno(){
    this.snackBar.open('Turno confirmado', void 0, {
      duration: 2000,
    })
    this.router.navigate(['/AdministrarTurnos'])
  }

  ngOnInit(): void {}
}
