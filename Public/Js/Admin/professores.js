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


const verMais = async (id) =>{
    try{
        
        $('#myModal').modal('show');
    }catch(erro){
        console.log(erro)
    }
};

listarProfessoresBanco();