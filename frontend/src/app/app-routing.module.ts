import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AfterLoginComponent } from './after-login/after-login.component';

const routes: Routes = [
    {
      path:'',
      // canActivate: [AuthGuard],
      component:LoginComponent,
    },
    {
      path:'login',
      // canActivate: [AuthGuard],
      component:LoginComponent,
    },
    {
      path:'index',
      component:AfterLoginComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [  LoginComponent ]
