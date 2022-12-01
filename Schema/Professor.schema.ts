import {Schema, model} from 'mongoose';

const schemaProfessor = new Schema({
    pessoa:{type:Schema.Types.ObjectId, ref:'Pessoas', required:true},
    departamento:{type:String, required:true},
    turmas:[{type:Schema.Types.ObjectId, ref:'Turmas'}],
    formacao:String,
    sala:{type:String, required:true},
    status:{type:Number, required:true}
},{timestamps:true});

export default model('Professores', schemaProfessor);