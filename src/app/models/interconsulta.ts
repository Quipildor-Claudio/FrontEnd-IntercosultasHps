import { Paciente } from "./paciente";
import { Medico } from "./medico";
import { Estudio } from "./estudio";



export class Interconsulta {
    _id:any;
    descripcion:string;
    lugar:string;
    tipo:string;
    paciente:Paciente;
    medico:Medico;
    estudios:Estudio[]=[];

    constructor(init?: Partial<Interconsulta>) {
        Object.assign(this, init);
    }
}
