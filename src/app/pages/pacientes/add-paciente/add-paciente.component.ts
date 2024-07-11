import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Paciente } from '../../../models/paciente';
import { PacienteService } from '../../../services/paciente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-paciente.component.html',
  styleUrl: './add-paciente.component.css'
})
export class AddPacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  title: string = "Nuevo Paciente"
  paciente: Paciente;
  constructor(private fb: FormBuilder, private pacienteService: PacienteService,
     private activatedRoute: ActivatedRoute,private router:Router) {
    this.paciente = new Paciente();
    this.pacienteForm = this.fb.group({

      dni: ['',[Validators.required, Validators.pattern('^[0-9]{8}$')]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [''],
      fecha_nac: ['',Validators.required],
      sexo: [''],
      cobertura_soc: [''],
      domicilio_pcte: [''],
      numero_dom: [null],
      man_dom: [null],
      lote_dom: [null]
    });
  }

  ngOnInit(): void {
    this.cargar();

  }
  cargar(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.pacienteService.get(id).subscribe(res => {
          this.paciente = res;
          this.pacienteForm.patchValue({
            dni: this.paciente.dni,
            nombre: this.paciente.nombre,
            apellido: this.paciente.apellido,
            edad: this.paciente.edad,
            fecha_nac: this.formatDate(this.paciente.fecha_nac),
            sexo: this.paciente.sexo,
            cobertura_soc: this.paciente.cobertura_soc,
            domicilio_pcte: this.paciente.domicilio_pcte,
            numero_dom: this.paciente.numero_dom,
            man_dom: this.paciente.man_dom,
            lote_dom: this.paciente.lote_dom
          });
        });
      }
    }
    );
  }

  onSubmit(): void {
    if (this.pacienteForm.valid) {
      const data:Paciente = new Paciente(this.pacienteForm.value);
      data.edad = this.calcularEdad(data.fecha_nac.toString());
      //console.log('Paciente data:', data);
      this.pacienteService.create(data).subscribe(res=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${res.apellido+" "+ res.nombre}, paciente guardado`,
          showConfirmButton: false,
          timer: 1800
        });
        this.router.navigate(['/interconsulta']);
      });
    }
  }
  update(): void {
    if (this.pacienteForm.valid) {
      const data:Paciente = new Paciente(this.pacienteForm.value);
      data.edad = this.calcularEdad(data.fecha_nac.toString());
      this.pacienteService.update(this.paciente._id,data).subscribe(res=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${res.apellido+" "+ res.nombre}, paciente actulizado`,
          showConfirmButton: false,
          timer: 1800
        });
        this.router.navigate(['/interconsulta']);
      });
    }

  }

  cleanForm(): void {
    this.paciente.apellido = '';
    this.paciente.dni = '';
    this.paciente.domicilio_pcte = '';
    this.paciente.edad = '';
    this.paciente.fecha_nac = null;
    this.paciente.lote_dom = null;
    this.paciente.sexo = null;
    this.paciente.nombre = '';
    this.paciente.man_dom = null;
    this.paciente.numero_dom = null;

  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  calcularEdad(fechaNacimiento: string): string {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return edad.toString();
  }

}
