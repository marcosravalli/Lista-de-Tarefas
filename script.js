const formularioTarefa = document.getElementById("formularioTarefa");
const novaTarefa = document.getElementById("novaTarefa");
const listaTarefas = document.getElementById("listaTarefas");
let tarefas = [];

function criarTarefa(tarefa) {
    const textoDigitado = tarefa.texto;

     // cria o elemento span com o texto da tarefa
const meuSpan = document.createElement("span");
    meuSpan.className = "textoTarefa";
    meuSpan.textContent = textoDigitado;
//cria o elemento li (lista) com a classe "tarefa" e adiciona o span como filho
    const novoItem = document.createElement("li");
    novoItem.className = "tarefa";
    novoItem.appendChild(meuSpan);
//cria o elemento div com a classe "acoesTarefa" 
    const div = document.createElement("div");
    div.className = "acoesTarefa";

    const spanPositivo = document.createElement("span");
    spanPositivo.className = "positivo";
    spanPositivo.textContent = "✔";

    const spanNegativo = document.createElement("span");
    spanNegativo.className = "negativo";
    spanNegativo.textContent = "✖";

    if (tarefa.estado === "positivo") {
    spanPositivo.classList.add("selecionado");
}

    if (tarefa.estado === "negativo") {
    spanNegativo.classList.add("selecionado");
}

    const spanExcluir = document.createElement("span");
    spanExcluir.className = "excluir";
    spanExcluir.textContent = "🗑️";

    //adiciona os spans como filhos da div e a div como filha do novo item
    div.appendChild(spanPositivo);
    div.appendChild(spanNegativo);
    div.appendChild(spanExcluir);
    novoItem.appendChild(div);

     //adiciona o evento da mudança de cor do "positivo" e "negativo" ao clicar
    
    spanPositivo.addEventListener("click", function() {
        spanPositivo.classList.toggle("selecionado");

        if (spanPositivo.classList.contains("selecionado")) {
            spanNegativo.classList.remove("selecionado");
            tarefa.estado = "positivo";
        } else {
            tarefa.estado = "";
        }

        localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
    });


    
    spanNegativo.addEventListener("click", function() {
        spanNegativo.classList.toggle("selecionado");

        if (spanNegativo.classList.contains("selecionado")) {
            spanPositivo.classList.remove("selecionado");
            tarefa.estado = "negativo";
        } else {
            tarefa.estado = "";
        }

        localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
    });


    //adiciona o evento de exclusão da tarefa ao clicar no "excluir", e ao atualizar a pagina, a tarefa nao retorna
   
    spanExcluir.addEventListener("click", function() {
        listaTarefas.removeChild(novoItem);

        tarefas = tarefas.filter(function(item) {
            return item !== tarefa;
        });

        localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
    });


    //adiciona o novo item à lista de tarefas
    listaTarefas.appendChild(novoItem);
}

  
function adicionandoTarefa(event) {
    event.preventDefault();

    const textoDigitado = novaTarefa.value.trim();

    if (textoDigitado === "") {
        alert("Por favor, digite uma tarefa.");
        return;
    }

    const tarefa = {
        texto: textoDigitado,
        estado: ""
    };

    tarefas.push(tarefa);
    criarTarefa(tarefa);

    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));

    novaTarefa.value = "";
}

formularioTarefa.addEventListener("submit", adicionandoTarefa);


const tarefasSalvas = localStorage.getItem("minhasTarefas");

if (tarefasSalvas !== null) {
    tarefas = JSON.parse(tarefasSalvas);

    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.texto && tarefa.texto.trim() !== "";
    });

    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));

    tarefas.forEach(function(tarefa) {
        criarTarefa(tarefa);
    });
}
