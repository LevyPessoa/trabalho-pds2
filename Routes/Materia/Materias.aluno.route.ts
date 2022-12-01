import {Router, Request, Response} from "express";
import { Materia } from "../../Controller/Materia.controller";

const router:Router = Router();
const Matter = new Materia();


router.get("/v1/materia", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Matter.listarMateria(req.query);
    return res.status(resposta.status).send(resposta);
});

router.get("/v1/materia/:id", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Matter.listarMateriaId(req.params.id);
    return res.status(resposta.status).send(resposta);
});

export default router;