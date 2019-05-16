import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ServiceService } from '../services/service.service';
import { Post } from '../models/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {

  public posts: Post[] = [];
  public username: any='';
  public password: any='';
  public email: any='';
  public isLogged = false;
  public id:number;
  public img:any='';
  public category:any='';
  constructor(private provider: ServiceService,
    private auth_:AuthService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.router.snapshot.paramMap.get('id'))
    console.log(this.id);
      const token = localStorage.getItem("token");
  
       //if (token && this.auth_.isAuthenticated())
     if(this.id)
     {
        this.isLogged = true;
        this.username = localStorage.getItem('usernname')
        this.provider.getPostByCategory(this.id).then(res => {
          this.posts = res;
          res.forEach(p => {
            if(p.category.name =="Style") {
              this.img = "vogue.jpg"
              this.category = "Style"
            }
            if(p.category.name =="LifeStyle") {
              this.img = "food.jpg"
              this.category = "LifeStyle"
            }
            if(p.category.name =="Beauty") {
              this.img = "be.jpg"
              this.category = "Beauty"
            }
          });
        })
     }
  }
}
