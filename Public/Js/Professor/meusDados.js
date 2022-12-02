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

       const professores = await requisicao("GET", "/v1/professor/data/session", null);

       if(professores.status === 200){

        if(!!professores.content){

            listarProfessoresTabela(professores.content);
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


document.getElementById("fechar-modal").onclick = ()=>{

    return voltarEstadoModal();
};

const voltarEstadoModal = () => {
   
    $('#myModal').modal('hide');

};

//editar

listarProfessoresBanco();