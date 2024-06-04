import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico';

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
  currentIndex = -1;
  constructor(private medicoService:MedicoService){

  }

  ngOnInit(): void {
      this.getAllData();
  }

  getAllData():void{
    this.medicoService.getAll().subscribe((res:any)=>{
     this.medicos= res.items as Medico[];
     console.log(this.medicos);
    });
  }
}
