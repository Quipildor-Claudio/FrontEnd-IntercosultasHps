import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../models/paciente';
import { PacienteService } from '../../../services/paciente.service';
import { PaginatedResponse } from '../../../models/paginatedResponse';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../../pipes/filter.pipe';
@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  imports: [CommonModule,FilterPipe],
  templateUrl: './pacientes-list.component.html',
  styleUrl: './pacientes-list.component.css'
})
export class PacientesListComponent implements OnInit {
  pacientes?: Paciente[];
  currentPaciente: Paciente = new Paciente();
  title = 'Pacientes';
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.loadPacientes();
  }

  getAllData(): void {
    this.pacienteService.getAll().subscribe((res: any) => {
      this.pacientes = res.items as Paciente[];
      console.log(this.pacientes);
    });
  }

  loadPacientes(): void {
    this.pacienteService.getPacientes(this.currentPage, this.limit).subscribe((data: PaginatedResponse<Paciente>) => {
      this.pacientes = data.items;
      this.totalItems = data.totalItems;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadPacientes();
  }
  deletePaciente(id: string): void {
    this.pacienteService.delete(id).subscribe(() => {
      this.loadPacientes();
    });
  }

}
