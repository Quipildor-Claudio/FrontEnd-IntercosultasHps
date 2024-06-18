import { Paciente } from "./paciente";
import { Medico } from "./medico";
import { Estudio } from "./estudio";



export class Interconsulta {
    _id:any;
    descripcion:string;
    lugar:string;
    tipo:string;
    id_paciente:Paciente;
    id_medico:Medico;
    estudios:Estudio[]=[];
    createdAt: Date;
    constructor(init?: Partial<Interconsulta>) {
        Object.assign(this, init);
    }
}
