import {Router, Request, Response} from "express";
import { Pessoa } from "../../Controller/Pessoa.controller";

const router:Router = Router();
const Person = new Pessoa();

router.post("/v1/login", async(req:Request, res:Response):Promise<Response>=>{
    const resposta = await Person.login(req.body.email, req.body.senha, req.session);
    return res.status(resposta.status).send(resposta);
});

export default router;