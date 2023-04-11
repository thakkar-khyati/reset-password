import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {  }

  sendLink(email:string){
    const objemail ={
      email:email
    }
    return this.http.post('http://localhost:3000/user/forget-password',objemail)
  }

  getuser(id:string,token:string){
    return this.http.get(`http://localhost:3000/user/reset-password/${id}/${token}`)
  }

  resetPassword(id:string,email:string,password:string){
    const payload = {
      id,
      email,
      password
    }
    return this.http.post('http://localhost:3000/user/reset-password',payload)
  }
}
