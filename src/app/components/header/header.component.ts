import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Medico } from '../../models/medico';
import { MedicoService } from '../../services/medico.service';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  medico: Medico;
  authService = inject(AuthService);

  constructor(private router: Router) {
  }






  logout() {
    this.authService.logout().subscribe({
      next: () => {
        sessionStorage.clear();
        this.router.navigate(['/auth']);

      },
      error: (error) => {
        console.error(error);
      },
    });
  }

}
