var login_container = document.getElementById("login_container");
var home_container = document.getElementById("home_container");
var email = document.getElementById("email");
var user_email = document.getElementById("user_email");
var password = document.getElementById("password");
var todo_input = document.getElementById("todo_input");
function checkIsUserLogin() {
  var email = localStorage.getItem("email");
  if (email) {
    login_container.style.display = "none";
    home_container.style.display = "block";
    user_email.innerText = email;
    showTodos();
  } else {
    login_container.style.display = "block";
    home_container.style.display = "none";
  }
}
checkIsUserLogin();
function loginUser() {
  if (!email.value || !password.value) return alert("Please add info");
  localStorage.setItem("email", email.value);
  localStorage.setItem("password", password.value);
  checkIsUserLogin();

  email.value = "";
  password.value = "";
}
function logout() {
  localStorage.removeItem("email");
  checkIsUserLogin();
}
function addTodo() {
  if (!todo_input.value.trim()) return alert("Add todo Value");

  var email = localStorage.getItem("email");

  var obj = {
    email: email,
    todo: todo_input.value.trim(),
  };
  var todos = localStorage.getItem("todos");
  if (todos) {
    todos = JSON.parse(todos);
    todos.push(obj);
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    todos = [obj];
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  todo_input.value = "";
  showTodos();
}
function showTodos() {
  var todos = localStorage.getItem("todos");
  var list = document.getElementById("list");
  var email = localStorage.getItem("email");
  if (todos) {
    todos = JSON.parse(todos);
    list.innerHTML = "";
    todos.forEach(function (data, index) {
      if (data.email === email) {
        var li = `<li>${data.todo} <button onclick="removeTodo(${index})">Remove</button></li>`;
        list.innerHTML += li;
      }
    });
  }
}
function removeTodo(index) {
  var todos = localStorage.getItem("todos");
  var email = localStorage.getItem("email");
  if (todos) {
    todos = JSON.parse(todos);
    todos = todos.filter(function (data, i) {
      return !(data.email === email && i === index);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    showTodos();
  }
}
showTodos();
