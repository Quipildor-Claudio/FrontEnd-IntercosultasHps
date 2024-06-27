import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico';
import { PaginatedResponse } from '../../../models/paginatedResponse';
@Component({
  selector: 'app-medicos-list',
  standalone: true,
  imports: [],
  templateUrl: './medicos-list.component.html',
  styleUrl: './medicos-list.component.css'
})
export class MedicosListComponent implements OnInit{
  title:string="Medicos";
  medicos?: Medico[];
  currentMedico: Medico = new Medico();
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  constructor(private medicoService:MedicoService){

  }

  ngOnInit(): void {
      this.loadMedicos();
  }

  getAllData():void{
    this.medicoService.getAll().subscribe((res:any)=>{
     this.medicos= res.items as Medico[];
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
  deletePaciente(id: string): void {
    this.medicoService.delete(id).subscribe(() => {
      this.loadMedicos();
    });
  }

}
