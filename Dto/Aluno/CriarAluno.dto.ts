import { Types } from "mongoose";
import { CreatedPersonDto } from "../Pessoa/CriarPessoa.dto";

export interface CreatedStudendDto extends CreatedPersonDto {
    matricula:number;
    curso:Types.ObjectId;
    horasTotais:number;
    horasConcluidas:number;
    status:number;
}