let objetoMaterias = {};

const criarOption = (dados, tipo)=>{
    const select = document.getElementById(tipo);

    dados.forEach(dado=>{

        const option = document.createElement("option");
        option.value = dado._id;

        if(tipo === 'professor'){
            option.innerText = `${dado.pessoa.nome} ${dado.pessoa.sobrenome}`;
        }

        if(tipo === "materia"){
            option.innerText = `${dado.nome} - ${dado.codigo}`;
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

const removerMateria = (id, nome) =>{
    document.getElementById(id).style.display = 'none'
    objetoMaterias[nome] = null;
};

const criarDivMateria = (id, nome) =>{
    const div = document.getElementById("div-materias");
    const novaDiv = document.createElement("div");
    const idDateNow = `${id}-${Date.now()}`
    novaDiv.classList.add('div-materia');
    novaDiv.id = idDateNow;
    novaDiv.innerText = nome;
    novaDiv.onclick= function(){
        removerMateria(idDateNow, nome);
    };

    div.append(novaDiv);
};

const adicionarMateria = (id, nomeMateria) =>{
   
    if(!!objetoMaterias[nomeMateria]){
        alert("Matéria já adicionada");

        return;
    }

    objetoMaterias[nomeMateria] = id;
    criarDivMateria(id, nomeMateria);
};

document.getElementById("btn-adicionar-materia").onclick = ()=>{
    const select = document.getElementById("materia");
    const option = select.children[select.selectedIndex];
    const texto = option.textContent;
    
    adicionarMateria(select.value, texto)
};

const organizarArrayMateria = () =>{
    let arrayMaterias = [];
    Object.keys(objetoMaterias).forEach(key=>{

        if(!!objetoMaterias[key]){
            arrayMaterias.push(objetoMaterias[key]);
        }
    });

    return arrayMaterias;
}

document.getElementById("btn-criar-curso").onclick = async () =>{
    try{
       
        const criarTurma  = await requisicao("POST", "/v1/curso", {
            nome:document.getElementById("nome").value,
            codigo:document.getElementById("codigo").value,
            departamento:document.getElementById("departamento").value,
            reitor:document.getElementById("pessoa").value,
            materia:organizarArrayMateria(),
            horas:document.getElementById("horas").value,
            turno: {
                tarde:$("[e-id=tarde]").prop("checked"),
                noite:$("[e-id=noite]").prop("checked"),
                manha:$("[e-id=manha]").prop("checked")
           }
        });

        if(criarTurma.status !== 200){
            throw({erro:true, message:criarTurma.content})
        }

        return;
    }catch(erro){

        if(erro.erro){
            alert(erro.message);

            return;
        }
        
    }
};

listar("/v1/materia", "materia");
listar("/v1/pessoa", "pessoa");



