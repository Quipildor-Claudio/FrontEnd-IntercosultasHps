import { Component, OnInit } from '@angular/core';
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
import { AlertServiceService } from '../../../services/alert-service.service';
import { Router } from '@angular/router';

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
  banVacio: boolean = false;

  constructor(private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private fb: FormBuilder,
    private interconsultaService: InterconsultaService,
    private estudioService: EstudioService,
    private alertService: AlertServiceService,
    private router: Router) {
    this.patient = new Paciente();
    this.estudio = new Estudio();
    this.interconsulta = new Interconsulta();
    this.interconsultaForm = this.fb.group({});
    this.searchPaciente();
  }

  ngOnInit(): void {
    this.getMedicoCokkie();

    if (this.alertService.shouldShowAlertAfterRegistration()) {
      Swal.fire({
        title: "Por favor, actualice sus datos personales.",
        width: 600,
        padding: "3em",
        color: "#000000",
        background: "#FFFFFF",
        backdrop: `
        rgba(16, 202, 237, 0.4) 
        left top
        no-repeat
      `
      });
    }
    this.getEstudios();
  };

  getEstudios() {
    this.estudioService.getAll().subscribe(data => { this.estudios = data; });
  }

  searchPaciente(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((dni) => this.pacienteService.searchPatients(dni))
    ).subscribe((patients) => {
      console.log(patients);
      if (patients[0] == null) {
        this.banVacio = true;
      }
      else {
        this.patient = patients[0];
        this.banVacio=false;
        this.generarHistorial();
      }
    })
  }
  //estudios
  saveEstudios() {
    if (this.estudio.descripcion != null && this.estudio.descripcion.trim() !== '') {
      this.interconsulta.estudios.push({ ...this.estudio });
      this.estudio = new Estudio();
    } else {
      Swal.fire({
        title: 'Ingrese estudio',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      });
    }
    console.log('estudios guardados', this.interconsulta.estudios)
  }

  deleteEstudios(id: string) {
    console.log(id)
    const index = this.interconsulta.estudios.findIndex(estudio => {
      estudio._id === id;
      console.log('estudio a borrar:', this.estudio)
    }

    );
    this.interconsulta.estudios.splice(index, 1);
    console.log('estudios finales', this.interconsulta.estudios)

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
    this.interconsultaService.getAll().subscribe(res => {
      this.interconsultas = res;
      this.filtrarInterconsultas();
    });
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
  nuevoPaciente():void{
    this.router.navigate(['/paciente']);
  }
}
