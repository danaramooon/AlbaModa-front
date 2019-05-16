import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public show:boolean;
  public auth:boolean;
  public username:string;
  public isAdmin:boolean;
  
  constructor(private auth_:AuthService) { }
  ngOnInit() {
    this.username = localStorage.getItem("username")
    if(this.auth_.isAuthenticated() || this.auth_.isToken()){
      this.show = false;
      this.auth = true;
      if(this.username==="admin"){
        this.isAdmin= true;
      }
    }
    if(!this.auth_.isAuthenticated() || !this.auth_.isToken()){
      this.show = true;
      this.auth = false;
    }
  }
  logout(){
    localStorage.clear();
  }
  
}