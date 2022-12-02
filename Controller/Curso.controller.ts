import { connection } from '../Config/Connection.config';
import { Materia } from "./Materia.controller";
import schemaCurso from '../Schema/Curso.schema';
import { Error } from "./Erro.controller";
import { MessageReturnDto } from '../Dto/Message/MessagemRetorno.dto';
import { CriarCursoDto } from '../Dto/Curso/CriarCurso.dto';
import { EditarCursoDto } from '../Dto/Curso/EditarCruso.dto';

connection();
class Curso extends Materia {

    private async CriarCurso(curso: CriarCursoDto): Promise<MessageReturnDto | Error> {
        try {

            if (await this.ListarCursoCodigo(curso.codigo)) {
                throw (Error.NewError(403, 'Código em uso.'));
            }

            if (await this.ListarCursoEmail(curso.email)) {
                throw (Error.NewError(403, 'E-mail em uso.'));
            }

            if (await this.ListarCursoNome(curso.nome)) {
                throw (Error.NewError(403, 'Nome em uso.'));
            }

            curso.status = 1;

            const novoCurso = new schemaCurso(curso);

            if (!!!await novoCurso.save()) {
                throw (Error.NewError(403, 'Erro ao criar curso.'));
            }

            return { status: 200, content: 'Curso criado com sucesso' };
        } catch (erro) {

            if (erro.status === 403) {

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async criarCurso(curso: CriarCursoDto): Promise<MessageReturnDto | Error> {

        return await this.CriarCurso(curso);
    };

    private async ListarCursoNome(nome: string, id?:string): Promise<boolean | Error> {
        try {
            const curso:any = await schemaCurso.findOne({ nome: nome });

            if(!!curso){

                return !!(curso._id+"" !== id);
            }
            
            return false;
        } catch (erro) {

            return Error.ErroInterno();
        }
    };

    private async ListarCursoEmail(email: string, id?:string): Promise<boolean | Error> {
        try {
            const curso:any = await schemaCurso.findOne({ email: email });

            if(!!curso){

                return !!(curso._id+"" !== id);
            }

            return false;
            
        } catch (erro) {

            return Error.ErroInterno();
        }
    };

    private async ListarCursoCodigo(codigo: string, id?:string): Promise<boolean | Error> {
        try {
            const curso:any = await schemaCurso.findOne({ codigo: codigo });

            if(!!curso){

                return !!(curso._id+"" !== id);
            }

            return false;
        } catch (erro) {

            return Error.ErroInterno();
        }
    };

    private async EditarCurso(id: string, curso: EditarCursoDto): Promise<MessageReturnDto | Error> {
        try {

            if (await this.ListarCursoCodigo(curso.codigo, id)) {
                throw (Error.NewError(403, 'Código de curso em uso.'))
            }

            if (await this.ListarCursoEmail(curso.email, id)) {
                throw (Error.NewError(403, 'E-mail em uso.'))
            }

            if (await this.ListarCursoNome(curso.nome, id)) {
                throw (Error.NewError(403, 'Nome de curso em uso'));
            }

            if (!!!id || !!!curso) {
                throw (Error.NewError(403, 'Valores inválidos.'))
            }

            const atualizarCurso = await schemaCurso.updateOne({ _id: id }, curso);

            if (atualizarCurso.modifiedCount === 0) {
                throw (Error.NewError(403, 'Erro ao atualizar curso'));
            }

            return { status: 200, content: 'Curso atualizado' };
        } catch (erro) {

            if(erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async editarCurso(id:string, curso:EditarCursoDto):Promise<MessageReturnDto | Error>{
        
        return await this.EditarCurso(id, curso);
    };

    private async ListarCursos():Promise<MessageReturnDto | Error>{
        try{

            return {
                status:200, 
                content:await schemaCurso.find()
                    .populate("reitor","nome")
            }
        }catch(erro){

            return Error.ErroInterno();
        }
    };

    async listarCursos():Promise<MessageReturnDto | Error>{

        return await this.ListarCursos();
    };

    private async ListarCursoId(id:string):Promise<MessageReturnDto | Error>{
        try{

            if(!!!id){
                throw(Error.NewError(403, 'Valor invalido'));
            }

            const buscarCurso = await schemaCurso.findOne({_id:id});

            if(!!!buscarCurso){
                throw(Error.NewError(404, 'Erro ao buscar curso'));
            }

            return {status:200, content:buscarCurso};
        }catch(erro){

            if(erro.status === 403 || erro.status === 404){

                return erro;
            }

            return Error.ErroInterno();
        }
    };

    async listarCursoId(id:string):Promise<MessageReturnDto | Error>{

        return await this.ListarCursoId(id);
    };

    private async DesativarCurso(id:string):Promise<MessageReturnDto | Error>{
        try{

            if(!!!id){
                throw(Error.NewError(403, 'Valor invalido'));
            }

            const atualizarStatusCurso = await schemaCurso.updateOne({_id:id}, {status:0});

            if(atualizarStatusCurso.modifiedCount === 0){
                throw(Error.NewError(403, 'Erro ao desativar curso.'));
            }

            return {status:200, content:'Curso desativado com sucesso.'}
        }catch(erro){

            if(erro.status === 403){

                return erro;
            }

            return Error.ErroInterno();
        }   
    };

    async desativarCurso(id:string):Promise<MessageReturnDto | Error>{

        return await this.DesativarCurso(id);
    };
  
};

export default new Curso();