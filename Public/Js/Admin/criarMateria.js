document.getElementById("btn-criar-materia").onclick = async()=>{
    try{

        const criarMateria = await requisicao("POST", "/v1/materia", {
            nome:document.getElementById("nome").value,
            codigo:document.getElementById("codigo").value,
            departamento:document.getElementById("departamento").value,
            horas:document.getElementById("horas").value,

        });

        if(criarMateria.status === 200){
            alert(criarMateria.content);

            return;
        }

        throw({erro:true, message:criarMateria.content});
    }catch(erro){

        if(erro.erro){
            alert(erro.message);
            
            return;
        }
    }
};