import { ToDo } from "./models/todo.js";
let toDoList = [
  new ToDo("Äta frukost"),
  new ToDo("Gå till skolan"),
  new ToDo("Äta lunch"),
  new ToDo("Plugga"),
  new ToDo("Träna"),
];

button = document.getElementById("button").addEventListener("click", addToDo);
let input = document.getElementById("todoinput");
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addToDo();
  }
});
function addToDo() {
  let inputValue = input.value;
  toDoList.push(new ToDo(inputValue));
  input.value = "";
  printList();
  input.focus();
}
let list = document.createElement("ul");
list.className = "todowrapper__list";
let wrapper = document.getElementById("wrapper");

function printList() {
  saveToLs();
  console.log(toDoList);
  list.innerHTML = "";
  for (let i = 0; i < toDoList.length; i++) {
    let listItem = document.createElement("li");
    document.getElementById("todoinput").innerText = "";
    let remove = document.createElement("button");
    let finished = document.createElement("button");
    let buttonwrapper = document.createElement("div");
    let secondbuttonwrapper = document.createElement("div");
    let regret = document.createElement("button");
    let moveUp = document.createElement("button");
    let moveDown = document.createElement("button");
    secondbuttonwrapper.className = "todowrapper__secondbuttonwrapper";
    finished.className = "todowrapper__finishedbutton";
    remove.className = "todowrapper__removebutton";
    regret.className = "todowrapper__regretbutton";
    moveUp.className = "todowrapper__moveupbutton";
    moveDown.className = "todowrapper__movedownbutton";
    moveDown.innerHTML = "<i class='fa fa-chevron-down'></i>";
    moveUp.innerHTML = "<i class='fa fa-chevron-up'></i>";
    regret.innerHTML = "<i class='fa fa-arrow-left'</i>";
    remove.innerHTML = "<i class='far fa-trash-alt'</i>";
    finished.innerHTML = "<i class='fa fa-check'></i>";
    buttonwrapper.className = "todowrapper__buttonwrapper";
    if (toDoList[i].finished === true) {
      listItem.className = "todowrapper__listitemfinished";
      listItem.innerHTML = toDoList[i].task;
      buttonwrapper.appendChild(regret);
      buttonwrapper.appendChild(remove);
      secondbuttonwrapper.appendChild(moveUp);
      secondbuttonwrapper.appendChild(moveDown);
      buttonwrapper.appendChild(secondbuttonwrapper);
      listItem.appendChild(buttonwrapper);
      list.appendChild(listItem);
      wrapper.appendChild(list);
    } else {
      listItem.className = "todowrapper__listitem";
      listItem.innerHTML = toDoList[i].task;
      buttonwrapper.appendChild(finished);
      buttonwrapper.appendChild(remove);
      secondbuttonwrapper.appendChild(moveUp);
      secondbuttonwrapper.appendChild(moveDown);
      buttonwrapper.appendChild(secondbuttonwrapper);
      listItem.appendChild(buttonwrapper);
      list.appendChild(listItem);
      wrapper.appendChild(list);
    }
    regret.addEventListener("click", () => {
      handleClick(toDoList[i]);
    });
    finished.addEventListener("click", () => {
      handleClick(toDoList[i]);
    });
    remove.addEventListener("click", () => {
      removeClick(i);
    });
    moveDown.addEventListener("click", () => {
      moveDownFunction(i);
    });
    moveUp.addEventListener("click", () => {
      moveUpFunction(i);
    });
  }
}
function moveDownFunction(i) {
  if (i === toDoList.length - 1) {
    return;
  } else {
    toDoList.splice(i++, 0, toDoList.splice(i, 1)[0]);
    printList();
  }
}
function moveUpFunction(i) {
  if (i === 0) {
    return;
  } else {
    toDoList.splice(i--, 0, toDoList.splice(i, 1)[0]);
    printList();
  }
}
function handleClick(doneTask) {
  doneTask.finished = !doneTask.finished;
  printList();
}
function removeClick(removeTask) {
  toDoList.splice(removeTask, 1);
  printList();
}
function saveToLs() {
  localStorage.setItem("ToDoList", JSON.stringify(toDoList));
}
function getFromLs() {
  let toDoListFromLs = localStorage.getItem("ToDoList");
  let toDoListObj = JSON.parse(toDoListFromLs);
  if (!toDoListFromLs) {
    printList();
  } else {
    toDoList = toDoListObj.map((todo) => {
      return new ToDo(todo.task, todo.finished);
    });
    printList();
  }
}

getFromLs();
