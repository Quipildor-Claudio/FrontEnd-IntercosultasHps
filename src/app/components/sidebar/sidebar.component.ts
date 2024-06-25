import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Medico } from '../../models/medico';
import { AuthService } from '../../services/auth.service';
import { MedicoService } from '../../services/medico.service';

@Component({
  selector: 'sidebar-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  authService = inject(AuthService);
  medicoService = inject(MedicoService);
  currentMedico: Medico;

  constructor() {
    this.currentMedico = new Medico();
  }
  ngOnInit(): void {
    this.getMedicoCokkie();
  }
  getMedicoCokkie() {
    let id = JSON.parse(sessionStorage.getItem('key'));
    this.medicoService.get(id).subscribe(res => {
      this.currentMedico = res; 
      console.log(res);
    });
  }
}
