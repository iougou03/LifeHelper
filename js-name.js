const nameBox = document.querySelector(".nameBox");
const nameForm = document.querySelector(".nameForm");
const nameInput = nameForm.querySelector("input");
const nbody = document.querySelector('body');

const NAME = "userName";
const SHOW = "show";

function printName(){
    const userName = localStorage.getItem(NAME);
    const n = document.getElementById("local-name");

    n.innerText = userName;
    nbody.style.gridTemplateRows=null;

    showContents(nbody);
}

function showContents(tag){
    document.querySelector('#contents').style.display = "grid";
    tag.style.cssText = "width: 100%; display: grid; grid-template-columns: 75% 25%; align-content:stretch"; 
}

function handleSubmit(event) {
    event.preventDefault();
    let name = nameInput.value;
    saveName(name);
    nameInput.value="";
    nameForm.classList.remove(SHOW);
    printName();
}

function askForName() {
    nameForm.addEventListener("submit",handleSubmit)
}

function saveName(name){
    localStorage.setItem(NAME, name);
}

function getName() {
    const name = localStorage.getItem(NAME)
    if(name === null){
        nameForm.classList.add(SHOW);  //Element.classList object
        askForName();
    } else{ 
        printName();
        showContents(nbody);
    }
    
}

function init() {
    getName();
}

init();
