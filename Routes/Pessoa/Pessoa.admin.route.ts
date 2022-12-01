import {Router, Request, Response} from "express";
import { Pessoa } from "../../Controller/Pessoa.controller";

const router:Router = Router();
const Person = new Pessoa();

router.put("/v1/pessoa", async(req:Request, res:Response):Promise<Response> => {
    const resposta = await Person.editarPessoa(req.body.id, req.body);
    return res.status(resposta.status).send(resposta);
});

router.get("/v1/pessoa", async(req:Request, res:Response):Promise<Response>=>{
    const resposta= await Person.listarPessoas();
    return res.status(resposta.status).send(resposta);
});

export default router;