let addButton = document.getElementById("addBtn");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField");
let tasks = []; //array para guardar las tareas

// Función encargada de guardar las tareas al local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); //
}

// Función para cargar las tareas desde localStorage
function loadTasks() {
  let tasksFromStorage = localStorage.getItem("tasks");
  if (tasksFromStorage) {
    tasks = JSON.parse(tasksFromStorage);
    tasks.forEach((task) => {
      addTaskToDOM(task); //llamamos ala funcion para cargar lo guardado
    });
  }
}

// Función para agregar una tarea a la lista y guardarla
function addTask(taskText) {
  tasks.push(taskText);
  addTaskToDOM(taskText);
  saveTasks();
}

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

// Cargar las tareas al cargar la página
loadTasks();

// Agregar evento click al botón de añadir tarea
addButton.addEventListener("click", function () {
  let taskText = inputField.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    inputField.value = "";
  } else {
    alert("Por favor ingresa una tarea antes de agregarla.");
  }
});
