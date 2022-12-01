import { Pessoa } from "./Pessoa.controller";
import { Error } from "./Erro.controller";
import {connection} from '../Config/Connection.config';
import schemaAluno from '../Schema/Aluno.schema'
import {CreatedStudendDto} from '../Dto/Aluno/CriarAluno.dto';
import {MessageReturnDto} from '../Dto/Message/MessagemRetorno.dto';
import { AdicionarMateriaAlunoDto } from "../Dto/Aluno/AdicionarMateriaAluno.dto";
import { Types } from "mongoose";
import { EditarAlunoDto } from "../Dto/Aluno/EditarAluno.dto";

connection();
class Aluno extends Pessoa {
   
    private async CriarAluno(aluno:CreatedStudendDto):Promise<MessageReturnDto | Error>{
        try{  

            aluno.tipo = "aluno";

            const idPerson = await this.cratedPerson(aluno);
            
            aluno.status = 1;
            aluno.matricula = Date.now();
            const newStudent = new schemaAluno({pessoa:idPerson,...aluno});
            const saveNewStudend = await newStudent.save();

            if(!!!saveNewStudend){
                throw(Error.NewError(403, 'Erro ao criar aluno.'));
            }

            return {status:200, content:"Aluno criado com sucesso"};
        }catch(erro){
            
            if(erro.status === 403){

                return erro
            }
            
            return Error.ErroInterno();
        }
    };

    public async criarAluno(aluno:CreatedStudendDto):Promise<MessageReturnDto | Error>{

        return await this.CriarAluno(aluno);
    };

    private async ListarAlunos():Promise<MessageReturnDto | Error>{
        try{
            
            const alunos = await schemaAluno.find()
                .populate('pessoa', ['nome','sobrenome','email','idade', 'sexo', 'foto', 'tipo'])
                .populate("curso", "nome");

            return{status:200, content:alunos};

        }catch(erro){

            return Error.ErroInterno();
        }
    };

    async listarAlunos():Promise<MessageReturnDto | Error>{

        return await this.ListarAlunos();
    };

    private async ListarAlunoId(id:string):Promise<MessageReturnDto | Error>{
        try{
            
            if(!!!id){
                throw(Error.NewError(403, "Valor inválido"));
            }

            const aluno = await schemaAluno.findOne({pessoa:id})
                .populate('pessoa', ['nome','sobrenome','email','idade', 'sexo', 'foto']);
            
            if(!!!aluno){
                throw(Error.NewError(404, "Aluno não encontrado"));
            }

            return {status:200, content:aluno};
        }catch(erro){
            
            if(erro.status === 403 || erro.status === 404){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async listarAlunoId(id:string):Promise<MessageReturnDto | Error>{

        return await this.ListarAlunoId(id);
    };
    
    private async AdicionarMateria(id:string, materia:AdicionarMateriaAlunoDto):Promise<MessageReturnDto | Error>{
        try{

            if(!!!id || !!!materia){
                throw(Error.NewError(403, 'Valores inválidos.'));
            }

            let buscarAluno = await schemaAluno.findOne({_id:id});

            if(!!!buscarAluno){
                throw(Error.NewError(404, 'Erro ao buscar aluno.'));
            }

            buscarAluno.materias.push(materia);

            const atualizarMateriaAluno = await schemaAluno.updateOne({_id:id}, {materias: buscarAluno.materias});

            if(atualizarMateriaAluno.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao adicionar matéria.'));
            }

            return {status:200, content:'Matéria adicionada.'};
        }catch(erro){

            if(erro.status === 403 || erro.status === 404){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async adicionarMateria(id:string, materia:AdicionarMateriaAlunoDto):Promise<MessageReturnDto | Error>{

        return await this.AdicionarMateria(id, materia);
    };

    private async AdicionarNota(id:string, materia:Types.ObjectId, avaliacao:string, nota:number):Promise<MessageReturnDto | Error>{
        try{

            let buscarAluno = await schemaAluno.findOne({_id:id});

            if(!!!buscarAluno){
                throw(Error.NewError(404, 'Erro ao encontrar aluno'));
            }

            let buscarMateria = buscarAluno.materias.find(materias=>{
                
                if(materias.materia == materia){

                    return materias;
                }
            });

            if(!!!buscarMateria){
                throw(Error.NewError(404, 'Matéria não encontrada'))
            }
            
            const buscarAvaliacao = buscarMateria.nota.find(avaliacoes=>{

                if(avaliacoes.avaliacao === avaliacao){
                    
                    return avaliacao;
                }

            });

            if(buscarAvaliacao){
                throw(Error.NewError(403, 'Avaliação ja existe'));
            }

            const atualizarMateriaNota = buscarAluno.materias.map(materias=>{

                if(materias.materia === materia){
                    materias.nota.push({
                        avaliacao,
                        nota
                    });

                    return materias;
                }

                return materias;
            });

            const atualizarMateria = await schemaAluno.updateOne({_id:id}, {materias:atualizarMateriaNota});

            if(atualizarMateria.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao adicionar avaliação'));
            }

            return {status:200, content:'Avaliação adicionada'};
        }catch(erro){

            if(erro.status === 403 || erro.status === 404){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async adicionarNota(id:string, materia:Types.ObjectId, avaliacao:string, nota:number):Promise<MessageReturnDto | Error>{

        return await this.AdicionarNota(id, materia, avaliacao, nota);
    };

    private async EditarNota(id:string, materia:Types.ObjectId, avaliacao:string, nota:number):Promise<MessageReturnDto | Error> {
        try{

            let buscarUsuario = await schemaAluno.findOne({_id:id});

            if(!!!buscarUsuario){
                throw(Error.NewError(404, 'Erro ao buscar aluno'));
            }

            const buscarMateria = buscarUsuario.materias.find(materias=>{

                if(materias.materia == materia){

                    return materias;
                }
            });

            if(!!!buscarMateria){
                throw(Error.NewError(404, 'Matéria não encontrada'));
            }
            
            let avaliacaoEncontrada = false;
            const alterarNota = buscarMateria.nota.map(avaliacoes=>{

                if(avaliacoes.avaliacao === avaliacao){
                    avaliacoes.avaliacao = avaliacao;
                    avaliacoes.nota = nota;
                    avaliacaoEncontrada = true;

                    return avaliacoes;
                }

                return avaliacoes;
            });

            if(!avaliacaoEncontrada){
                throw(Error.NewError(404, 'Erro ao encontrar avaliação'));
            }

            const atualizarMaArrayMaterias = buscarUsuario.materias.map(materias =>{

                if(materias.materia === materia){
                    materias.nota = alterarNota;

                    return materias;
                }

                return materias;
            });

            const atualizarNotaAluno = await schemaAluno.updateOne({_id:id},{materias:atualizarMaArrayMaterias});

            if(atualizarNotaAluno.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao atualizar avaliação'));
            }

            return {status:200, content:'Avaliação atualizada'};
        }catch(erro){   

            if(erro.status === 404 || erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async editarNota(id:string, materia:Types.ObjectId, avaliacao:string, nota:number):Promise<MessageReturnDto | Error>{

        return await this.EditarNota(id, materia, avaliacao, nota);
    };

    private async AdicionarPresenca(id:string, materia:Types.ObjectId, presenca:boolean, data:number, periodo:number):Promise<MessageReturnDto | Error>{
        try{

            const buscarUsuario = await schemaAluno.findOne({_id:id});

            if(!!!buscarUsuario){
                throw(Error.NewError(403, 'Erro ao buscar aluno'));
            }

            let materiaEncontrada = false;

            const buscarAtualizarMateria = buscarUsuario.materias.map(materias =>{

                if(materias.materia === materia && materias.periodo === periodo){
                    materiaEncontrada = true;
                    materias.presenca.push({
                        data,
                        presenca
                    });

                    return materias;
                }

                return materias;
            });

            if(!materiaEncontrada){
                throw(Error.NewError(404, 'Matéria não encontrada'));
            }

            const atualizarPresencaAluno = await schemaAluno.updateOne({_id:id}, {materias:buscarAtualizarMateria});

            if(atualizarPresencaAluno.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao atualizar presença'))
            }

            return {status:200, content:'Presença atualizada'};
        }catch(erro){

            if(erro.status === 404 || erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async adicionarPresenca(id:string, materia:Types.ObjectId, presenca:boolean, data:number, periodo:number):Promise<MessageReturnDto | Error>{

        return await this.AdicionarPresenca(id, materia, presenca, data, periodo);
    };

    private async EditarPresenca(id:string, materia:Types.ObjectId, presenca:boolean, data:number, periodo:number):Promise<MessageReturnDto | Error>{
        try{

            let buscarAluno = await schemaAluno.findOne({_id:id});

            if(!!!buscarAluno){
                throw(Error.NewError(404, 'Erro ao buscar aluno'));
            }

            const buscarMateria = buscarAluno.materias.find(materias =>{

                if(materias.materia == materia){
                    
                    return materias;
                }

            });

            if(!!!buscarMateria){
                throw(Error.NewError(404, 'Matéria não encontrada'));
            }

            const atualizarPresencas = buscarMateria.presenca.map(presencas=>{

                if(presencas.data == data){
                    presencas.presenca = presenca;

                    return presencas;
                }

                return presencas;
            });

            buscarAluno.materias = buscarAluno.materias.map(materias=>{

                if(materias.materia == materia){
                    materias.presenca = atualizarPresencas;

                    return materias;
                }

                return materias;
            });

            const atualizarPresencaAluno = await schemaAluno.updateOne({_id:id},{materias:buscarAluno.materias});

            if(atualizarPresencaAluno.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao atualizar presença'));
            }

            return {status:200, content:'Presença atualizada'};
        }catch(erro){

            if(erro.status === 404 || erro.status === 403){
                
                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async editarPresenca(id:string, materia:Types.ObjectId, presenca:boolean, data:number, periodo:number):Promise<MessageReturnDto | Error>{

        return await this.EditarPresenca(id, materia, presenca, data, periodo);
    };

    private async EditarAluno(id:string, aluno:EditarAlunoDto):Promise<MessageReturnDto | Error>{
        try{
            
            if(!!!id || !!!aluno){
                throw(Error.NewError(403, 'Valores inválidos'));
            }
            
            const atualizarAluno = await schemaAluno.updateOne({pessoa:id},{matricula:aluno.matricula});

            if(atualizarAluno.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao atualizar aluno'));
            }

            return {status:200, content:'Aluno atualizado com sucesso'};
        }catch(erro){

            if(erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
    }

    async editarAluno(id:string, aluno:EditarAlunoDto):Promise<MessageReturnDto | Error>{

        return await this.EditarAluno(id, aluno);
    };
};

export default new Aluno();