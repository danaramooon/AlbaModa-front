import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ClassProvider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceService } from './services/service.service';
import { AuthInterceptor } from './AuthInterceptor';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PostListComponent } from './post-list/post-list.component';
import { AboutComponent } from './about/about.component';
import { StoreComponent } from './store/store.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCategoryComponent } from './post-category/post-category.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    CarouselComponent,
    PostListComponent,
    AboutComponent,
    StoreComponent,
    PostDetailComponent,
    PostCategoryComponent,
    CommentDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ServiceService,
    <ClassProvider> {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
