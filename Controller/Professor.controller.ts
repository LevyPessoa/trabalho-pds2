import {Pessoa} from './Pessoa.controller';
import {connection} from '../Config/Connection.config';
import { CriarProfessorDto } from '../Dto/Professor/CriarProfessor.dto';
import { Error } from "./Erro.controller";
import {MessageReturnDto} from '../Dto/Message/MessagemRetorno.dto';
import schemaProfessor from '../Schema/Professor.schema'
import { AtualizarPessoaDto } from '../Dto/Pessoa/AtualizarPessoa.dto';

connection();
class Professor extends Pessoa {
    
    private async CriarProfessor(professor:CriarProfessorDto): Promise<MessageReturnDto | Error>{
        try{
            
            if(!!!professor){
                throw(Error.NewError(403, 'Valores inválidos.'));
            }

            const idPessoa = await this.cratedPerson(professor);

            if(!!!idPessoa){
                throw(Error.NewError(403, 'Erro ao criar Usuário'));
            }
            
            professor.status = 1;

            const novoProfessor = new schemaProfessor({pessoa:idPessoa,...professor});
            const salvarNovoProfessor = await novoProfessor.save();

            if(!!!salvarNovoProfessor){
                throw(Error.NewError(403, 'Erro ao criar professor.'));
            }
            
            return {status:200, content:'Professor criado'};
        }catch(erro){
            console.log(erro)
            if(erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async criarProfessor(professor:CriarProfessorDto): Promise<MessageReturnDto | Error>{
        
        return await this.CriarProfessor(professor);
    };

    private async ListarProfessor(): Promise<MessageReturnDto | Error>{
        try{
            const professores = await schemaProfessor.find()
                .populate('pessoa', ['nome', 'sobrenome','email']);
                
            return {status:200, content:professores};
        }catch(erro){

            return Error.ErroInterno();
        }
    };

    async listarProfessor(): Promise<MessageReturnDto | Error>{
        
        return this.ListarProfessor();
    };

    private async ListarProfessorId(id:string): Promise<MessageReturnDto | Error>{
        try{

            if(!!!id){
                throw(Error.NewError(403, 'Valores inválidos'));
            }

            const buscarProfessor = await schemaProfessor.findById(id);

            if(!!!buscarProfessor){
                throw(Error.NewError(404, 'Erro ao buscar professor'));
            }

            return {status:200, content:buscarProfessor};
        }catch(erro){

            if(erro.status === 403 || erro.status === 404){

                return erro;
            }

            return Error.ErroInterno();
        }
    };
    
    async listarProfessorId(id:string): Promise<MessageReturnDto | Error>{

        return this.ListarProfessorId(id);
    };

    private async AtualizarProfessor(id:string, professor:AtualizarPessoaDto): Promise<MessageReturnDto | Error>{
        try{

            if(!!!id || !!!professor){
                throw(Error.NewError(403, 'Valores inválidos'))
            }

            const atualizarProfessor = await schemaProfessor.updateOne({_id:id}, professor);

            if(atualizarProfessor.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao atualizar professor'));
            }

            return {status:200, content:'Professor atualizado'};
        }catch(erro){

            if(erro.status === 403){
                
                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async atualizarProfessor(id:string, professor:AtualizarPessoaDto): Promise<MessageReturnDto | Error>{

        return await this.AtualizarProfessor(id, professor);
    };

    private async DesativarProfessor(id:string): Promise<MessageReturnDto | Error> {
        try{

            if(!!!id){
                throw(Error.NewError(403, 'Valores inválidos'));
            }

            const atualizarStatusProfessor = await schemaProfessor.updateOne({_id:id}, {status:0});

            if(atualizarStatusProfessor.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao desativar professor'));
            }

            return {status:200, content:'Professor atualizado'};
        }catch(erro){

            if(erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
        
    };

    async desativarProfessor(id:string): Promise<MessageReturnDto | Error>{
        
        return await this.DesativarProfessor(id);
    };
};

export default new Professor();