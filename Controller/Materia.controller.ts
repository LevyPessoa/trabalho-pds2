import schemaMateria from '../Schema/Materia.schema';
import {connection} from '../Config/Connection.config';
import { Error } from "./Erro.controller";
import {MessageReturnDto} from '../Dto/Message/MessagemRetorno.dto';
import {CriarMateriaDto} from '../Dto/Materia/CriarMateria.dto';
import { Types } from 'mongoose';
import { EditarMateriaDto } from '../Dto/Materia/EditarMateria.dto';

connection();
export class Materia {
    
    private async CriarMateria(materia:CriarMateriaDto):Promise<MessageReturnDto | Error>{
        try{

            
            if(await this.listarMateriaCodigo(materia.codigo)){
                throw(Error.NewError(403, "Código de materia em uso."))
            }

            if(await this.listarMateriaNome(materia.nome)){
                throw(Error.NewError(403, "Nome de materia em uso."))
            }

            materia.status = 1;

            const novaMateria = new schemaMateria(materia);
            const salvarNovaMateria = await novaMateria.save();

            if(!!!salvarNovaMateria){
                throw (Error.NewError(403, "Erro ao criar matéria")) ; 
            }

            return {status:200, content:"Matéria cadastrada com sucesso."};
        }catch(erro){
           
            if(erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async criarMateria(materia:CriarMateriaDto):Promise<MessageReturnDto | Error>{

        return await this.CriarMateria(materia);
    };

    private async ListarMateriaId(id:string):Promise<MessageReturnDto | Error>{
        try{

            const materia = await schemaMateria.findOne({_id:id});

            if(!!!materia){
                throw(Error.NewError(404, "Erro ao buscar materia."));
            }

            return {status:200, content:materia};
        }catch(erro){
            
            if(erro.status === 404){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async listarMateriaId(id:string):Promise<MessageReturnDto | Error>{

        return await this.ListarMateriaId(id);
    };

    private async EditarMateria(id:string,materia:EditarMateriaDto ):Promise<MessageReturnDto | Error>{
        try{

            if(await this.listarMateriaCodigo(materia.codigo)){
                throw(Error.NewError(403, "Código de materia em uso."))
            }

            if(await this.listarMateriaNome(materia.nome)){
                throw(Error.NewError(403, "Nome de materia em uso."))
            }

            const atualizarMateria = await schemaMateria.updateOne({_id:id}, materia);

            if(atualizarMateria.modifiedCount === 0){
                throw(Error.NewError(403, "Erro ao atualizar matéria"));
            }

            return {status:200, content:"Materia atualizada"};
        }catch(erro){

            if(erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async editarMateria(id:string, materia:EditarMateriaDto):Promise<MessageReturnDto | Error>{

        return await this.EditarMateria(id, materia);
    };

    private async listarMateriaNome(nome:string):Promise<boolean | Error>{
        try{

            return !!await schemaMateria.findOne({nome:nome});
        }catch(erro){
            
            return Error.ErroInterno();
        }
    };

    private async listarMateriaCodigo(codigo:string):Promise<boolean | Error>{
        try{

            return !!await schemaMateria.findOne({codigo:codigo});
        }catch(erro){

            return Error.ErroInterno();
        }
    };

    private async DesativarMateria(id:Types.ObjectId):Promise<MessageReturnDto | Error>{
        try{

            const atualizarStatusMateria = await schemaMateria.updateOne({_id:id}, {status:0});

            if(atualizarStatusMateria.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao desativar materia.'));
            }

            return {status:200, content:"Materia desativada"};
        }catch(erro){

            if(erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async destivarMateria(id:Types.ObjectId):Promise<MessageReturnDto | Error>{
        
        return await this.DesativarMateria(id);
    };

    private async ListarMaterias(filtro:object):Promise<MessageReturnDto | Error>{
        try {
            //criar filtro
            // criar interface para objeto
            const listarMaterias = await schemaMateria.find();

            return {status:200, content:listarMaterias}
        } catch (error) {
            
            return Error.ErroInterno();
        }
    };

    async listarMateria(filtro:object):Promise<MessageReturnDto | Error>{

        return await this.ListarMaterias(filtro);
    };
};
