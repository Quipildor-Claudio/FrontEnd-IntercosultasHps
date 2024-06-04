import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../models/paciente';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  imports: [],
  templateUrl: './pacientes-list.component.html',
  styleUrl: './pacientes-list.component.css'
})
export class PacientesListComponent  implements OnInit{
  pacientes?: Paciente[];
  currentPaciente: Paciente = new Paciente();
  currentIndex = -1;
  title = 'Listado de Pacientes';
  constructor(private pacienteService:PacienteService){}
  ngOnInit(): void {
      this.getAllData();
  }

  getAllData():void{
    this.pacienteService.getAll().subscribe((res:any)=>{
     this.pacientes= res.items as Paciente[];
     console.log(this.pacientes);
    });
  }

}
