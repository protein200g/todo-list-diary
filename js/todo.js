const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function checkToDo(event){
  const li = event.target.parentElement;
  const spanTag = li.firstChild;
  spanTag.classList.toggle("cancle")
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button1 = document.createElement("button");
  const button2 = document.createElement("button");
  button2.classList.add("fa-solid", "fa-check")
  button1.classList.add("fa-solid","fa-trash-can")
  function clicked(){
    button2.classList.toggle("clicked");
  }
  button2.addEventListener("click", checkToDo);
  button2.addEventListener("click", clicked);
  button1.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button1);
  li.appendChild(button2);
  toDoList.appendChild(li);
}
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
