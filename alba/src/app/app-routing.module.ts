import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostListComponent } from './post-list/post-list.component';
import { AboutComponent } from './about/about.component';
import { StoreComponent } from './store/store.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCategoryComponent } from './post-category/post-category.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:PostListComponent},
  {path: 'about', component:AboutComponent},
  {path: 'store', component:StoreComponent},
  {path: 'register', component:RegistrationComponent},
  {path: 'post_detail/:id', component: PostDetailComponent },
  {path: 'category/:id', component: PostCategoryComponent },
  {path: 'comment/:id', component: CommentDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
