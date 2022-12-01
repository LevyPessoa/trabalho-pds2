import {Router, Request, Response} from "express";
import Turma  from "../../Controller/Turma.controller";

const router:Router = Router();

router.get("/v1/turma", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Turma.listarTurmas();
    return res.status(resposta.status).send(resposta);
});

router.get("/v1/turma/:id", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Turma.listarTurmaId(req.params.id);
    return res.status(resposta.status).send(resposta);
});

export default router;

