const buscarDadosUsuario = () =>{

    return {
        nome:document.getElementById("nome").value,
        sobrenome:document.getElementById("sobrenome").value,
        email:document.getElementById("email").value,
        senha:document.getElementById("senha").value,
        sexo:document.getElementById("sexo").value,
        tipo:document.getElementById("tipo").value,
        idade:document.getElementById("idade").value
    };
};

document.getElementById("btn-criar-professor").onclick = async () =>{
    try{

        const novoProfessor = await requisicao("POST", "/v1/professor", {
            ...buscarDadosUsuario(),
            departamento:document.getElementById("departamento").value,
            sala:document.getElementById("sala").value
        });

        if(novoProfessor.status === 200){
            alert('Professor Criado com sucesso');

            return ;
        }
        
        throw({erro:true, message:novoProfessor.content})
    }catch(erro){
        console.log(erro)
        if(erro.erro){

            alert(erro.message);
        }
    }
};

document.getElementById("btn-criar-aluno").onclick = async()=>{
    try{

        const novoProfessor = await requisicao("POST", "/v1/aluno", {
            ...buscarDadosUsuario(),
            curso:document.getElementById("curso").value,
        });

        if(novoProfessor.status === 200){
            alert(novoProfessor.content);

            return ;
        }
        
        throw({erro:true, message:novoProfessor.content})
    }catch(erro){
        console.log(erro)
        if(erro.erro){

            alert(erro.message);
        }
    }
};

document.getElementById("tipo").onchange = ()=>{
    const valor = document.getElementById("tipo").value;

    if(valor === 'professor'){
        document.getElementById(valor).style.display ='block';
        document.getElementById('aluno').style.display ='none';

        return;
    }

    if(valor === 'aluno'){
        document.getElementById('professor').style.display ='none';
        document.getElementById('aluno').style.display ='block';

        listar("/v1/curso", 'curso');
    }

   
};

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

        if(tipo === "turmas"){
            option.innerText = `${dado.materia.nome} - ${dado.codigo} - ${dado.horario}`;
        }

        if(tipo === "curso"){
            option.innerText = `${dado.nome}`;
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


// listar("/v1/turma", "turmas")