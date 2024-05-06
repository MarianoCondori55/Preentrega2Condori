let addButton = document.getElementById("addBtn");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField");
let tasks = []; //array para guardar las tareas

// Función para cargar las tareas en el locasStorage
function loadTasks() {
  let tasksFromStorage = localStorage.getItem("tasks");
  if (tasksFromStorage) {
    tasks = JSON.parse(tasksFromStorage); //reconvertimos a js
    tasks.forEach((task) => {
      addTaskToDOM(task); //Llamamos a la funcion de creacion de tareas
    });
  }
}

// Función para agregar una tarea a la lista y guardarla
function addTask(taskText) {
  tasks.push(taskText);
  addTaskToDOM(taskText);
  saveTasks();
}

// Evento del boton Add Task
addButton.addEventListener("click", function () {
  let taskText = inputField.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    inputField.value = "";
  } else {
    alert("Por favor ingrese una Tarea.");
  }
});

// Función para agregar una tarea al DOM
function addTaskToDOM(taskText) {
  let taskElement = document.createElement("p");
  taskElement.classList.add(
    "text-xl",
    "mt-2",
    "cursor-pointer",
    "hover:cursor-wait"
  );
  taskElement.innerText = taskText;
  toDoContainer.appendChild(taskElement);
  taskElement.addEventListener("dblclick", function () {
    toDoContainer.removeChild(taskElement);
    tasks = tasks.filter((task) => task !== taskText);
    saveTasks();
  });
}

// Guardamos las tareas al local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); //
}

// Cargar las tareas al cargar la página
loadTasks();
