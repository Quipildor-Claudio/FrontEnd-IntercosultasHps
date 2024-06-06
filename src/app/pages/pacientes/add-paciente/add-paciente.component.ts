import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Paciente } from '../../../models/paciente';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-add-paciente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-paciente.component.html',
  styleUrl: './add-paciente.component.css'
})
export class AddPacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  title: string = "Nuevo Paciente"
  paciente: Paciente;
  constructor(private fb: FormBuilder,private pacienteService:PacienteService) {
    this.paciente = new Paciente();

  }

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      _id: [''],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [''],
      fecha_nac: [''],
      sexo: [''],
      cobertura_soc: [''],
      domicilio_pcte: [''],
      numero_dom: [null],
      man_dom: [null],
      lote_dom: [null]
    });

  }

    onSubmit(): void {
    if (this.pacienteForm.valid) {
      this.paciente = new Paciente(this.pacienteForm.value);
      console.log('Paciente data:', this.paciente);
    }
  }

}
