import {Router, Request, Response} from "express";
import  Professor  from "../../Controller/Professor.controller";

const router:Router = Router();

router.post("/v1/professor", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Professor.criarProfessor(req.body);
    return res.status(resposta.status).send(resposta);
});

router.put("/v1/professor", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Professor.atualizarProfessor(req.body.id, req.body);
    return res.status(resposta.status).send(resposta);
});

router.delete("/v1/professor", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Professor.desativarProfessor(req.body.id);
    return res.status(resposta.status).send(resposta);
});

export default router;