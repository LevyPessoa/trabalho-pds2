import {Schema, model} from 'mongoose';

const schemaAluno = new Schema({
    pessoa:{type:Schema.Types.ObjectId, ref:'Pessoas'},
    matricula:String,
    curso:{type:Schema.Types.ObjectId, ref:'Cursos'},
    materias:[{
        materia:{type:Schema.Types.ObjectId, ref:'Materias'},
        nota:[{
            avaliacao:String,
            nota:Number
        }],
        status:String,
        periodo:Number,
        presenca:[{
            data:Number,
            presenca:Boolean
        }]
    }],
    horasTotais:Number,//fazer referencia com o curso
    horasPendentes:Number,
    periodo:Number,
    status:Number,
    turmas:[{type:Schema.Types.ObjectId, ref:'Turmas'}]
},{timestamps:true});

export default model("Alunos", schemaAluno);