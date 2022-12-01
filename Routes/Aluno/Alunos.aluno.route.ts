import {Router, Request, Response} from "express";
import Aluno  from "../../Controller/Aluno.controller";

const router:Router = Router();

router.get("/v1/aluno/:id", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Aluno.listarAlunoId(req.params.id);

    return res.status(resposta.status).send(resposta);
});

router.get("/v1/aluno/session/data", async(req:Request, res:Response):Promise<Response> =>{
    
    const session:any = req.session;
   
    const resposta = await Aluno.listarAlunoId(session.user);

    return res.status(resposta.status).send(resposta); 
});

export default router;