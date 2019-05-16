    
export interface Category {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string
  text :string
  category :Category
  owner : IUser
  date: string
  like :number
  img_src:string
}

export interface IAuthResponse {
  token: string;
}
export interface IUser {
  username: string,
  password: string,
  email: string
}

export interface Comment{
    id:number
    comment:string
    owner :IUser
    post :Post
    date :string
}
export interface Product{
    id:number
    name:string
    price :number
    img_src:string
}