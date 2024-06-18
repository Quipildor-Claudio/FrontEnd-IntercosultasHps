export class Estudio {
    _id:any;
    descripcion:string;
    constructor(init?: Partial<Estudio>) {
        Object.assign(this, init);
    }

}
