const criarOption = (dados, tipo)=>{
    const select = document.getElementById(tipo);

    dados.forEach(dado=>{

        const option = document.createElement("option");
        option.value = dado._id;

        if(tipo === 'professor'){
            option.innerText = `${dado.pessoa.nome} ${dado.pessoa.sobrenome}`;
        }

        if(tipo === "materia"){
            option.innerText = `${dado.nome} - ${dado.codigo}`;
        }

        select.append(option);
    });
};

const listar = async(rota, tipo) =>{
    try{
        const lista = await requisicao("GET", rota, null);

        if(lista.status === 200){

            if(lista.content.length > 0){

                return criarOption(lista.content, tipo);
            }
            
            return;
        }

        throw({erro:true, message:lista.content})
    }catch(erro){

        if(erro.erro){
            alert(erro.message);

            return;
        }
    }
};

document.getElementById("btn-criar-turma").onclick = async() =>{
    try{

        const criarTurma  = await requisicao("POST", "/v1/turma", {
            codigo:document.getElementById("codigo").value,
            professor:document.getElementById("professor").value,
            sala:document.getElementById("sala").value,
            horario:document.getElementById("horario").value,
            materia:document.getElementById("materia").value
        });

        if(criarTurma.status === 200){
            alert(criarTurma.content);

            return;
        }

        throw({erro:true, message:criarTurma.content});
    }catch(erro){
console.log(erro)
        if(erro.erro){
            alert(erro.message);

            return;
        }
    }
}

listar("/v1/professor","professor");
listar("/v1/materia", "materia");