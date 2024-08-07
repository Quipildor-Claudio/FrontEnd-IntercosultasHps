import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { PacientesListComponent } from './pages/pacientes/pacientes-list/pacientes-list.component';
import { AddInterconsultaComponent } from './pages/interconsultas/add-interconsulta/add-interconsulta.component';
import { MedicosListComponent } from './pages/medicos/medicos-list/medicos-list.component';
import { AddMedicoComponent } from './pages/medicos/add-medico/add-medico.component';
import { AddPacienteComponent } from './pages/pacientes/add-paciente/add-paciente.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'auth',component:LoginComponent},
    
    {path:'admin',component:AdminComponent,children:[
        {path:'',component:AdminComponent},
       
    ]},
    {path:'pacientes',component:PacientesListComponent},
    {path:'paciente',component:AddPacienteComponent},
    {path:'paciente/:id',component:AddPacienteComponent},



    {path:'reportes',component:ReportesComponent},

    {path:'interconsulta',component:AddInterconsultaComponent},

    {path:'medicos',component:MedicosListComponent},
    {path:'medico',component:AddMedicoComponent},
    {path:'medico/:id',component:AddMedicoComponent},

    {path:'usuarios',component:UsuariosComponent},
    {path:'reportes',component:ReportesComponent},
    {path:'reports',component:ReportsComponent},







];
