const listarMateriasTabela = (materia) =>{
    
    const tr = $("[e-id=modelo] tr").clone();
    const tbody = $("[e-id=oficial]");

    $(tr).find("[e-id=nome]").text(materia.nome);
    $(tr).find("[e-id=codigo]").text(materia.codigo);
    $(tr).find("[e-id=horas]").text(materia.horas);
    $(tr).find("[e-id=departamento]").text(materia.departamento);
    $(tr).find("[e-id=ver-mais]").on('click', function(){
        verMais(materia._id);
    });

    tr.css("display", "table-row");
    tbody.append(tr);
};

const listarMateriasBanco = async() =>{
    try{

       const materias = await requisicao("GET", "/v1/materia", null);

       if(materias.status === 200){

            if(materias.content.length > 0){
                materias.content.forEach(materia=>{

                    listarMateriasTabela(materia);
                })
            }
       }else{
        throw({erro:true, message:materias.content})
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

listarMateriasBanco();