import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/servicio';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { AlertServiceService } from '../../services/alert-service.service';



@Component({
  selector: 'login-component',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit {
  register: boolean = false;
  loginError: boolean = false;
  firtlogin: boolean = false;
  medicos: any[] = [];
  servicios: any[] = [];
  medico: Medico;
  user: User;

  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,8}$')]],
    servicio: [''],


  });


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private servicioService: ServicioService,
    private medicoService: MedicoService,
    private alertService: AlertServiceService) {

    this.medico = new Medico();
    this.user = new User();
  }

  ngOnInit(): void {
    this.getServicios();
    this.toggleValidators();
  }
  toggleValidators(): void {
    if (this.register) {
      this.form.get('apellido')?.setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]+$')]);
      this.form.get('nombre')?.setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]+$')]);
      this.form.get('dni')?.setValidators([Validators.required, Validators.pattern('^[0-9]{7,8}$')]);
    } else {
      this.form.get('apellido')?.clearValidators();
      this.form.get('nombre')?.clearValidators();
      this.form.get('dni')?.clearValidators();
      this.form.get('servicio')?.clearValidators();
    }
    this.form.get('apellido')?.updateValueAndValidity();
    this.form.get('nombre')?.updateValueAndValidity();
    this.form.get('dni')?.updateValueAndValidity();
    this.form.get('servicio')?.updateValueAndValidity();
  }
  getServicios(): void {
    this.servicioService.getAll().subscribe((res) =>
      this.servicios = res as Servicio[]
    );
  }


  signUp(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      const { username, password, apellido, nombre, dni, servicio } = this.form.value;
      this.user.username = username;
      this.user.password = password;
      this.medico.apellido = apellido;
      this.medico.nombre = nombre;
      this.medico.cuil = dni;
      this.medico.servicio = servicio;
      this.medicoService.create(this.medico).subscribe((res: Medico) => {
        this.user.medico = res
        this.authService.signUp(this.user).subscribe({
          next: () => {
            Swal.fire({
              title: "Usuario Registrado",
              width: 600,
              padding: "3em",
              color: "#716add",
              background: "#fff ",
              backdrop: `
              rgba(0,0,123,0.4)
              left top
              no-repeat
            `
            });

            this.form.reset();
            this.register = false;
            this.alertService.showAlertAfterRegistration();
          },
          error: (error: HttpErrorResponse) => {
            if(error.status == 400){
              Swal.fire({
                title: "El usuario ya existe",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff ",
                backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
              `
              });
  
            }
            console.error(error);
          },
        });

      });
    }

  }



  signIn(e: Event) {
    e.preventDefault();
    this.authService.signIn(this.form.value).subscribe({
      next: (res: any) => {
        sessionStorage.setItem('key', JSON.stringify(res.id));
   
        this.router.navigate(['/interconsulta']);
      },
      error: (error: HttpErrorResponse) => {
        this.loginError = true;
        console.error(error);
      },
    });
  }


  compare(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1._id === o2._id;
  }
}
