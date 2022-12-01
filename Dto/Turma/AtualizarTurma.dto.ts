import { Types } from "mongoose";

export interface AtualizarTurmaDto {
    codigo:string;
    materia:Types.ObjectId;
    professor:Types.ObjectId;
    sala:string;
    horario:number;
    status:number;
}