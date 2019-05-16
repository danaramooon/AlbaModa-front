import { Component, OnInit } from '@angular/core';

import {Post, IUser, IAuthResponse} from '../models/models';
import { AuthService } from '../services/auth.service';
import { ServiceService } from '../services/service.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  public posts: Post[] = [];
  public username: any='';
  public password: any='';
  public email: any='';
  public isLogged = false;

  constructor(private provider: ServiceService,
    private auth_:AuthService) { }

    ngOnInit() {
      const token = localStorage.getItem("token");
  
       //if (token && this.auth_.isAuthenticated())
       {
        this.isLogged = true;
        this.username = localStorage.getItem('username')
        this.provider.getPosts().then(res => {
          this.posts = res;
          console.log(res+"dcdscjsdncksdc ");
          res.forEach(p=>{
            console.log(p.owner);
          });
        })
      }
  
  }

}
