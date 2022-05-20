import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogDeleteAccountComponent } from '../dialog-delete-account/dialog-delete-account.component';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {
  turnosPendientes: number = 2

  constructor(private authService: AuthService, public popup: MatDialog) {}

  isLogged(){
    return this.authService.loggedIn();
  }

  isAdmin(){
    return this.authService.getRol()==3;
  }

  logOut(){
    this.authService.logout();
  }

  deleteAccount(){
    console.log('Se borró');
  }

  deleteAccountAttempt(){
    if (this.turnosPendientes > 0) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = false;
      dialogConfig.width = "500px";
      const referencia = this.popup.open(DialogDeleteAccountComponent, dialogConfig);
      referencia.afterClosed().subscribe(result => {
        if (result){
          this.deleteAccount();
        }
      });
    }
  }

  ngOnInit(): void {
  }
}
