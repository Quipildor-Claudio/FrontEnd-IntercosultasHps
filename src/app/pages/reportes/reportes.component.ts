import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Medico } from '../../models/medico';
import { Interconsulta } from '../../models/interconsulta';
import { Servicio } from '../../models/servicio';
import { InterconsultaService } from '../../services/interconsulta.service';
import { MedicoService } from '../../services/medico.service';
import { ServicioService } from '../../services/servicio.service';
import { PaginatedResponse } from '../../models/paginatedResponse';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  anio: number;
  mes: number;
  dias: number[];
  hoy: number;
  meses: string[];
  interconsultas: Interconsulta[] = [];
  servicios: Servicio[] = [];
  medicos: Medico[] = [];
  tablaDatos: any[] = [];

  constructor(
    private interconsultaService: InterconsultaService,
    private medicoService: MedicoService,
    private servicioService: ServicioService
  ) {
    const today = new Date();
    this.anio = today.getFullYear();
    this.mes = today.getMonth() + 1; 
    this.hoy = today.getDate();
    this.meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.generarDias();
  }

  ngOnInit() {
    this.getMedicos();
    this.getServicios();
  }

  generarDias() {
    const daysInMonth = new Date(this.anio, this.mes, 0).getDate();
    this.dias = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  actualizarTabla() {
    this.generarDias();
    
  }

  getServicios() {
    this.servicioService.getAll().subscribe(res => { 
      this.servicios = res;
      console.log('Servicios:', this.servicios);
    });
  }

  getMedicos() {
    let page = 1;
    const limit = 50;

    this.getMedicosPage(page, limit);
    this.getInterconsultas(page,limit);
  }

  getMedicosPage(page: number, limit: number) {
    this.medicoService.getMedicos(page, limit).subscribe((res: PaginatedResponse<Medico>) => {
      this.medicos = this.medicos.concat(res.items);
      if (page < res.totalPages) {
        this.getMedicosPage(page + 1, limit);
      } else {
      }
    });
  }

  getInterconsultas(page: number, limit: number) {
    this.interconsultaService.getInterconsultas(page, limit).subscribe((res: PaginatedResponse<Interconsulta>) => {
      this.interconsultas = this.interconsultas.concat(res.items);
      console.log('Interconsultas Página:', page, 'Interconsultas:', res.items);
      if (page < res.totalPages) {
        this.getInterconsultas(page + 1, limit);  // Continuar obteniendo interconsultas en la siguiente página
      } else {
        this.organizarDatosTabla();  // Una vez que se obtienen todas las interconsultas, organizar los datos de la tabla
      }
    });
  }

  organizarDatosTabla() {
    const tablaDatos = [];


    for (const servicio of this.servicios) {
      const especialidad = { nombre: servicio.servicio, medicos: [] };
      const medicosServicio = this.medicos.filter(medico => medico.servicio === servicio.servicio);


      for (const medico of medicosServicio) {
        const interconsultasMedico = this.interconsultas.filter(interconsulta => interconsulta.id_medico?._id === medico._id);

        const diasInterconsultas = Array(this.dias.length).fill(0);
        for (const interconsulta of interconsultasMedico) {
          const dia = new Date(interconsulta.createdAt).getDate();
          if (dia > 0 && dia <= this.dias.length) {
            diasInterconsultas[dia - 1]++;
            console.log(dia);
          }
        }


        especialidad.medicos.push({ nombre: `${medico.nombre} ${medico.apellido}`, interconsultas: diasInterconsultas });
      }
      tablaDatos.push(especialidad);
    }
    this.tablaDatos = tablaDatos;
    console.log('Tabla de Datos:', this.tablaDatos);
  }

}
