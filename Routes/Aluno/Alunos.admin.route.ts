import {Router, Request, Response} from "express";
import Aluno  from "../../Controller/Aluno.controller";

const router:Router = Router();

router.put("/v1/aluno/materia", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Aluno.adicionarMateria(req.body.id, req.body);
    return res.status(resposta.status).send(resposta);
});

router.post("/v1/aluno", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Aluno.criarAluno(req.body);
    return res.status(resposta.status).send(resposta);
});

router.put("/v1/aluno", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Aluno.editarAluno(req.body.id, req.body);
    return res.status(resposta.status).send(resposta);
});

export default router;