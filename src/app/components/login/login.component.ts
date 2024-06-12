import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router){}

  register: boolean = false;

  form: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  signUp(e: Event) {
    e.preventDefault();

    this.authService.signUp(this.form.value).subscribe({
      next: () => {
        this.form.reset();
        this.register = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  signIn(e: Event) {
    e.preventDefault();

    this.authService.signIn(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/interconsulta']);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }


}
