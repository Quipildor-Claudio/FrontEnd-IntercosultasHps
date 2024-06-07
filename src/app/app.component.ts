import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './components/admin/admin.component';
import { MedicoService } from './services/medico.service';
import { Medico } from './models/medico';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,HeaderComponent,SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'FrontEnd-Interconsultas';
  currentMedico:Medico= new Medico();
  constructor(private medicoService:MedicoService){}

  ngOnInit(): void {
      this.getMedico('66630635490fa822d31c5284');
  }

  getMedico(id: string): void {
    this.medicoService.get(id).subscribe({
      next: (data) => {
        this.currentMedico = data;
        sessionStorage.setItem('medico',JSON.stringify (data));
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
