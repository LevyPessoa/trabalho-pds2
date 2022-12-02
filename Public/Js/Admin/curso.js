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
document.getElementById("btn-editar-curso").onclick = ()=>{
    $("[e-id=nome-curso]").prop("disabled", false);
    $("[e-id=codigo-curso]").prop("disabled", false);
    $("[e-id=email-curso]").prop("disabled", false);
    $("[e-id=departamento-curso]").prop("disabled", false);
    $("[e-id=reitor-curso]").prop("disabled", false);

    $("[e-id=horas-curso]").prop("disabled", false);
    $("[e-id=manha]").prop("disabled", false);
    $("[e-id=tarde]").prop("disabled", false);
    $("[e-id=noite]").prop("disabled", false);


    document.getElementById("btn-editar-curso").style.display = 'none';
    document.getElementById("btn-salvar-curso").style.display = 'block';
};

const preencherInputs = (dadosCurso)=>{
    $("[e-id=nome-curso]").val(dadosCurso.nome);
    $("[e-id=codigo-curso]").val(dadosCurso.codigo);
    $("[e-id=email-curso]").val(!!dadosCurso.email?dadosCurso.email:"");
    $("[e-id=departamento-curso]").val(dadosCurso.departamento);
    $("[e-id=horas-curso]").val(dadosCurso.horas);
    $("[e-id=manha]").prop('checked',dadosCurso.turno.manha);
    $("[e-id=tarde]").prop('checked',dadosCurso.turno.tarde);
    $("[e-id=true]").prop('checked',dadosCurso.turno.tarde);

    document.getElementById("reitor-curso").value =dadosCurso.reitor;

};

const verMais = async (id) =>{
    try{
        const buscarCurso = await requisicao("GET", `/v1/curso/${id}`, null);

        if(buscarCurso.status === 200){
            $('#myModal').modal('show');
            $('[e-id=dados-curso]').attr("id", id);
            return preencherInputs(buscarCurso.content);
        }

        throw({erro:true, message:buscarCurso.content});
    }catch(erro){
        console.log(erro)
        if(erro.erro){
            alert(erro.message);
        }
    }
};

document.getElementById("btn-salvar-curso").onclick = async () =>{
    try{
           
        const id =  $('[e-id=dados-curso]').attr("id");
        const atualizarCurso = await  requisicao("PUT", "/v1/curso", {
            id,
            nome:$("[e-id=nome-curso]").val(),
            codigo:$("[e-id=codigo-curso]").val(),
            email:$("[e-id=email-curso]").val(),
            departamento:$("[e-id=departamento-curso]").val(),
            reitor:$("[e-id=reitor-curso]").val(),
            horas:$("[e-id=horas-curso]").val(),
            turno:{
                tarde:$("[e-id=tarde]").prop("checked"),
                noite:$("[e-id=noite]").prop("checked"),
                manha:$("[e-id=manha]").prop("checked")
            }

        });

        if(atualizarCurso.status === 200){
            alert(atualizarCurso.content);

            return voltarEstadoModal();
        }

        throw({erro:true, message:atualizarCurso.content});
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
    $("[e-id=nome-curso]").val("");
    $("[e-id=codigo-curso]").val("");
    $("[e-id=email-curso]").val("");
    $("[e-id=departamento-curso]").val("");
    $("[e-id=reitor-curso]").val("");
    $("[e-id=nome-curso]").prop("disabled", true);
    $("[e-id=codigo-curso]").prop("disabled", true);
    $("[e-id=email-curso]").prop("disabled", true);
    $("[e-id=departamento-curso]").prop("disabled", true);
    $("[e-id=reitor-curso]").prop("disabled", true);
    $("[e-id=horas-curso]").prop("disabled", true);
    $("[e-id=manha]").prop("disabled", true);
    $("[e-id=tarde]").prop("disabled", true);
    $("[e-id=noite]").prop("disabled", true);
    document.getElementById("btn-editar-curso").style.display = 'block';
    document.getElementById("btn-salvar-curso").style.display = 'none';
    $('#myModal').modal('hide');

};

//editar


listar("/v1/pessoa", "reitor-curso");
listarCursosBanco();