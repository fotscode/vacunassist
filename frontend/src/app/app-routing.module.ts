import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes=[
  {path: 'Home', component:HomeComponent, 
    data:{  title: 'Home'
    }
  },
  {path: 'Login', component:LoginPageComponent},
  {path: 'Sign_up', component:RegisterPageComponent},
  {path: '', redirectTo:'/Home', pathMatch:'full'},
  {path: '**', pathMatch:'full', component:ErrorPageComponent}
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
