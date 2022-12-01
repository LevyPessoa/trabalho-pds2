import { connect } from "mongoose";

export const connection = async() => {
    try{

        await connect('mongodb://localhost:27017/pds2')

    }catch(erro){
        console.log(erro)
    }   
};