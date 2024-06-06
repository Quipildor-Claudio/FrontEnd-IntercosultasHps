import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Medico } from '../../models/medico';

@Component({
  selector: 'sidebar-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
   currentMedico:Medico = new Medico();
   
   constructor(){
      
   }
   ngOnInit(): void {
       this.currentMedico = JSON.parse(sessionStorage.getItem('medico'));
   }
}
