import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {CircleRoutingModule} from "./circles/circle-routing.module";

const routes: Routes = [
  { path: 'login',  component: LoginComponent, data: { isPublic: true } },
  { path: 'register',  component: RegisterComponent, data: { isPublic: true } },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CircleRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
