import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Medico } from '../../../models/medico';


@Component({
  selector: 'app-add-medico',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-medico.component.html',
  styleUrl: './add-medico.component.css'
})
export class AddMedicoComponent implements OnInit {
  title: string = "Añadir Medico";
  medicoForm: FormGroup;
  medico: Medico;

  constructor(private fb: FormBuilder) { 
    this.medico = new Medico();

    this.medicoForm = this.fb.group({
      id: [''],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      cuil: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      titulo: ['', Validators.required],
      matricula: ['', Validators.required],
      servicio: ['', Validators.required],
      funcion: ['', Validators.required],
    });
  }


  ngOnInit(): void {

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

}
