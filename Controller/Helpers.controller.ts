import {genSaltSync, hashSync, compareSync} from 'bcrypt'
import { Error } from './Erro.controller';
import schemaPessoa  from "../Schema/Pessoa.schema";
import { Types } from 'mongoose';
export class Helpers {

    static CriarHash(senha:string):string{

        return hashSync(senha, genSaltSync(12)); 
    };

    static VerificarHash(senha:string, hash:string):boolean{

        return compareSync(senha, hash);
    };

};