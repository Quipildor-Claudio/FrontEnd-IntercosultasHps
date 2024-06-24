import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})



export class LoginComponent {
  medicoService = inject(MedicoService);
  register: boolean = false;
  medicos: any[] = [];
  medico: Medico;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.medico = new Medico();
  }



  form: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    medico: ['']
  });

  signUp(e: Event) {
    e.preventDefault();
    console.log(this.form.value);

    this.authService.signUp(this.form.value).subscribe({
      next: () => {
        this.form.reset();
        this.register = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },

    });


    /**
        this.authService.signUp(this.form.value).subscribe({
          next: () => {
            this.form.reset();
            this.register = false;
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
          },
        });
         */
  }

  signIn(e: Event) {
    e.preventDefault();
    this.authService.signIn(this.form.value).subscribe({
      next: (res: any) => {
        sessionStorage.setItem('key', JSON.stringify(res.id));
        console.log(res.id)
        this.router.navigate(['/interconsulta']);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }


  onDniInput(event: any) {
    const cuil = event.target.value;
    if (cuil.length >= 2) { // Empieza a buscar a partir de 3 caracteres
      this.medicoService.searchMedicoByDni(cuil).subscribe(res => {
        this.medicos = res
        console.log(this.medicos);
      });
    }
  }
  compare(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1._id === o2._id;
  }
}
