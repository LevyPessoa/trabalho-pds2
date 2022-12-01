import {Router, Request, Response} from "express";
import express from  'express';
import { Middleware } from "../../Middleware/Middleware.middleware";
const router:Router = Router();
const PATH:string = "C:/Users/joaog/OneDrive/Área de Trabalho/Trabalho pds2/Public/Html/Autenticado/";
const newMiddleware = new Middleware();
const app = express();

router.get('/home', (req:Request, res:Response):void=>{
    
    res.sendFile(PATH+"Home.html");
});

export default router;