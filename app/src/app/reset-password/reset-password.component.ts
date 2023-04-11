import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  id!: string;
  token!: string;
  payload!: any;
  resetform!: FormGroup;
  error!: string;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.resetform = this.formbuilder.group({
      password: ['', Validators.required],
      password1: ['', Validators.required],
    });
    this.id = this.route.snapshot.params['id'];
    this.token = this.route.snapshot.params['token'];
    this.getPayload();
  }

  getPayload() {
    this.api.getuser(this.id, this.token).subscribe({
      next: (res: any) => {
        this.payload = res;
        console.log(this.payload);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  resetpassword() {
    if (this.resetform.value.password === this.resetform.value.password1) {
      this.api.resetPassword(this.payload.id, this.payload.email,this.resetform.value.password).subscribe({
        next:(res)=>{
          console.log('password changed')
          console.log(res)
          this.router.navigate(['/login'])
        },
        error:(e)=>{
          console.log(e)
        }
      });
    } else {
      this.error = 'both password does not match';
      this.resetform.reset();
    }
  }
}
