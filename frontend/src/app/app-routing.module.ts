import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes=[
  {path: 'Home', component:HomeComponent},
  {path: '', redirectTo:'/Home', pathMatch:'full'},
]


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
