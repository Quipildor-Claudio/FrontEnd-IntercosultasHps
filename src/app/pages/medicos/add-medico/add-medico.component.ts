import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Medico } from '../../../models/medico';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MedicoService } from '../../../services/medico.service';
import { ServicioService } from '../../../services/servicio.service';
import { Servicio } from '../../../models/servicio';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-add-medico',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, FormsModule,CommonModule],
  templateUrl: './add-medico.component.html',
  styleUrl: './add-medico.component.css'
})
export class AddMedicoComponent implements OnInit {
  title: string = "Añadir Medico";
  medicoForm: FormGroup;
  medico: Medico;
  servicios: Servicio[] = [];


  constructor(private fb: FormBuilder, private medicoService: MedicoService, 
    private servicioService: ServicioService,private router:Router ,
    private activatedRoute:ActivatedRoute) {

    this.medico = new Medico();

    this.medicoForm = this.fb.group({
      id: [''],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      cuil: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      titulo: [''],
      matricula: [''],
      servicio: ['',Validators.required],
      funcion: [''],
    });
  }


  ngOnInit(): void {
    this.cargar();
    this.getServicios();
  }
  cargar(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.medicoService.get(id).subscribe(res=>{
          this.medico = res;
          this.medicoForm.patchValue({
            id: this.medico._id,
            apellido: this.medico.apellido,
            nombre: this.medico.nombre,
            cuil: this.medico.cuil,
            titulo: this.medico.titulo,
            matricula: this.medico.matricula,
            servicio: this.medico.servicio,
            funcion: this.medico.funcion
          });
        });
      }
    }
    );
  }
  getServicios(): void {
    this.servicioService.getAll().subscribe((res) => {
      this.servicios = res as Servicio[];
      console.log(this.servicios);
    });
  }

  onSubmit() {
    if (this.medicoForm.valid) {
      const medico: Medico = new Medico(this.medicoForm.value);
      //console.log('Formulario enviado:', medico);
      this.medicoService.create(medico).subscribe(res=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${res.apellido}, sus datos guardados correctamente`,
          showConfirmButton: false,
          timer: 1800
        });
        this.router.navigate(['/interconsulta']);
      })
    }
  }
  update():void{
    if (this.medicoForm.valid) {
      const medicoo: Medico = new Medico(this.medicoForm.value);
      console.log('Formulario enviado:', medicoo);
      this.medicoService.update(this.medico._id,medicoo).subscribe(res=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${res.apellido}, sus datos actulizados correctamente`,
          showConfirmButton: false,
          timer: 1800
        });
        this.router.navigate(['/interconsulta']);
      })
    }
  }

  compare(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }
}
