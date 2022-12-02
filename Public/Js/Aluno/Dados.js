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

       const alunos = await requisicao("GET", "/v1/aluno/session/data", null);

       if(alunos.status === 200){

            if(!!alunos.content){
               

                    listarAlunosTabela(alunos.content);
               
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



document.getElementById("fechar-modal").onclick = ()=>{

    return voltarEstadoModal();
};

const voltarEstadoModal = () => {
 
    $('#myModal').modal('hide');

};

//editar
listarAlunosBanco();