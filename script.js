const button = document.querySelector(".button-add-task");// Elemento do botão de adicionar tarefa
const input = document.querySelector(".input-task");// Elemento de entrada de texto, onde o usuário digita a tarefa
const listCompleta = document.querySelector(".list-tasks");// Elemento da lista de tarefas, onde as tarefas são exibidas
const alertBox = document.querySelector(".alert");// Elemento de alerta

let myList = [];// Array para armazenar as tarefas



// Função para adicionar uma nova tarefa
function addNewTask() {
    if (!input.value.trim()) {
        alertBox.textContent = "Por favor, digite uma tarefa antes de adicionar!";
        alertBox.style.display = "block";
        setTimeout(() => {
            alertBox.style.display = "none";
        }, 3000); // Esconde o alerta após 3 segundos
        return;
    }
    myList.push({
        tarefa: input.value,
        concluida: false
    });
    input.value = "";
    showTask();
}



// Função para mostrar as tarefas
function showTask() {
    let newLI = ''

    myList.forEach((item, index) => {
        newLI = 
         newLI + 
        `
            <li class="task ${item.concluida && "done"}">
               <img src="./img/check-regular-24.png" alt="check" onclick="concluirTarefa(${index})">
               <p>${item.tarefa}</p>
               <img src="./img/trash-regular-24.png" alt="trash" onclick="deletarItem(${index})">
            </li>
        
        `
    });

    listCompleta.innerHTML = newLI;

    localStorage.setItem("List", JSON.stringify(myList))/*salva no localstorage, transformando em string*/
}


// Função para marcar uma tarefa como concluída
function concluirTarefa(index) {
   myList[index].concluida = !myList[index].concluida

   showTask()
}



// Função para deletar uma tarefa
function deletarItem(index) {
   myList.splice(index, 1)

   showTask()
}


// Função para recarregar as tarefas do localStorage
function recarregarTask() {
    const taskDoLocalStorage = localStorage.getItem("List")
    myList = JSON.parse(taskDoLocalStorage) || [];

     if(taskDoLocalStorage){
        myList = JSON.parse(taskDoLocalStorage)
     }

     showTask()
}

recarregarTask()
button.addEventListener("click" , addNewTask)