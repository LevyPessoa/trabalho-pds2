const preencherInformacoesUsuario = (dados)=>{

    document.getElementById("nome").innerText = dados.pessoa.nome + dados.pessoa.sobrenome;
    
    if(dados.tipo === 'aluno'){ 
        document.getElementById("matricula").innerText = !!!!dados.matricula ? dados.matricula : '';
    }

    return;
};

const buscarDadosUsuario = async () =>{
    try{

        const novaRequisicao = await requisicao("GET", "/v1/aluno/session/data", null);

        if(novaRequisicao.status === 200){

            return preencherInformacoesUsuario(novaRequisicao.content);
        }

        throw({mensagem:novaRequisicao.content});
    }catch(erro){
        
        if(!!erro.mensagem){

            alert(erro.mensagem);
        }
    }
};

buscarDadosUsuario();