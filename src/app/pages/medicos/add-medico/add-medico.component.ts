import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Medico } from '../../../models/medico';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MedicoService } from '../../../services/medico.service';
import { ServicioService } from '../../../services/servicio.service';
import { Servicio } from '../../../models/servicio';



@Component({
  selector: 'app-add-medico',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './add-medico.component.html',
  styleUrl: './add-medico.component.css'
})
export class AddMedicoComponent implements OnInit {
  title: string = "Añadir Medico";
  medicoForm: FormGroup;
  medico: Medico;
  servicios: Servicio[] = [];


  constructor(private fb: FormBuilder, private medicoService: MedicoService, private servicioService: ServicioService) {
    this.medico = new Medico();

    this.medicoForm = this.fb.group({
      id: [''],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      cuil: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      titulo: [''],
      matricula: [''],
      servicio: [''],
      funcion: [''],
    });
  }


  ngOnInit(): void {
    this.getServicios();
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
      console.log('Formulario enviado:', medico);
     

      // Aquí puedes añadir la lógica para enviar el formulario, por ejemplo, a través de un servicio.
    } else {
      console.log('Formulario inválido');
    }
  }

  compare(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }
}
