import {Router, Request, Response} from "express";
import Turma  from "../../Controller/Turma.controller";

const router:Router = Router();

router.post("/v1/turma", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Turma.criarTurma(req.body);
    return res.status(resposta.status).send(resposta);
});

router.put("/v1/turma", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Turma.atualizarTurma(req.body.id, req.body);
    return res.status(resposta.status).send(resposta);
});

router.delete("/v1/turma", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Turma.desativarTurma(req.body.id);
    return res.status(resposta.status).send(resposta);
});

export default router;