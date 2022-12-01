document.getElementById("btn-login").onclick = async () =>{
    try{

        const email = document.getElementById("email");
        const senha = document.getElementById("senha");

        if(!!!email.value){
            throw({message:"Campo E-mail não pode ser vazio."})
        }

        if(!!!senha.value){
            throw({message:"Campo senha não pode ser vazio."})
        }

        const novaRequisicao = await requisicao("POST", "/v1/login", {
            email:email.value,
            senha:senha.value
        });

        if(novaRequisicao.status !== 200){
            throw({message:novaRequisicao.content});
        }

        alert(novaRequisicao.content);
        window.location = '/home';
    }catch(erro){

        if(erro.message){
            alert(erro.message);
        }

        return;
    }
}
