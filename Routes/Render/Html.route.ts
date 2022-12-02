import {Router, Request, Response} from "express";
import express from  'express';
import { Middleware } from "../../Middleware/Middleware.middleware";
const router:Router = Router();
const PATH:string = "C:/Users/joaog/OneDrive/Área de Trabalho/Trabalho pds2/Public/Html/";
const newMiddleware = new Middleware();
const app = express();

router.get('/login', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Login.html");
});

router.get('/turma', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Autenticado/CriarTurma.html");
});

router.get('/usuarios', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Autenticado/CriarUsuario.html");
});

router.get('/materia', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Autenticado/CriarMateria.html");
});

router.get('/curso', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Autenticado/CriarCurso.html");
});

router.get('/alunos', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Autenticado/Alunos.html");
});

router.get('/professores', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Autenticado/Professores.html");
});

router.get('/turmas', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Autenticado/Turmas.html");
});

router.get('/cursos', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Autenticado/Cursos.html");
});

router.get('/materias', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Autenticado/Materias.html");
});


///// professor

router.get('/professor/data', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Professor/index.html");
});

router.get('/aluno/data', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Aluno/index.html");
});
router.get('/professor/turma', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Professor/MinhasTurmas.html");
});

export default router;