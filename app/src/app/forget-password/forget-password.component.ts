import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetpasswordForm!:FormGroup
  response!:string

  constructor(private formBuilder:FormBuilder, private api:ApiService){}

  ngOnInit(): void {
    this.forgetpasswordForm = this.formBuilder.group({
      email:['',Validators.required]
    })
  }

  forgetpassword(){
    const email = this.forgetpasswordForm.value.email
    this.api.sendLink(email).subscribe({
      next:(res)=>{
        this.response = 'link sent'
        console.log('link sent')
        console.log(res)
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }
}
