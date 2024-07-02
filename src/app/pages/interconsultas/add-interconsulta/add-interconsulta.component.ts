import { Component, OnInit, inject } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Medico } from '../../../models/medico';
import { Interconsulta } from '../../../models/interconsulta';
import { InterconsultaService } from '../../../services/interconsulta.service';
import { Estudio } from '../../../models/estudio';
import { EstudioService } from '../../../services/estudio.service';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { AlertServiceService } from '../../../services/alert-service.service';

@Component({
  selector: 'app-add-interconsulta',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, FilterPipe],
  templateUrl: './add-interconsulta.component.html',
  styleUrl: './add-interconsulta.component.css'
})
export class AddInterconsultaComponent implements OnInit {
  title: string = 'Nueva Interconsulta';
  filterText: any;
  interconsultas: Interconsulta[] = [];
  patients: Paciente[] = [];
  patient: Paciente;
  medico: Medico = new Medico();
  interconsulta: Interconsulta;
  interconsultaForm: FormGroup;
  tipoInterconsulta: string = 'nueva';
  estudio: Estudio;
  searchControl = new FormControl('');
  estudios: Estudio[] = [];


  constructor(private medicoService: MedicoService, 
    private pacienteService: PacienteService,
    private fb: FormBuilder,
    private interconsultaService: InterconsultaService,
    private estudioService: EstudioService,
    private alertService: AlertServiceService) {
    this.patient = new Paciente();
    this.estudio = new Estudio();
    this.interconsulta = new Interconsulta();
    this.interconsultaForm = this.fb.group({
    });
    this.searchPaciente();
  }
  ngOnInit(): void {
    if (this.alertService.shouldShowAlertAfterRegistration()) {
      Swal.fire({
        title: "Por favor, actualice sus datos personales.",
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
    this.getEstudios();
    this.getMedicoCokkie();
  };

  getEstudios() {
    this.estudioService.getAll().subscribe(data => { this.estudios = data; });
  }

  searchPaciente(): void {

    this.searchControl.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((dni) => this.pacienteService.searchPatients(dni))
    ).subscribe((patients) => {
      if (patients[0] == null) {
        Swal.fire({
          title: 'ERROR EN LA BÚSQUEDA',
          text: 'No se encontro al paciente',
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        });
      }
      else {
        this.patient = patients[0];
        this.generarHistorial();
      }
    })
  }
  save(): void {
    if (this.estudio.descripcion == null || this.estudio.descripcion == ' ') {
      this.estudio.descripcion = 'Sin estudio';
    }
    this.interconsulta.id_paciente = this.patient;
    this.interconsulta.id_medico = this.medico;

    this.interconsulta.tipo = this.tipoInterconsulta;
    this.interconsulta.estudios.push(this.estudio)
    console.log(this.estudio);
    console.log(this.interconsulta);
    this.interconsultaService.create(this.interconsulta).subscribe(res => {
      Swal.fire(
        'Éxito',
        `Interconsulta: ${this.interconsulta.tipo}, creada!`,
        'success'
      )
      console.log("respuesta" + res);
      this.generarHistorial();
      this.resetForm();
    });
  }

  resetForm(): void {
    this.interconsulta.descripcion = '';
    this.estudio.descripcion = '';

  }

  isSelectedRole(tipo: string): void {
    this.tipoInterconsulta = tipo;
  }

  cancel(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    });
    this.resetForm();
  }

  generarHistorial(): void {
    if (this.patient._id != null) {
      this.interconsultaService.getInterconsultaByPaciente(this.patient._id).subscribe(res => {
        this.interconsultas = res;
        console.log(this.interconsultas);
        // this.filtrarInterconsultas();
      });
    }
  }

  filtrarInterconsultas(): void {
    this.interconsultas = this.interconsultas.filter(ic => ic.id_paciente._id === this.patient._id);
    console.log('interconsultas filtradas:', this.interconsultas);
  }

  getMedicoCokkie() {
    let id = JSON.parse(sessionStorage.getItem('key'));
    this.medicoService.get(id).subscribe(res => {
      this.medico = res;
      console.log('usuario:', this.medico);
    });
  }

}