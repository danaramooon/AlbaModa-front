import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'home',component:PostListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
