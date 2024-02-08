let form = document.getElementById("form");
let inputField = document.getElementById("input");
let msg = document.getElementById("message");
let tasks = document.getElementById("tasks");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("submit event");
    formValidation();
});

let formValidation = () => {
    if(inputField.value === ""){
        msg.innerHTML = "Task can not be blank";
        console.log("failure");
    }
    else{
        msg.innerHTML = "";
        console.log("success");
        acceptData();
    }
};

let data = {};

let acceptData = () =>{
    data["text"] = input.value;
    console.log(data);
    createTask();
};

let createTask = () => {
    tasks.innerHTML += 
    `<div>
        <p>${data.text}</p>
            <span class="options">
                <i onClick="editTask(this)" class="fas fa-edit"></i>
                <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
            </span>
    </div>`;

    inputField.value = "";
};



let deleteTask = (curObj) =>{
    curObj.parentElement.parentElement.remove();
};

let editTask = (curObj) =>{
    inputField.value = curObj.parentElement.previousElementSibling.innerHTML;
    curObj.parentElement.parentElement.remove();
};

