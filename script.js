console.log("Todo App Loaded");

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoGrid = document.getElementById("todoGrid");

let todos = JSON.parse(localStorage.getItem("todos")) || []; // Load from storage

// Render todos on page load
renderTodos();

// 1. ADD TODO - Form Submit
todoForm.addEventListener("submit", function(e) {
  e.preventDefault(); // Stop page reload

  const taskText = todoInput.value.trim();
  if (taskText === "") return;

  const newTodo = {
    id: Date.now(), // unique id
    text: taskText,
    completed: false,
    time: new Date().toLocaleString()
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();

  console.log("Task Added:", newTodo);
  todoInput.value = ""; // clear input
});

// 2. RENDER TODOS - Create DOM elements
function renderTodos() {
  todoGrid.innerHTML = ""; // clear grid

  if (todos.length === 0) {
    todoGrid.innerHTML = "<p>No tasks yet. Add one above!</p>";
    return;
  }

  todos.forEach(todo => {
    const card = document.createElement("div");
    card.classList.add("todo-card");
    if (todo.completed) card.classList.add("completed");

    card.innerHTML = `
      <p>${todo.text}</p>
      <small>Added: ${todo.time}</small>
      <div class="card-actions">
        <button class="btn-complete" onclick="toggleComplete(${todo.id})">
          ${todo.completed ? "Undo" : "Complete"}
        </button>
        <button class="btn-delete" onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    `;

    todoGrid.appendChild(card);
  });
}

// 3. TOGGLE COMPLETE
function toggleComplete(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
  console.log("Toggled task:", id);
}

// 4. DELETE TODO
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
  console.log("Deleted task:", id);
}

// 5. SAVE TO LOCALSTORAGE
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}