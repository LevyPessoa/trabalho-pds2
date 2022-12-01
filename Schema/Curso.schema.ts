import {Schema, model} from 'mongoose';

const schemaCurso = new Schema({
    nome:{type:String, required:true},
    codigo:{type:String, required:true},
    email:String,
    departamento:{type:String, required:true},
    reitor:{type:Schema.Types.ObjectId, ref:'Pessoas'},
    materias:[{type:Schema.Types.ObjectId, ref:'Materias'}],
    alunos:[{type:Schema.Types.ObjectId, ref:'Alunos'}],
    horas:{type:Number, required:true},
    turno:{
        tarde:Boolean,
        noite:Boolean,
        manha:Boolean
    },
    status:String
},{timestamps:true});

export default model("Cursos", schemaCurso);