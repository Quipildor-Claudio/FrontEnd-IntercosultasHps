import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico';
import { PaginatedResponse } from '../../../models/paginatedResponse';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medicos-list.component.html',
  styleUrl: './medicos-list.component.css'
})
export class MedicosListComponent implements OnInit {
  title: string = "Medicos";
  medicos?: Medico[];
  currentMedico: Medico = new Medico();
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  constructor(private medicoService: MedicoService) {

  }

  ngOnInit(): void {
    this.loadMedicos();
  }

  getAllData(): void {
    this.medicoService.getAll().subscribe((res: any) => {
      this.medicos = res.items as Medico[];
      console.log(this.medicos);
    });
  }

  loadMedicos(): void {
    this.medicoService.getMedicos(this.currentPage, this.limit).subscribe((data: PaginatedResponse<Medico>) => {
      this.medicos = data.items;
      this.totalItems = data.totalItems;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadMedicos();
  }
  delete(item: any): void {
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
          this.medicoService.delete(item._id).subscribe(() => {
            Swal.fire('Eliminado!', 'Su archivo ha sido eliminado', 'success');
            this.loadMedicos();
          });
        
      }
    })


  }

}
