import {connection} from '../Config/Connection.config';
import { Error } from "./Erro.controller";
import schemaPessoa from '../Schema/Pessoa.schema'
import { CreatedPersonDto } from '../Dto/Pessoa/CriarPessoa.dto';
import { Types } from 'mongoose';
import {MessageReturnDto} from '../Dto/Message/MessagemRetorno.dto';
import { AtualizarPessoaDto } from '../Dto/Pessoa/AtualizarPessoa.dto';
import { Helpers } from './Helpers.controller';

connection();
export class Pessoa {
   
    private async VerificarEmail(email:string, id?:string):Promise<boolean | Error>{
        try{

            const buscarEmail = await schemaPessoa.findOne({email:email});

            if(!!id && !!buscarEmail){
                
                if(id === ""+buscarEmail._id){

                    return false;
                }

                return true;
            }

            if(!!buscarEmail){

                return true;
            }

            return false;
        }catch(erro){

            return Error.ErroInterno();
        }
    };

    private async CreatedPerson(pessoa:CreatedPersonDto):Promise<Types.ObjectId | Error>{
        try{

            // adicionar documento e login
            pessoa.senha = Helpers.CriarHash(pessoa.senha);

            if((await this.VerificarEmail(pessoa.email))){
                throw(Error.NewError(403, "E-mail em uso"));
            }

            const newPessoa = new schemaPessoa(pessoa);
            const saveNewPessoa = await newPessoa.save();

            if(!!!saveNewPessoa){
                throw(Error.NewError(403, 'Erro ao criar usuário'));
            }

            return saveNewPessoa._id;
        }catch(erro){
            console.log(erro)
            if(erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async cratedPerson(pessoa:CreatedPersonDto):Promise<Types.ObjectId | Error> {

        return await this.CreatedPerson(pessoa);
    };

    private async EditarPessoa(id:string, pessoa:AtualizarPessoaDto):Promise<MessageReturnDto | Error>{
        try{

            if((await this.VerificarEmail(pessoa.email, id))){
                throw(Error.NewError(403, "E-mail em uso"));
            }

            const atualizarPessoa = await schemaPessoa.updateOne({_id:id}, pessoa);
            
            if(atualizarPessoa.modifiedCount === 0){
                throw(Error.NewError(403, "Erro ao atualizar dados"));
            }

            return {status:200, content:"Dados atualizados"};
        }catch(erro){

            if(erro.status === 403){
                
                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async editarPessoa(id:string, pessoa:AtualizarPessoaDto):Promise<MessageReturnDto | Error>{
        
        return await this.EditarPessoa(id, pessoa);
    };

    private async Login(email:string, senha:string, session:any): Promise<object | Error> {
        try{

            if(!!!email || !!!senha){
                throw(Error.NewError(403, 'Valores inválidos'));
            }

            const buscarUsuario = await schemaPessoa.findOne({email:email});

            if(!!!buscarUsuario){
                throw(Error.NewError(404, 'E-mail inválido'));
            }

            if(!!!Helpers.VerificarHash(senha, buscarUsuario.senha)){
                throw(Error.NewError(404, 'Senha inválida'));
            }

            session.user = buscarUsuario._id;
            session.tipo = buscarUsuario.tipo;
            
            const pronome = buscarUsuario.sexo === 'masculino' ? 'Sr' : 'Sra';

            return {status:200, content:`Seja bem-vindo ${pronome}.${buscarUsuario.sobrenome}`, tipo:buscarUsuario.tipo};
        }catch(erro){
            console.log(erro)
            if(erro.status === 403 || erro.status === 404){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async login(email:string, senha:string, session:any): Promise<object | Error> {

        return await this.Login(email, senha, session);
    };

    private async BuscarPessoaId(id:string):Promise<boolean>{
        try{

            return !! await schemaPessoa.findOne({_id:id});

        }catch(erro){

            return false;
        }
    };

    async buscarPessoaId(id:string):Promise<boolean>{

        return await this.BuscarPessoaId(id);
    };

    private async BuscarTipo(id:string, tipo:string): Promise<boolean | MessageReturnDto>{
        try{

            if(!!!id){
                throw(Error.NewError(403, 'Valor inválido'));
            }

            const buscarPessoa = await schemaPessoa.findOne({_id:id});

            if(!!!buscarPessoa){
                throw(Error.NewError(404, 'Erro ao buscar usuário'));
            }

            return buscarPessoa.tipo === tipo || buscarPessoa.tipo === "admin" ? true : false;
        }catch(erro){

            if(erro.status === 403 || erro.status === 404){

                return erro;
            }

            return Error.ErroInterno();
        }
    };


    async buscarTipo(id:string, tipo:string):Promise<boolean | MessageReturnDto>{

        return await this.BuscarTipo(id, tipo);
    };

    private async ListarPessoas():Promise<MessageReturnDto | Error>{
        try{

            return {
                status:200,
                content: await schemaPessoa.find()
            }

        }catch(erro){  
            
            return Error.ErroInterno();
        }
    };

    async listarPessoas():Promise<MessageReturnDto | Error>{

        return await this.ListarPessoas();
    };
};
