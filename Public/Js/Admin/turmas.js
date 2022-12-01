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

       const turmas = await requisicao("GET", "/v1/turma", null);

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


const verMais = async (id) =>{
    try{
        
        $('#myModal').modal('show');
    }catch(erro){
        console.log(erro)
    }
};

listarTurmasBanco();