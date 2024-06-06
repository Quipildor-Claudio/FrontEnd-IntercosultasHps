export class Paciente {
    id: any;
    dni: string;
    nombre: string;
    apellido: string;
    edad: string;
    fecha_nac: Date;
    sexo: string;
    cobertura_soc: string;
    hclinica: string;
    oda_pcte: string;
    odi_pcte: string;
    domicilio_pcte: String;
    numero_dom: number;
    man_dom: number;
    lote_dom: number


    constructor(init?: Partial<Paciente>) {
        Object.assign(this, init);
    }

}
