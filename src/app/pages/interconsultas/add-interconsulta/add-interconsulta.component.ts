import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Medico } from '../../../models/medico';
import { Interconsulta } from '../../../models/interconsulta';

@Component({
  selector: 'app-add-interconsulta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-interconsulta.component.html',
  styleUrl: './add-interconsulta.component.css'
})
export class AddInterconsultaComponent implements OnInit {
  title: string = 'Nueva Interconsulta';
  patients: Paciente[] = [];
  patient:Paciente;
  medico:Medico;
  currentInterconsulta:Interconsulta;
  
  searchControl = new FormControl('');

  constructor(private medicoService: MedicoService,
    private pacienteService: PacienteService) {
      this.patient = new Paciente();
      this.currentInterconsulta =  new Interconsulta();

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
 

  };

}


