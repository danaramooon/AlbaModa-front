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

  
  getDetailedProducts(list: number): Promise<Comment> {
    return this.get(`http://localhost:8000/api/task/${list}`, {});
  }
  
  createPost(title: any,owner : string): Promise<Post> {
    return this.post('http://localhost:8000/post_create', {
      title: title,   
      owner: owner
    });
  }
  
  updatePost(list: Post): Promise<Post> {
    return this.put(`http://localhost:8000/api/cbv/task_lists/${list.id}/`, {
      name: list.title
    });
  }
  deletePost(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/cbv/task_lists/${id}/`, {});
  }

  createTask(name: any,due_on:any,status:any,list:number): Promise<Comment> {
    return this.post(`http://localhost:8000/api/cbv/task_lists/${list}/tasks/create/`, {
      name: name,
      due_on:due_on,
      status:status
    });
  }
  updateTask(task: Comment) : Promise<Comment>{
    return this.put(`http://localhost:8000/api/task/${task.id}/`, {
      name: task.comment,
      created_at: task.date
    })
  }

  deleteTask(id: number) : Promise<any>{
    return this.delet(`http://localhost:8000/api/task/${id}/`, {})
  }

  getProducts(): Promise<Product[]> {
    return this.get(`http://localhost:8000/products/`, {})
  }

  getDetailProducts(id: number): Promise<Product[]> {
    return this.get(`http://localhost:8000/products/${id}/`, {})
  }
  
}