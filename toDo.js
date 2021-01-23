const toDoTable = document.querySelector(".toDo");
const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector('input')

let idNum=0;
let TODOLIST = [];
const TODO = "to do";

function handleChange(event){
    //currentTarget returns object, and all DOM objects in JS inherited the Node object.
    //check with console.dir
    const id = event.currentTarget.parentNode.id;
    const getTr = document.getElementById(`${id}`);
    if (event.target.checked){
        getTr.style.textDecorationLine="line-through";
        getTr.style.color="gray";
    } else{
        getTr.style.textDecorationLine="none";
        getTr.style.color="white";
    }

}

function removeToDo(toDo){
    const index = TODOLIST.indexOf(toDo);
    TODOLIST.splice(index,1);
    saveToDo();
}
function handleClick(event){
    const id = event.target.parentNode.id;
    const getTr = document.getElementById(`${id}`);
    removeToDo(getTr.children[1].innerText);
    getTr.parentNode.removeChild(getTr); 
}
function printToDo(toDoText){
    let tableRow = document.createElement("tr");
    let span = document.createElement("span");
    let delBtn = document.createElement("button")
    let checkBox = document.createElement("input");

    checkBox.type = "checkbox";
    checkBox.style.display="inline";
    checkBox.addEventListener("change",handleChange);
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",handleClick);
    span.innerText=toDoText;
    tableRow.appendChild(checkBox);
    tableRow.appendChild(span);
    tableRow.appendChild(delBtn);
    tableRow.id=`${idNum}tr`;
    toDoTable.appendChild(tableRow);
}

function saveToDo(){
    localStorage.setItem(TODO,JSON.stringify(TODOLIST)); 
}

function addToDo(toDoText){
    TODOLIST.push(toDoText);
    saveToDo();
    printToDo(toDoText);
}
function handleSubmit(event){
    event.preventDefault();
    const toDoText =toDoInput.value;
    toDoInput.value ="";
    
    addToDo(toDoText);
}

function askToDo(){
    toDoForm.addEventListener("submit",handleSubmit);
}

function init(){
    let toDoList = localStorage.getItem(TODO);

    if(toDoList !==null){
        toDoList = JSON.parse(toDoList);
        TODOLIST = toDoList;
        toDoList.forEach(element => {
            printToDo(element);
            idNum+=1;
        });
    }
    askToDo();
        
}

init();