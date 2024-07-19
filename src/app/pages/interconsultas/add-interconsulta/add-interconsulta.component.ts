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
import { PaginatedResponse } from '../../../models/paginatedResponse';

@Component({
  selector: 'app-add-interconsulta',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, FilterPipe],
  templateUrl: './add-interconsulta.component.html',
  styleUrls: ['./add-interconsulta.component.css']
})
export class AddInterconsultaComponent implements OnInit {
  title: string = 'Nueva Interconsulta';
  filterText: any;
  interconsultas: Interconsulta[] = [];
  interconsultasEjem: Interconsulta[] = [];
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
  banInter: boolean = false;

  //PAGINACION
  currentInter: Interconsulta = new Interconsulta();
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;

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
    this.loadInters();
    this.getMedicoCokkie();
    this.searchPaciente();

    // alert para la primera ves que se lloguea despues de registrarse llene todos sus datos
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
        this.banInter = false;

      }
      else {
        this.patient = patients[0];
        this.banVacio = false;
        this.banInter = true;
       this.getInterconsultaByPaciente();
        this.banVacio = false;
      }
    })
  }

  //estudios
  saveEstudios() {
    if (this.estudio.descripcion && this.estudio.descripcion.trim() !== '') {
      const exists = this.interconsulta.estudios.some(est => est.descripcion === this.estudio.descripcion);
      if (!exists) {
        this.interconsulta.estudios.push({ ...this.estudio });
        this.estudio = new Estudio();
        const estudioInput = document.querySelector('input[name="estudio"]') as HTMLInputElement;
        if (estudioInput) {
          estudioInput.value = '';
        }

        console.log('Estudio agregado');
      } else {
        Swal.fire({
          title: 'Estudio duplicado',
          text: 'El estudio ya existe en la lista.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    } else {
      Swal.fire({
        title: 'Ingrese estudio',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    console.log('estudios guardados', this.interconsulta.estudios)
  }


  deleteEstudios(id: string) {
    console.log(id)
    const index = this.interconsulta.estudios.findIndex(estudio => {
      estudio.descripcion === id;
      console.log('estudio a borrar:', this.estudio)
    });
    this.interconsulta.estudios.splice(index, 1);
    console.log('estudios finales', this.interconsulta.estudios)

  }

  save(): void {
    if (this.interconsulta.estudios.length <= 0) {
      this.interconsulta.estudios.push(new Estudio({ descripcion: 'Sin estudio' }));
    }
    this.interconsulta.paciente = this.patient;
    this.interconsulta.medico = this.medico;
    this.interconsulta.tipo = this.tipoInterconsulta;
    console.log(this.interconsulta)

    this.interconsultaService.create(this.interconsulta).subscribe(res => {
      Swal.fire(
        'Éxito',
        `Interconsulta: ${this.interconsulta.tipo}, creada!`,
        'success'
      );
      this.resetForm();
      this.getInterconsultaByPaciente();
      this.interconsulta = new Interconsulta();
      this.estudios = [];
      const formElements = document.querySelectorAll('.form-control');
      formElements.forEach((element: any) => {
        element.value = '';
      });
    }, err => {
      Swal.fire(
        'Error',
        'Hubo un problema al crear la interconsulta',
        'error'
      );
      console.error('Error al crear interconsulta', err);

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
  getMedicoCokkie() {
    let id = JSON.parse(sessionStorage.getItem('key'));
    this.medicoService.get(id).subscribe(res => {
      this.medico = res;
      console.log('usuario:', this.medico);
    });
  }
  nuevoPaciente(): void {
    this.router.navigate(['/paciente']);
  }
  loadInters(): void {
    this.interconsultaService.getInterconsultas(this.currentPage, this.limit).subscribe((data: PaginatedResponse<Interconsulta>) => {
      this.interconsultasEjem = data.items;
      this.totalItems = data.totalItems;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
      console.log(this.interconsultasEjem, this.totalPages)
    });
  }

 getInterconsultaByPaciente(): void {
    this.interconsultaService.getInterconsultaByPaciente(this.patient._id).subscribe(res => {
      this.interconsultas = res;
      this.interconsultas.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      console.log(this.interconsultas);
    });
  } 
}
