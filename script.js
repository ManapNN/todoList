let main = document.createElement("main");
main.classList.add("container");

document.body.prepend(main);

let projectName = document.createElement("h1");
projectName.innerHTML = "Let's do it";
main.append(projectName);

let listBlock = document.createElement("div");
listBlock.className = "mainBlock";
main.append(listBlock);

let firstDiv = document.createElement("div");
listBlock.append(firstDiv);
firstDiv.className = "form";

let textIn = document.createElement("input");
textIn.classList = "textIn";
textIn.setAttribute("placeholder", "PRINT...");
firstDiv.append(textIn);

let setDate = document.createElement("input");
setDate.setAttribute("type", "date");
firstDiv.append(setDate);
setDate.className = "input-date";
// document.body(createElement('br'))
let addBtn = document.createElement("button");
addBtn.innerHTML = "CLICK";
addBtn.id = "addBtn";
firstDiv.append(addBtn);

let ul = document.createElement("ul");
listBlock.append(ul);

let todosArray =
  localStorage.getItem("todo") == null
    ? []
    : [...JSON.parse(localStorage.getItem("todo"))];

const addTodo = () => {
  let newTask = textIn.value;
  let date = setDate.value;
  if (newTask != "") {
    todosArray.push({
      text: newTask,
      checked: false,
      date,
    });
    localStorage.setItem("todo", JSON.stringify(todosArray));
    console.log(todosArray);
    renderTodoItem();
    textIn.value = "";
    setDate.value = "";
  }
};

const deleteTodo = (e) => {
  let index = parseInt(e.target.parentNode.id);

  todosArray.splice(index, 1);

  localStorage.setItem("todo", JSON.stringify(todosArray));

  renderTodoItem();
};

const complateTodo = (e) => {
  // console.log(e.target.parentNode.id)

  let todosTemporary = [...todosArray];

  let index = parseInt(e.target.parentNode.id);

  let objectElement = todosTemporary[index].checked;

  todosTemporary[index].checked = !objectElement;

  console.log(objectElement);

  localStorage.setItem("todo", JSON.stringify(todosTemporary));

  let isDone = e.currentTarget.parentNode.classList.contains("done");
  isDone
    ? e.currentTarget.parentNode.classList.remove("done")
    : e.currentTarget.parentNode.classList.add("done");
};



const renderTodoItem = () => {
  ul.innerHTML = "";
  todosArray.map((todo, id) => {
    
    let li = document.createElement("li");
    li.className = todo.checked ? "taskItem done" : "taskItem";
    li.id = id;

    let comeBtn = document.createElement("img");
    comeBtn.src = "complate.png";
    comeBtn.addEventListener("click", complateTodo);
    comeBtn.className = "comeClick";

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "delete.png";
    deleteBtn.addEventListener("click", deleteTodo);
    deleteBtn.className = "delClick";

    let label = todo.text + " " + todo.date;
    // document.body(document.createElement('hr'))
    li.append(label);
    li.append(comeBtn);
    li.append(deleteBtn);
    ul.prepend(li);
  });
};
renderTodoItem();
addBtn.addEventListener("click", addTodo);