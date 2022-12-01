import { Document, Types } from "mongoose";

export interface AdicionarMateriaAlunoDto{
    materia:Types.ObjectId;
    nota:[{
        avaliacao:string,
        nota:number
    }];
    status:string;
    periodo:number;
    presenca:[{
        data:number,
        presente:boolean
    }]
}