import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {Post, Comment,Category, IAuthResponse, IUser, Product} from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class ServiceService extends MainService {

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }

  getPosts(): Promise<Post[]> {
    return this.get('http://localhost:8000/post/', {});
  }

  
  getDetailedPost(list: number): Promise<Post> {
    return this.get(`http://localhost:8000/post_detail/${list}/`, {});
  }
  getDetailedComment(list: number): Promise<Comment> {
    return this.get(`http://localhost:8000/comment_detail/${list}/`, {});
  }
  createPost(name: any,owner : string): Promise<Post> {
    return this.post('http://localhost:8000/api/cbv/task_lists/create/', {
      name: name,
      owner: owner
    });
  }
  
  updatePost(list: Post): Promise<Post> {
    return this.put(`http://localhost:8000/api/cbv/post_update/${list.id}/`, {
      name: list.title
    });
  }
  deletePost(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/cbv/post_update/${id}/`, {});
  }

  createComment(comment: any,list:number): Promise<Comment> {
    return this.post(`http://localhost:8000/post/${list}/comment_create/`, {
      comment: comment
    });
  }
  updateComment(task: Comment) : Promise<Comment>{
    return this.put(`http://localhost:8000/comment_update/${task.id}/`, {
      comment: task.comment
    })
  }

  deleteComment(id: number) : Promise<any>{
    return this.delet(`http://localhost:8000/comment_delete/${id}/`, {})
  }

  getProducts(): Promise<Product[]> {
    return this.get(`http://localhost:8000/products/`, {})
  }

  getComments(id: number): Promise<Comment[]> {
    return this.get(`http://localhost:8000/post/${id}/comments/`, {})
  }
  
  getPostByCategory(id:number){
    return this.get(`http://localhost:8000/post/category/${id}/`, {})

  }
}