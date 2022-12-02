import {Router, Request, Response} from "express";
import  Professor  from "../../Controller/Professor.controller";

const router:Router = Router();

router.get("/v1/professor/data/session", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Professor.listarProfessorSession(req.session);
    return res.status(resposta.status).send(resposta);
});

export default router;