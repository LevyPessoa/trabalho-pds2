import { Error } from "./Erro.controller";
import {connection} from '../Config/Connection.config';
import {MessageReturnDto} from '../Dto/Message/MessagemRetorno.dto';
import { CriarTurmaDto } from "../Dto/Turma/CriarTurma.dto";
import schemaTurma from '../Schema/Turma.schema';
import schemaProfessor from '../Schema/Professor.schema';

import { AtualizarTurmaDto } from "../Dto/Turma/AtualizarTurma.dto";
connection();
class Turma {

    private async CriarTurma(turma:CriarTurmaDto):Promise<MessageReturnDto | Error>{
        try{

            //verificar codigo de turma e sala/horario
            if(!!!turma){
                throw(Error.NewError(403, 'Valores inválidos'));
            }

            turma.status = 1;

            const novaTurma = new schemaTurma(turma);
            const salvarNovaTurma = await novaTurma.save();

            if(!!!salvarNovaTurma){
                throw(Error.NewError(403, 'Erro ao criar turma'))
            }

            return {status:200, content:'Turma criada'};
        }catch(erro){

            if(erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async criarTurma(turma:CriarTurmaDto): Promise<MessageReturnDto | Error> {

        return this.CriarTurma(turma);
    };

    private async ListarTurmas(): Promise<MessageReturnDto | Error> {
        try{

            const turmas = await schemaTurma.find()
                .populate("materia", "nome")
                .populate({path:"professor",
                    populate:{
                        path:"pessoa",
                        select:"nome"
                    }
                })
                .populate({
                    path:"aluno",
                    populate:{
                        path:"pessoa",
                        select:"nome"
                    }
                })

            return {status:200, content:turmas}
        }catch(erro){
            console.log(erro)
            return Error.ErroInterno();
        }
    };

    private async ListarTurmaSessionProfessor(session:any):Promise<MessageReturnDto | Error> {
        try{
            console.log(session)
            if(!!!session.user){
                throw(Error.NewError(403, 'Usuario sem autenticação'))
            }
          
            const buscarIdProfessor:any = await schemaProfessor.findOne({pessoa:session.user})
            const turmas = await schemaTurma.find({professor:buscarIdProfessor._id})
                .populate("materia", "nome")
                .populate({path:"professor",
                    populate:{
                        path:"pessoa",
                        select:"nome"
                    }
                })
                .populate({
                    path:"aluno",
                    populate:{
                        path:"pessoa",
                        select:"nome"
                    }
                })

            if(turmas.length === 0){

                return {status:200, content:[]}
            }

            return {status:200, content:turmas};
        }catch(erro){

            if(erro.status === 403){
                
                return erro;
            }

            return Error.ErroInterno();
        }
    };

     async listarTurmaSessionProfessor(session:any):Promise<MessageReturnDto | Error>{

        return await this.ListarTurmaSessionProfessor(session);
    }
    
    async listarTurmas(): Promise<MessageReturnDto | Error> {

        return await this.ListarTurmas();
    };
    
    private async AtualizarTurmas(id:string, turma:AtualizarTurmaDto): Promise<MessageReturnDto | Error> {
        try{

            //verificar codigo de turma e sala/horario
            if(!!!id || !!!turma){
                throw(Error.NewError(403, 'Valores inválidos'));
            }

            const atualizarTurma = await schemaTurma.updateOne({_id:id}, turma);

            if(atualizarTurma.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao atualizar turma'));
            }

            return {status:200, content:'Turma atualizada'};
        }catch(erro){

            if(erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async atualizarTurma(id:string, turma:AtualizarTurmaDto): Promise<MessageReturnDto | Error> {

        return this.AtualizarTurmas(id, turma);
    };

    private async DesativarTurma(id:string): Promise<MessageReturnDto | Error> {
        try{
            
            if(!!!id){
                throw(Error.NewError(403, 'Valores inválidos'));
            }

            const atualizarStatus = await schemaTurma.updateOne({_id:id}, {status:0});

            if(atualizarStatus.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao desativar turma'));
            }
            
            return {status:200, content:'Turma atualizada'};
        }catch(erro){

            if(erro.status === 403){
                
                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async desativarTurma(id:string): Promise<MessageReturnDto | Error> {

        return this.DesativarTurma(id);
    };

    private async ListarTurmaId(id:string): Promise<MessageReturnDto | Error> {
        try{

            if(!!!id){
                throw(Error.NewError(403, 'Valores inválidos'));
            }

            const buscarTurma = await schemaTurma.findOne({_id:id})
            .populate({
                path:"aluno",
                populate:{
                    path:"pessoa",
                    select:"nome"
                }
            })

            if(!!!buscarTurma){
                throw(Error.NewError(4040, 'Erro ao buscar turma'))
            }

            return {status:200, content:buscarTurma}
        }catch(erro){

            if(erro.status === 403){
                
                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async listarTurmaId(id:string): Promise<MessageReturnDto | Error> {

        return await this.ListarTurmaId(id);
    };
};

export default new Turma();