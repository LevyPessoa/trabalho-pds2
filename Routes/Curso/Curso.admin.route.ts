import {Router, Request, Response} from "express";
import Curso from "../../Controller/Curso.controller";

const router:Router = Router();


router.post("/v1/curso", async(req:Request, res:Response):Promise<Response> =>{
    const resposta = await Curso.criarCurso(req.body);
    return res.status(resposta.status).send(resposta);
});

router.put('/v1/curso',  async(req:Request, res:Response):Promise<Response> =>{
    const resposta = await Curso.editarCurso(req.body.id, req.body);
    return res.status(resposta.status).send(resposta);
});

router.delete('/v1/curso',  async(req:Request, res:Response):Promise<Response> =>{
    const resposta = await Curso.desativarCurso(req.body.id);
    return res.status(resposta.status).send(resposta);
});

export default router;
