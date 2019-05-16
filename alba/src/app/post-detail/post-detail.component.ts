import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Post,Comment } from '../models/models';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  public id: number = 0;
  public title : any = '';
  public post: Post=null;
  public like: any = '';
  public date: any = '';
  public comm:any='';
  public isOwner:boolean=false;
  public isCOwner:boolean=false;
  public comments: Comment[]=[];

  constructor(
    private provider: ServiceService,
    private auth_:AuthService,
    private router: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.id = parseInt(this.router.snapshot.paramMap.get('id'))
    console.log(this.id);
    if(this.id){
      this.provider.getDetailedPost(this.id).then(res => {
        this.post = res;
        console.log(res);
        if(res.owner.username == localStorage.getItem("username") && this.auth_.isAuthenticated()){
          this.isOwner = true;
      }
      });
      this.provider.getComments(this.id).then(res=>
        {
          this.comments = res;
          console.log(res);
        })
        
      
    }
  }
  updateTask(task: Post){
    this.provider.updatePost(task).then(res => {
      this.title = '';
      
    })
  }
  deleteTask(c: Post) {
    this.provider.deletePost(c.id).then(res => {
      console.log(c.title + ' deleted');
    });
  }
  updateComment(task: Comment){
    this.provider.updateComment(task).then(res => {
      this.comm = '';
      
    })
  }
  deleteComment(c: Comment) {
    this.provider.deleteComment(c.id).then(res => {
      console.log(c.comment + ' deleted');
    });
  }
  createComment(){
    if (this.comm !== '' ) 
    {
      this.provider.createComment(this.comm,this.id).then(res => {
        this.comments.push(res);
        console.log(res);
        this.comm = '';
        });
      }
    }
}
