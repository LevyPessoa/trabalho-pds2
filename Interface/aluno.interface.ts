import { materia } from "./materia.interface";
import { pessoa } from "./pessoa.interface";

export interface aluno extends pessoa{
    matricula:String;
    curso:String;
    materias:materia[];
    horasTotais:number;
    horasPendentes:number;
    periodo:number;
}