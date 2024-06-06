export class Medico {
    id: any;
    apellido: string;
    nombre: string;
    cuil: string;
    titulo: string;
    matricula: string;
    servicio: string;
    funcion: string;

    constructor(init?: Partial<Medico>) {
        Object.assign(this, init);
    }
}