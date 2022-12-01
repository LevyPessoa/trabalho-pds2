const listarCursosTabela = (curso) =>{
    
    const tr = $("[e-id=modelo] tr").clone();
    const tbody = $("[e-id=oficial]");

    $(tr).find("[e-id=nome]").text(curso.nome);
    $(tr).find("[e-id=codigo]").text(curso.codigo);
    $(tr).find("[e-id=email]").text(curso.email);
    $(tr).find("[e-id=departamento]").text(curso.departamento);
    $(tr).find("[e-id=reitor]").text(curso.reitor.nome);
    $(tr).find("[e-id=ver-mais]").on('click', function(){
        verMais(curso._id);
    });

    tr.css("display", "table-row");
    tbody.append(tr);
};

const listarCursosBanco = async() =>{
    try{

       const cursos = await requisicao("GET", "/v1/curso", null);

       if(cursos.status === 200){

            if(cursos.content.length > 0){
                cursos.content.forEach(curso=>{

                    listarCursosTabela(curso);
                })
            }
       }else{
        throw({erro:true, message:cursos.content})
       }

    }catch(erro){
        console.log(erro)
        if(erro.erro){

            alert(erro.message);
        }
    }
};

const criarOption = (dados, tipo)=>{
    const select = document.getElementById(tipo);

    dados.forEach(dado=>{

        const option = document.createElement("option");
        option.value = dado._id;

        if(tipo === "reitor-curso"){
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

// editar
document.getElementById("btn-editar-dados-aluno").onclick = ()=>{
    $("[e-id=nome-aluno]").prop("disabled", false);
    $("[e-id=sobrenome-aluno]").prop("disabled", false);
    $("[e-id=email-aluno]").prop("disabled", false);
    $("[e-id=idade-aluno]").prop("disabled", false);
    $("[e-id=idade-aluno]").prop("disabled", false);
    document.getElementById("btn-editar-dados-aluno").style.display = 'none';
    document.getElementById("btn-salvar-dados-aluno").style.display = 'block';
};

const preencherInputs = (dadosAluno)=>{
    $("[e-id=nome-aluno]").val(dadosAluno.pessoa.nome);
    $("[e-id=sobrenome-aluno]").val(dadosAluno.pessoa.sobrenome);
    $("[e-id=email-aluno]").val(dadosAluno.pessoa.email);
    $("[e-id=idade-aluno]").val(dadosAluno.pessoa.idade);
    $("[e-id=matricula-aluno]").val(dadosAluno.matricula);

};

const verMais = async (id) =>{
    try{
        const buscarCurso = await requisicao("GET", `/v1/curso/${id}`, null);

        if(buscarCurso.status === 200){
            $('#myModal').modal('show');
            $('[e-id=dados-curso]').attr("id", id);
            return preencherInputs(buscarAluno.content);
        }

        throw({erro:true, message:buscarAluno.content});
    }catch(erro){
        console.log(erro)
        if(erro.erro){
            alert(erro.message);
        }
    }
};

document.getElementById("btn-salvar-dados-aluno").onclick = async () =>{
    try{
           
        const id =  $('[e-id=informacoes-pessoais]').attr("id");
        const atualizarAlunoDados = await  requisicao("PUT", "/v1/pessoa", {
            id,
            nome:$("[e-id=nome-aluno]").val(),
            sobrenome:$("[e-id=sobrenome-aluno]").val(),
            email:$("[e-id=email-aluno]").val(),
            idade:$("[e-id=idade-aluno]").val(),
        });

        if(atualizarAlunoDados.status === 200){
            alert(atualizarAlunoDados.content);

            return voltarEstadoModal();
        }

        throw({erro:true, message:atualizarAlunoDados.content});
    }catch(erro){

        if(erro.erro){
            alert(erro.message)
        }

    }
};

document.getElementById("fechar-modal").onclick = ()=>{

    return voltarEstadoModal();
};

const voltarEstadoModal = () => {
    $("[e-id=nome-aluno]").val("");
    $("[e-id=sobrenome-aluno]").val("");
    $("[e-id=email-aluno]").val("");
    $("[e-id=idade-aluno]").val("");
    $("[e-id=nome-aluno]").prop("disabled", true);
    $("[e-id=sobrenome-aluno]").prop("disabled", true);
    $("[e-id=email-aluno]").prop("disabled", true);
    $("[e-id=idade-aluno]").prop("disabled", true);
    document.getElementById("btn-editar-dados-aluno").style.display = 'block';
    document.getElementById("btn-salvar-dados-aluno").style.display = 'none';
    $('#myModal').modal('hide');

};

//editar


listar("/v1/pessoa", "reitor-curso");
listarCursosBanco();