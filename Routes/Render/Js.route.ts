import {Router, Request, Response} from "express";
const router:Router = Router();
const PATH:string = "C:/Users/joaog/OneDrive/Área de Trabalho/Trabalho pds2/Public/Js/";

router.get('/script/login', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"login.js");
});

router.get('/script/requisicao', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"requisicao.js");
});


router.get('/script/home', (req:Request, res:Response):void=>{
    res.sendFile(PATH+"home.js");
});


export default router;