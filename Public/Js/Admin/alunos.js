const listarAlunosTabela = (aluno) =>{
    
    const tr = $("[e-id=modelo] tr").clone();
    const tbody = $("[e-id=oficial]");

    $(tr).find("[e-id=nome]").text(aluno.pessoa.nome);
    $(tr).find("[e-id=email]").text(aluno.pessoa.email);
    $(tr).find("[e-id=idade]").text(aluno.pessoa.idade);
    $(tr).find("[e-id=curso]").text(aluno.curso.nome);
    $(tr).find("[e-id=ver-mais]").on('click', function(){
        verMais(aluno.pessoa._id);
    });

    tr.css("display", "table-row");
    tbody.append(tr);
};

const listarAlunosBanco = async() =>{
    try{

       const alunos = await requisicao("GET", "/v1/aluno", null);

       if(alunos.status === 200){

            if(alunos.content.length > 0){
                alunos.content.forEach(aluno=>{

                    listarAlunosTabela(aluno);
                })
            }
       }else{
        throw({erro:true, message:alunos.content})
       }

    }catch(erro){
        console.log(erro)
        if(erro.erro){

            alert(erro.message);
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
        const buscarAluno = await requisicao("GET", `/v1/aluno/${id}`, null);

        if(buscarAluno.status === 200){
            $('#myModal').modal('show');
            $('[e-id=informacoes-pessoais]').attr("id", id);
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
listarAlunosBanco();