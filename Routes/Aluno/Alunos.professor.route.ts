import {Router, Request, Response} from "express";
import Aluno  from "../../Controller/Aluno.controller";

const router:Router = Router();

router.get("/v1/aluno", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Aluno.listarAlunos();
    return res.status(resposta.status).send(resposta);
});

export default router;