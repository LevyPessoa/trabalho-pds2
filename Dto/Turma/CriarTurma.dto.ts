import { Types } from "mongoose";

export interface CriarTurmaDto {
    codigo:string;
    materia:Types.ObjectId;
    professor:Types.ObjectId;
    sala:string;
    horario:number;
    status:number;
};