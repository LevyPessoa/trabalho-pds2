import {Schema, model, Types} from 'mongoose';

const schemaTurma = new Schema({
    codigo:{type:String, required:true},
    materia:{type:Schema.Types.ObjectId, ref:'Materias', required:true},
    professor:{type:Schema.Types.ObjectId, ref:'Professores', required:true},
    aluno:[{type:Schema.Types.ObjectId, ref:'Alunos', required:true}],
    sala:{type:String, required:true},
    horario:{type:String, required:true},
    status:{type:Number, required:true}
});

export default model('Turmas', schemaTurma);