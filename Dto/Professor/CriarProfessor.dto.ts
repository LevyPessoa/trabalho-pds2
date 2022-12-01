import { CreatedPersonDto } from "../Pessoa/CriarPessoa.dto";

export interface CriarProfessorDto extends CreatedPersonDto{
    departamento:string;
    turmas:Array<any>;
    formacao:string;
    sala:string;
    status:number;
}