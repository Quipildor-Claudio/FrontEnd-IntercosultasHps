import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Medico } from '../../../models/medico';
import { Interconsulta } from '../../../models/interconsulta';
import { InterconsultaService } from '../../../services/interconsulta.service';

@Component({
  selector: 'app-add-interconsulta',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-interconsulta.component.html',
  styleUrl: './add-interconsulta.component.css'
})
export class AddInterconsultaComponent implements OnInit {
  title: string = 'Nueva Interconsulta';
  patients: Paciente[] = [];
  patient: Paciente;
  medico: Medico;
  currentInterconsulta: Interconsulta;
  interconsultaForm: FormGroup;


  searchControl = new FormControl('');

  constructor(private medicoService: MedicoService,
    private pacienteService: PacienteService, private fb: FormBuilder,private interconsultaService:InterconsultaService) {
    this.patient = new Paciente();
    this.currentInterconsulta = new Interconsulta();

    this.interconsultaForm = this.fb.group({

    });

    this.searchPaciente();
  }
  ngOnInit(): void {


  };


  searchPaciente(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((dni) => this.pacienteService.searchPatients(dni))
    ).subscribe((patients) => {
      this.patient = patients[0]
      console.log(patients)
    })
  }


  save(): void {

    this.currentInterconsulta.id_paciente = this.patient;
    this.currentInterconsulta.id_medico = JSON.parse(sessionStorage.getItem('medico')) as Medico;
    this.currentInterconsulta.tipo = "Nueva";
    console.log(this.currentInterconsulta);

    this.interconsultaService.create(this.currentInterconsulta).subscribe(res=>{
      console.log("respuesta"+res);
    });



  }


  cancel(): void {

  }

}


