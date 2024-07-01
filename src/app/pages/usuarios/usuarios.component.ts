import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { PaginatedResponse } from '../../models/paginatedResponse';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  title: string = "Usuarios";
  usuarios?: User[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  editingUser: any = null;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();

  }

  loadUsers(): void {
    this.userService.getPacientes(this.currentPage, this.limit).subscribe((data: PaginatedResponse<User>) => {
      this.usuarios = data.items;
      this.totalItems = data.totalItems;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
      console.log(this.usuarios);
    });
  }

  editUser(user: any): void {
    this.editingUser = { ...user };
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  deleteUser(id:any):void{
    this.userService.delete(id).subscribe(()=>{
        this.loadUsers();
    });
  }

}
