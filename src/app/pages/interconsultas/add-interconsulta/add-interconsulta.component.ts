import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Medico } from '../../../models/medico';
import { Interconsulta } from '../../../models/interconsulta';
import { InterconsultaService } from '../../../services/interconsulta.service';
import { Estudio } from '../../../models/estudio';

@Component({
  selector: 'app-add-interconsulta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-interconsulta.component.html',
  styleUrl: './add-interconsulta.component.css'
})
export class AddInterconsultaComponent implements OnInit {
  title: string = 'Nueva Interconsulta';
  id:string= '6668438d762f85a14f5001e1' ;
  patients: Paciente[] = [];
  patient:Paciente;
  medico:Medico;
  estudio:Estudio =new Estudio();
  interconsulta:Interconsulta;

  
  searchControl = new FormControl('');

  constructor(private medicoService: MedicoService, private pacienteService: PacienteService, private interconsultaService: InterconsultaService)
     {
      this.patient = new Paciente();
      this.interconsulta =  new Interconsulta();

      this.searchControl.valueChanges.pipe(
        debounceTime(800),
        distinctUntilChanged(),
        switchMap((dni) => this.pacienteService.searchPatients(dni))
      ).subscribe((patients) => {
        this.patient = patients[0]
        console.log(patients)
      })
 
  }
  ngOnInit(): void {
  this.getMedico(this.id);
  }

getMedico(id:string): void{
  this.medicoService.get(id).subscribe({
    next: (data) => {
      this.medico = data;
      console.log('medico interconsulta:', this.medico);
    },
    error: (e) => console.error('Error al obtener el médico:', e)
  });
}


  createInterconsulta() {
   
    this.interconsulta.lugar = 'servicio';
    this.interconsulta.medico = this.medico;
    this.interconsulta.paciente = this.patient;
    this.interconsulta.tipo = (document.querySelector('input[name="radio1"]:checked') as HTMLInputElement).nextElementSibling?.textContent || 'Nuevo';
    this.interconsulta.estudios.push({ id_estudio: '6669a0f6a416a6a4e77359fb' });

    console.log('json:', this.interconsulta);

    this.interconsultaService.create(this.interconsulta).subscribe(
      (response) => {
        console.log('Interconsulta creada:', response);
        alert('Interconsulta guardada con éxito.');
      },
      (error) => {
        console.error('Error al crear la interconsulta:', error);
        alert('Hubo un error al guardar la interconsulta.');
      }
    );
  }
}