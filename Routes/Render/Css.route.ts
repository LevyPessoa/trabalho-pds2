import {Router, Request, Response} from "express";
const router:Router = Router();
const PATH:string = "C:/Users/joaog/OneDrive/Área de Trabalho/Trabalho pds2/Public/Css/";

router.get('/css/login', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Login.css");
});

router.get('/css/home', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"Home.css");
});

export default router;