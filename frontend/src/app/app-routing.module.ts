import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes=[
  {path: 'Home', component:HomeComponent},
  {path: 'Login', component:LoginPageComponent},
  {path: 'Register', component:RegisterPageComponent},
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
