import { pessoa } from "../../Interface/pessoa.interface";

export interface EditarCursoDto{
    nome:string;
    codigo:string;
    email:string,
    departamento:string;
    reitor:pessoa;
    horas:number;
    turno:{
        tarde:boolean,
        noite:boolean,
        manha:boolean
    };
}