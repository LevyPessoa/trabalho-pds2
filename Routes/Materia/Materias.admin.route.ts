import {Router, Request, Response} from "express";
import { Materia } from "../../Controller/Materia.controller";

const router:Router = Router();
const Matter = new Materia();

router.post("/v1/materia", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Matter.criarMateria(req.body);
    return res.status(resposta.status).send(resposta);
});

router.put("/v1/materia", async(req:Request, res:Response):Promise<Response> =>{
    const resposta = await Matter.editarMateria(req.body.id, req.body);
    return res.status(resposta.status).send(resposta);
});

router.delete("/v1/materia", async(req:Request, res:Response):Promise<Response> =>{
    const resposta = await Matter.destivarMateria(req.body.id);
    return res.status(resposta.status).send(resposta);
});

export default router;