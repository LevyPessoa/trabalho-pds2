import {Router, Request, Response} from "express";
import  Professor  from "../../Controller/Professor.controller";

const router:Router = Router();

router.get("/v1/professor", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Professor.listarProfessor();
    return res.status(resposta.status).send(resposta);
});

router.get("/v1/professor/:id", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Professor.listarProfessorId(req.params.id);
    return res.status(resposta.status).send(resposta);
});

export default router;