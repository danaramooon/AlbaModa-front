import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import{Comment} from '../models/models'
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {
  public id: number = 0;
  public comm:any='';
  public isOwner:boolean=false;
  public isCOwner:boolean=false;
  public c: Comment;

  constructor(
    private provider: ServiceService,
    private auth_:AuthService,
    private router: ActivatedRoute){}
  ngOnInit() {
    this.id = parseInt(this.router.snapshot.paramMap.get('id'))
    console.log(this.id);
    if(this.id){
      this.provider.getDetailedComment(this.id).then(res => {
        this.c = res;
        console.log(res);
        if(res.owner.username == localStorage.getItem("username") && this.auth_.isAuthenticated()){
          this.isOwner = true;
      }
      });
    }
  }
  updateComment(c: Comment){
      this.provider.updateComment(c).then(res => {
        console.log(c.id + " updated");
      })
  }
  deleteComment(c: Comment) {
    this.provider.deleteComment(c.id).then(res => {
      console.log(c.comment + ' deleted');
    });
  }
}
