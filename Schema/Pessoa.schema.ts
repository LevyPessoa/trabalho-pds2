import {Schema, model} from 'mongoose';

interface Pessoa {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    idade: number;
    sexo: string;
    foto: string;
    tipo:string
}

const schemaPessoa = new Schema<Pessoa>({
    nome:{type:String, required:true},
    sobrenome:{type:String, required:true},
    email:{type:String, required:true},
    senha:{type:String, required:true},
    idade:{type:Number, required:true},
    sexo:{type:String, required:true},
    foto:String,
    tipo:{type:String, required:true}

},{timestamps:true});

export default model("Pessoas", schemaPessoa);