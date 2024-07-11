import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../models/paciente';
import { PacienteService } from '../../../services/paciente.service';
import { PaginatedResponse } from '../../../models/paginatedResponse';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../../pipes/filter.pipe';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  imports: [CommonModule,FilterPipe,RouterModule],
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

  delete(item:any): void {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: `Eliminar a: ${item.nombre} ${item.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.delete(item._id).subscribe(() => {
          Swal.fire('Eliminado!', 'Su archivo ha sido eliminado', 'success');
          this.loadPacientes();
        });
        
      }
    })

  }

}
