//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);



//Funciones

function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    if((todoInput.value).length>0){
    //Creamos un DIV donde vamos a poner cada LI con sus botones check y trash
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    
    //Creamos LI que va a ir en el todoDiv y le asignamos clase
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-li");
    //Le ponemos el texto del input
    todoLi.innerText = todoInput.value;
    //Lo agregamos al todoDiv
    todoDiv.appendChild(todoLi);

    //Agregamos el todo al local storage
    saveLocalTodos(todoInput.value);

    //Creamos boton de check, le asignamos clase e icono
    const btnCheck = document.createElement("button");
    btnCheck.classList.add("btn-check");
    btnCheck.innerHTML = "<i class='fas fa-check'></i>";
    //Lo agregamos al todoDiv
    todoDiv.appendChild(btnCheck);

    //Creamos boton de borrar, le asignamos clase e icono
    const btnTrash = document.createElement("button");
    btnTrash.classList.add("btn-trash");
    btnTrash.innerHTML = "<i class='fas fa-trash'></i>";
    //Lo agregamos al todoDiv
    todoDiv.appendChild(btnTrash);
    
    //Agregamos el todoDiv a la UL todo-list
    todoList.appendChild(todoDiv);

    //Borramos el texto del input
    todoInput.value = "";
    }
    
};

function deleteCheck (e) {
    const elementoClickeado = e.target;
    //console.log(elementoClickeado);

    //borrar todoDiv donde se clickeo borrar
    if(elementoClickeado.classList[0] === "btn-trash"){
        const todoDivSeleccionado = elementoClickeado.parentElement;
        console.log(todoDivSeleccionado);
        //Animation agregada con fall y cuando termine,borra el div (transitionend)
        todoDivSeleccionado.classList.add("fall");
        removeLocalTodos(todoDivSeleccionado);
        todoDivSeleccionado.addEventListener("transitionend", function (){
            todoDivSeleccionado.remove();
        });        
    }

    //hacer la check mark
    if(elementoClickeado.classList[0] === "btn-check"){
        const todoDivSeleccionado = elementoClickeado.parentElement;
        todoDivSeleccionado.classList.toggle("completed");
    }
    
};

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";                    
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

//Guardamos los todo's en local storage
function saveLocalTodos(todo){
    //primero chequeo si tengo algun todo ya, para no pisarlos
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos (){
    //primero chequeo si tengo algun todo ya, para no pisarlos
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //Creamos un DIV donde vamos a poner cada LI con sus botones check y trash
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");
    
        //Creamos LI que va a ir en el todoDiv y le asignamos clase
        const todoLi = document.createElement("li");
        todoLi.classList.add("todo-li");
        //Le ponemos el texto del todo del local storage
        todoLi.innerText = todo;
        //Lo agregamos al todoDiv
        todoDiv.appendChild(todoLi);

        //Creamos boton de check, le asignamos clase e icono
        const btnCheck = document.createElement("button");
        btnCheck.classList.add("btn-check");
        btnCheck.innerHTML = "<i class='fas fa-check'></i>";
        //Lo agregamos al todoDiv
        todoDiv.appendChild(btnCheck);

        //Creamos boton de borrar, le asignamos clase e icono
        const btnTrash = document.createElement("button");
        btnTrash.classList.add("btn-trash");
        btnTrash.innerHTML = "<i class='fas fa-trash'></i>";
        //Lo agregamos al todoDiv
        todoDiv.appendChild(btnTrash);
    
        //Agregamos el todoDiv a la UL todo-list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //primero chequeo si tengo algun todo ya, para no pisarlos
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}