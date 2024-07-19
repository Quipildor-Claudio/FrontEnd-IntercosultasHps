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
declare var $: any;

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
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
  interMedicas: Interconsulta[] = [];
  diasInter: Interconsulta[] = [];
  

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
    this.getServicios();
    this.getMedicos();
    this.inicializarDataTables();
  }

  inicializarDataTables() {
    setTimeout(() => {
      $("#example1").DataTable({
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        buttons: [
           'excel', 'pdf', 'print'
        ]
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    }, 100); // Ajusta el tiempo de espera según sea necesario
  }

  generarDias() {
    this.mes = new Date(this.anio, this.mes, 0).getMonth()+1;
    const daysInMonth = new Date(this.anio, this.mes, 0).getDate();
    this.dias = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    console.log(daysInMonth);
  }

  actualizarTabla() {
    this.generarDias();
    this.getMedicos();
  }

  getServicios() {
    this.servicioService.getAll().subscribe(res => { this.servicios = res; });
  }

  getMedicos() {
    let page = 1;
    const limit = 50;

    this.medicos = []; // Limpiar medicos
    this.interconsultas = []; // Limpiar interconsultas
    this.tablaDatos = []; // Limpiar tablaDatos
    this.getMedicosPage(page, limit);
  }

  getMedicosPage(page: number, limit: number) {
    this.medicoService.getMedicos(page, limit).subscribe((res: PaginatedResponse<Medico>) => {
      this.medicos = this.medicos.concat(res.items);
      if (page < res.totalPages) {
        this.getMedicosPage(page + 1, limit);
      } else {
        this.getInterconsultas(1, 50); 
      }
    });
  }

  getInterconsultas(page: number, limit: number) {
    this.interconsultaService.getInterconsultas(page, limit).subscribe((res: PaginatedResponse<Interconsulta>) => {
      this.interconsultas = this.interconsultas.concat(res.items);
      if (page < res.totalPages) {
        this.getInterconsultas(page + 1, limit);
      } else {
        this.organizarDatosTabla(); 
      }
    });
  }

  organizarDatosTabla() {
    console.log(this.mes,'/',this.anio)
    const tablaDatos = [];
    const interconsultas_validas = this.interconsultas.filter(interconsulta => interconsulta.medico != null);

    for (const servicio of this.servicios) {
      const especialidad = { nombre: servicio.servicio, medicos: [] };
      const medicosServicio = this.medicos.filter(medico => medico.servicio === servicio.servicio && medico._id != null);

      for (const medico of medicosServicio) {
        const interconsultasMedico = interconsultas_validas.filter(interconsulta => interconsulta.medico._id === medico._id);
        const diasInterconsultas = Array(this.dias.length).fill(0);

        for (const interconsulta of interconsultasMedico) {
          const fechaInterconsulta = new Date(interconsulta.createdAt);
          if (fechaInterconsulta.getFullYear() === this.anio && fechaInterconsulta.getMonth() + 1 === this.mes) {
            const dia = fechaInterconsulta.getDate();
            diasInterconsultas[dia - 1]++;
          }
        }

        especialidad.medicos.push({ nombre: `${medico.nombre} ${medico.apellido}`, interconsultas: diasInterconsultas });
      }
      tablaDatos.push(especialidad);
    }
    this.tablaDatos = tablaDatos;
    console.log("Tabla de Datos:", this.tablaDatos);
  }
}
