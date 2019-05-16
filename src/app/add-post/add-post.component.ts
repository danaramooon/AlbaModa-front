import { Component, OnInit } from '@angular/core';
import { Post, Category} from '../models/models';
import {ServiceService} from '../services/service.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(
    private provider: ServiceService,){}

  public title: any = '';
  public text: any = '';
  public category: Category;
  public id: number;
  public posts: Post[] = [];
  ngOnInit() {

}

createPost(){
  if (this.title !== '' || this.text !== '') 
  {
    this.provider.createPost(this.title,this.text).then(res => {
      this.posts.push(res);
      console.log(this.posts);
      this.title = '';
      this.text ='';
    
      });
    }
}


}