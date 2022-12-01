export interface materia {
    nome:string;
    codigo:string;
    departamento:string;
    preRequisito:{
        possui:boolean,
        materia:materia,
    };
    horas:number;
    status:number;
}