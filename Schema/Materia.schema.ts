import {Schema, model} from 'mongoose';

const schemaMateria = new Schema({
    nome:{type:String, required:true},
    codigo:{type:String, required:true},
    departamento:{type:String, required:true},
    preRequisito:{
        possui:Boolean,
        materia:{type:Schema.Types.ObjectId, ref:'Materias'}
    },
    horas:{type:String, required:true}, 
    status:{type:Number, required:true}   
},{timestamps:true});

export default model("Materias", schemaMateria);