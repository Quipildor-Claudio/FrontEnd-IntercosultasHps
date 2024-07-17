import { Component, Inject, OnInit } from '@angular/core';
import { InterconsultaService } from '../../services/interconsulta.service';
import { Interconsulta } from '../../models/interconsulta';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MonthlyReport {
  medico: string;
  servicio: string;
  days: number[];
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})


export class ReportsComponent implements OnInit {
  interconsultas: Interconsulta[] = [];
  fechaInicio: string;
  fechaFin: string;
  displayedColumns: string[] = [];
  dataSource: MonthlyReport[] = [];

  constructor(private interService: InterconsultaService) { }
  ngOnInit(): void {
    // this.getPrueba();
  }

  buscar() {
    this.interService.buscarPorRangoDeFecha(this.fechaInicio,this.fechaFin).subscribe((res: Interconsulta[]) => {
      this.interconsultas = res;
      console.log(this.interconsultas);
    });
  }

  generateMonthlyReport() {
    const reportMap = new Map<string, MonthlyReport>();
 
  }

}
