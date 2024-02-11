// let form = document.getElementById("form");
// let inputField = document.getElementById("input");
// let msg = document.getElementById("message");
// let tasks = document.getElementById("tasks");

// form.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     console.log("submit event");
//     formValidation();
// });

// let formValidation = () => {
//     if(inputField.value === ""){
//         msg.innerHTML = "Task can not be blank";
//         console.log("failure");
//     }
//     else{
//         msg.innerHTML = "";
//         console.log("success");
//         acceptData();
//     }
// };

// let data = {};

// let acceptData = () =>{
//     data["text"] = input.value;
//     console.log(data);
//     createTask();
// };

// let createTask = () => {
//     tasks.innerHTML += 
//     `<div>
//         <p>${data.text}</p>
//             <span class="options">
//                 <i onClick="editTask(this)" class="fas fa-edit"></i>
//                 <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
//             </span>
//     </div>`;

//     inputField.value = "";
// };



// let deleteTask = (curObj) =>{
//     curObj.parentElement.parentElement.remove();
// };

// let editTask = (curObj) =>{
//     inputField.value = curObj.parentElement.previousElementSibling.innerHTML;
//     curObj.parentElement.parentElement.remove();
// };

let form = document.getElementById("form");
let taskNameInput = document.getElementById("taskName");
let taskDateInput = document.getElementById("taskDate");
let taskDescriptionInput = document.getElementById("taskDescription");
let msg = document.getElementById("msg");
let taskList = document.getElementById("taskList");
let addBtn = document.getElementById("addBtn");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formValidation();
});

let formValidation = ()=>{
    if(taskNameInput.value === ""){
        msg.innerHTML = "Title can not be blank";
    }
    else{
        msg.innerHTML = "";
        acceptData();

        addBtn.setAttribute("data-bs-dismiss", "modal");
        addBtn.click();
        
        //IIFE
        (()=>{
            addBtn.setAttribute("data-bs-dismiss", "");
        })()
    }
};

let data = [];

let acceptData = () =>{
    data.push({
        taskName: taskNameInput.value,
        taskDate: taskDateInput.value,
        taskDescription: taskDescriptionInput.value,
    });

    localStorage.setItem("taskList", JSON.stringify(data));

    addTask();
};


let addTask = () =>{

    taskList.innerHTML= "";

    data.map((x,y)=>{

        return (taskList.innerHTML += `
        <div class="taskItem" id=${y}>
            <span class="fw-bold">${x.taskName}</span>
            <span class="small text-secondary">${x.taskDate}</span>
            <p>${x.taskDescription}</p>
    
            <span class="options">
                <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick="deleteTask(this);addTask()" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `);
    });

    clearForm();
};

let clearForm = () =>{
    taskNameInput.value = "";
    taskDateInput.value = "";
    taskDescriptionInput.value = "";
};

let deleteTask = (curObj) =>{
    curObj.parentElement.parentElement.remove();
    data.splice(curObj.parentElement.parentElement.id, 1);
    localStorage.setItem("taskList", JSON.stringify(data));
};
    
let editTask = (curObj) =>{
    let selectedTask = curObj.parentElement.parentElement;

    taskNameInput.value = selectedTask.children[0].innerHTML;
    taskDateInput.value = selectedTask.children[1].innerHTML;
    taskDescriptionInput.value = selectedTask.children[2].innerHTML;
    
    deleteTask(curObj);
};
let count = 0;
(()=>{
    count++;
    data = JSON.parse(localStorage.getItem("taskList")) || [];
    addTask();
})();




