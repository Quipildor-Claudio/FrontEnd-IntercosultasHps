import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sidebar-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
