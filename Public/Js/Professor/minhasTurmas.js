let objetoAlunos = {};


const criarOption = (dados, tipo)=>{
    const select = document.getElementById(tipo);

    dados.forEach(dado=>{

        const option = document.createElement("option");
        option.value = dado._id;

        if(tipo === 'professor-turma'){
            option.innerText = `${dado.pessoa.nome} ${dado.pessoa.sobrenome}`;
        }

        if(tipo === "materias-turma"){
            option.innerText = `${dado.nome} - ${dado.codigo}`;
        }

        if(tipo === "aluno-turma"){
            option.innerText = `${dado.pessoa.nome}`;
        }

        if(tipo === "pessoa"){
            option.innerText = `${dado.nome} ${dado.sobrenome}`;
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

const listarTurmasTabela = (turma) =>{
    
    const tr = $("[e-id=modelo] tr").clone();
    const tbody = $("[e-id=oficial]");

    $(tr).find("[e-id=codigo]").text(turma.codigo);
    $(tr).find("[e-id=materia]").text(turma.materia.nome);
    $(tr).find("[e-id=professor]").text(turma.professor.pessoa.nome);
    $(tr).find("[e-id=sala]").text(turma.sala);
    $(tr).find("[e-id=horario]").text(turma.horario);
    $(tr).find("[e-id=ver-mais]").on('click', function(){
        verMais(turma._id);
    });

    tr.css("display", "table-row");
    tbody.append(tr);
};

const listarTurmasBanco = async() =>{
    try{

       const turmas = await requisicao("GET", "/v1/turma/data/session", null);

       if(turmas.status === 200){

            if(turmas.content.length > 0){
                turmas.content.forEach(turma=>{

                    listarTurmasTabela(turma);
                })
            }
       }else{
        throw({erro:true, message:turmas.content})
       }

    }catch(erro){
        console.log(erro)
        if(erro.erro){

            alert(erro.message);
        }
    }
};


// editar


const listarAlunos = (alunos) =>{
    
    alunos.forEach(aluno=>{
        adicionarAluno(aluno._id,aluno.pessoa.nome)
    })
}

const preencherInputs = (dadosTurma)=>{
    $("[e-id=codigo-turma]").val(dadosTurma.codigo);
    document.getElementById("materias-turma").value = dadosTurma.materia;
    document.getElementById("professor-turma").value = dadosTurma.professor;
    $("[e-id=sala-turma]").val(dadosTurma.sala);
    $("[e-id=horario-turma]").val(dadosTurma.horario);

    if(dadosTurma.aluno.length > 0){
        listarAlunos(dadosTurma.aluno)
    }
};

const verMais = async (id) =>{
    try{
        const buscarTurma = await requisicao("GET", `/v1/turma/${id}`, null);

        if(buscarTurma.status === 200){
            $('#myModal').modal('show');
            $('[e-id=dados-turma]').attr("id", id);
            return preencherInputs(buscarTurma.content);
        }

        throw({erro:true, message:buscarTurma.content});
    }catch(erro){
        console.log(erro)
        if(erro.erro){
            alert(erro.message);
        }
    }
};



document.getElementById("fechar-modal").onclick = ()=>{

    return voltarEstadoModal();
};

const voltarEstadoModal = () => {
    
    $('#myModal').modal('hide');

};



//editar


//adionar alunos

const criarDivAluno = (id, nome) =>{
    const div = document.getElementById("dados-alunos");
    const novaDiv = document.createElement("div");
    const idDateNow = `${id}-${Date.now()}`
    novaDiv.classList.add('div-materia');
    novaDiv.classList.add('ml-2');
    novaDiv.classList.add('mr-2');
    novaDiv.classList.add('mt-2');

    novaDiv.id = idDateNow;
    novaDiv.innerText = nome;

    div.append(novaDiv);
};

const adicionarAluno = (id, nomeMateria) =>{
   debugger
    if(!!objetoAlunos[nomeMateria]){
        

        return;
    }

    objetoAlunos[nomeMateria] = id;
    criarDivAluno(id, nomeMateria);
};








//adicionar alunos


listar("/v1/materia", "materias-turma");
listar("/v1/professor", "professor-turma");
listar("/v1/aluno", "aluno-turma");

listarTurmasBanco();