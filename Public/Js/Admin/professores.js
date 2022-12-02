const listarProfessoresTabela = (professor) =>{
    
    const tr = $("[e-id=modelo] tr").clone();
    const tbody = $("[e-id=oficial]");

    $(tr).find("[e-id=nome]").text(professor.pessoa.nome);
    $(tr).find("[e-id=departamento]").text(professor.departamento);

    $(tr).find("[e-id=email]").text(professor.pessoa.email);
    $(tr).find("[e-id=idade]").text(professor.pessoa.idade);
    $(tr).find("[e-id=sala]").text(professor.sala);
    $(tr).find("[e-id=ver-mais]").on('click', function(){
        verMais(professor.pessoa._id);
    });

    tr.css("display", "table-row");
    tbody.append(tr);
};

const listarProfessoresBanco = async() =>{
    try{

       const professores = await requisicao("GET", "/v1/professor", null);

       if(professores.status === 200){

            if(professores.content.length > 0){
                professores.content.forEach(professor=>{

                    listarProfessoresTabela(professor);
                })
            }
       }else{
        throw({erro:true, message:professores.content})
       }

    }catch(erro){
        console.log(erro)
        if(erro.erro){

            alert(erro.message);
        }
    }
};


// editar
document.getElementById("btn-editar-dados-professor").onclick = ()=>{
    $("[e-id=nome-professor]").prop("disabled", false);
    $("[e-id=sobrenome-professor]").prop("disabled", false);
    $("[e-id=email-professor]").prop("disabled", false);
    $("[e-id=idade-professor]").prop("disabled", false);
    $("[e-id=idade-professor]").prop("disabled", false);
    document.getElementById("btn-editar-dados-professor").style.display = 'none';
    document.getElementById("btn-salvar-dados-professor").style.display = 'block';
};

document.getElementById("btn-editar-professor").onclick = ()=>{
    $("[e-id=sala-professor]").prop("disabled", false);
    document.getElementById("btn-editar-professor").style.display = 'none';
    document.getElementById("btn-salvar-professor").style.display = 'block';
};

const preencherInputs = (dadosprofessor)=>{
    $("[e-id=nome-professor]").val(dadosprofessor.pessoa.nome);
    $("[e-id=sobrenome-professor]").val(dadosprofessor.pessoa.sobrenome);
    $("[e-id=email-professor]").val(dadosprofessor.pessoa.email);
    $("[e-id=idade-professor]").val(dadosprofessor.pessoa.idade);
    $("[e-id=sala-professor]").val(dadosprofessor.sala);

};

const verMais = async (id) =>{
    try{
        const buscarprofessor = await requisicao("GET", `/v1/professor/${id}`, null);

        if(buscarprofessor.status === 200){
            $('#myModal').modal('show');
            $('[e-id=informacoes-pessoais]').attr("id", id);
            $('[e-id=informacoes-professor]').attr("id", id);

            return preencherInputs(buscarprofessor.content);
        }

        throw({erro:true, message:buscarprofessor.content});
    }catch(erro){
        console.log(erro)
        if(erro.erro){
            alert(erro.message);
        }
    }
};

document.getElementById("btn-salvar-dados-professor").onclick = async () =>{
    try{
           
        const id =  $('[e-id=informacoes-pessoais]').attr("id");
        const atualizarprofessorDados = await  requisicao("PUT", "/v1/pessoa", {
            id,
            nome:$("[e-id=nome-professor]").val(),
            sobrenome:$("[e-id=sobrenome-professor]").val(),
            email:$("[e-id=email-professor]").val(),
            idade:$("[e-id=idade-professor]").val(),
        });

        if(atualizarprofessorDados.status === 200){
            alert(atualizarprofessorDados.content);

            return voltarEstadoModal();
        }

        throw({erro:true, message:atualizarprofessorDados.content});
    }catch(erro){

        if(erro.erro){
            alert(erro.message)
        }

    }
};

document.getElementById("btn-salvar-professor").onclick = async () =>{
    try{
           
        const id =  $('[e-id=informacoes-professor]').attr("id");
        const atualizarprofessorDados = await  requisicao("PUT", "/v1/professor", {
            id,
            sala:$("[e-id=sala-professor]").val(),
        });

        if(atualizarprofessorDados.status === 200){
            alert(atualizarprofessorDados.content);

            return voltarEstadoModal();
        }

        throw({erro:true, message:atualizarprofessorDados.content});
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
    $("[e-id=nome-professor]").val("");
    $("[e-id=sobrenome-professor]").val("");
    $("[e-id=email-professor]").val("");
    $("[e-id=idade-professor]").val("");
    $("[e-id=nome-professor]").prop("disabled", true);
    $("[e-id=sobrenome-professor]").prop("disabled", true);
    $("[e-id=email-professor]").prop("disabled", true);
    $("[e-id=idade-professor]").prop("disabled", true);
    document.getElementById("btn-editar-dados-professor").style.display = 'block';
    document.getElementById("btn-salvar-dados-professor").style.display = 'none';
    $('#myModal').modal('hide');

};

//editar

listarProfessoresBanco();