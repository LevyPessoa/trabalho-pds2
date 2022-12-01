import {materia} from '../../Interface/materia.interface'
import {aluno} from '../../Interface/aluno.interface'


export interface CriarCursoDto {
    nome:string;
    codigo:string;
    email:string,
    departamento:string;
    reitor:string;
    materias:materia[];
    alunos:aluno,
    horas:number,
    turno:{
        tarde:Boolean,
        noite:Boolean,
        manha:Boolean
    },
    status:number
}