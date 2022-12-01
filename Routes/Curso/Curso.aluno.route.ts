import {Router, Request, Response} from "express";
import Curso from "../../Controller/Curso.controller";

const router:Router = Router();

router.get("/v1/curso", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Curso.listarCursos();
    return res.status(resposta.status).send(resposta);
});

router.get("/v1/curso/:id", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Curso.listarCursoId(req.params.id);
    return res.status(resposta.status).send(resposta);
});

export default router;