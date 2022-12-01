import {MessageReturnDto} from '../Dto/Message/MessagemRetorno.dto'

export class Error implements MessageReturnDto{
    status: number;
    content: string;

    constructor(status:number, content:string){
        this.content = content;
        this.status = status;
    };

    static ErroInterno():Error{
        const erroInterno = new Error(500, "Erro interno");
        
        return erroInterno;
    };

    static NewError(status:number, content:string):Error{
        const newError = new Error(status, content);

        return newError;
    };
}