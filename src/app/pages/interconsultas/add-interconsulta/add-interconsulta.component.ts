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
<<<<<<< Updated upstream
=======
import { EstudioService } from '../../../services/estudio.service';
import { FilterPipe } from '../../../pipes/filter.pipe'; 
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
>>>>>>> Stashed changes

@Component({
  selector: 'app-add-interconsulta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-interconsulta.component.html',
  styleUrl: './add-interconsulta.component.css'
})
export class AddInterconsultaComponent implements OnInit {
  title: string = 'Nueva Interconsulta';
<<<<<<< Updated upstream
  id:string= '6668438d762f85a14f5001e1' ;
  patients: Paciente[] = [];
  patient:Paciente;
  medico:Medico;
  estudio:Estudio =new Estudio();
  interconsulta:Interconsulta;

  
=======
  filterText: any;
  interconsultas:Interconsulta[]=[];
  patients: Paciente[] = [];
  patient: Paciente;
  medico: Medico;
  interconsulta: Interconsulta;
  interconsultaForm: FormGroup;
  tipoInterconsulta:string ='nueva';
  estudio:Estudio;
>>>>>>> Stashed changes
  searchControl = new FormControl('');
  estudios:Estudio[]=[];

<<<<<<< Updated upstream
  constructor(private medicoService: MedicoService, private pacienteService: PacienteService, private interconsultaService: InterconsultaService)
     {
      this.patient = new Paciente();
      this.interconsulta =  new Interconsulta();

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
=======
  constructor(private medicoService: MedicoService,private pacienteService: PacienteService, private fb: FormBuilder,private interconsultaService:InterconsultaService, private estudioService:EstudioService) {
    this.patient = new Paciente();
    this.estudio= new Estudio();
    this.interconsulta = new Interconsulta();
    this.interconsultaForm = this.fb.group({
    });
    this.searchPaciente();
  }
  ngOnInit(): void {
    this.getEstudios();
  };

 getEstudios(){
  this.estudioService.getAll().subscribe(data=>{this.estudios = data;});
 }

  searchPaciente(): void {

    this.searchControl.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((dni) => this.pacienteService.searchPatients(dni))
    ).subscribe((patients) => {
      if(patients[0]==null) {
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
      else{
      this.patient = patients[0];
     this.generarHistorial();
    }})
  }
  save(): void {
    if(this.estudio.descripcion == null || this.estudio.descripcion == ' ') {
      this.estudio.descripcion ='Sin estudio';    
    }
    this.interconsulta.id_paciente = this.patient;
    this.interconsulta.id_medico = JSON.parse(sessionStorage.getItem('medico')) as Medico;
    this.interconsulta.tipo = this.tipoInterconsulta;
    this.interconsulta.estudios.push(this.estudio)
    console.log(this.estudio);
    console.log(this.interconsulta);
    this.interconsultaService.create(this.interconsulta).subscribe(res=>{
      Swal.fire(
        'Éxito',
        `Interconsulta: ${this.interconsulta.tipo}, creada!`,
        'success'
      )
      console.log("respuesta"+res);
      this.generarHistorial();
      this.resetForm();
    });
  }

  resetForm(): void {
    this.interconsulta.descripcion='';
    this.estudio.descripcion='';

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
      confirmButtonText: 'Si'});
    this.resetForm();
  }

  generarHistorial(): void {
    this.interconsultaService.getAll().subscribe(res => {
      this.interconsultas = res;
      this.filtrarInterconsultas();
    });
  }
>>>>>>> Stashed changes

  filtrarInterconsultas(): void {
      this.interconsultas = this.interconsultas.filter(ic => ic.id_paciente._id === this.patient._id);
      console.log('interconsultas filtradas:', this.interconsultas);
  }

<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
}