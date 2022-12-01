const requisicao = async(method, route, body = null) => {
    try{
        const options = !!body ? 
        {
            method:method,
            body:JSON.stringify(body),
            headers: {                              
                "Content-Type": "application/json"    
            } 
        } : {
                method:method,
                headers: {                              
                    "Content-Type": "application/json"    
                }
            }

        const urlBase = "http://localhost:3000";
        const resposta = await fetch(urlBase + route, options
        ).then(res=>{

            return res.json();
        }).then(resp=>{

            return resp;
        });

        return resposta;
    }catch(erro){
        console.log(erro)
    }
};
