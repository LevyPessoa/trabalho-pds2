import { Pessoa } from "../Controller/Pessoa.controller";
import {Request, Response} from "express";
import { Error } from "../Controller/Erro.controller";
export class Middleware extends Pessoa {
    
    private async VerificarSession(req:Request, res:Response , next:any):Promise<any>{
        try{
            
            const session:any = req.session;

            if(!await this.buscarPessoaId(session.user)){
                throw(Error.NewError(403, 'Usuário sem autenticação'));
            }

            return next();
        }catch(erro){

            res.redirect('/login')
        }
    };

    async verificarSession(req:any, res:Response, next:any):Promise<any>{

        return await this.VerificarSession(req, res, next);
    };

    private VerificarTipoProfessor(req:Request, res:Response, next:any):any{
        try{

            const session:any = req.session;

            if(session.tipo != "professor" || session.tipo != "admin"){
                throw(Error.NewError(403, 'Usuário sem permissão'));
            }

            return next();
        }catch(erro){

            res.redirect("/home");
        }
    };

    verificarTipoProfessor(req:Request, res:Response, next:any):any{

        return this.VerificarTipoProfessor(req, res, next);
    };

    private VerificarTipoAdmin(req:Request, res:Response, next:any):any{
        try{

            const session:any = req.session;

            if(session.tipo != "admin"){
                throw(Error.NewError(403, 'Usuário sem permissão'));
            }

            return next();
        }catch(erro){

            res.redirect("/home");
        }
    };

    verificarTipoAdmin(req:Request, res:Response, next:any):any{
        
        return this.VerificarTipoAdmin(req, res, next);
    };

}