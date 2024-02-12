let form = document.getElementById("form");
let taskNameInput = document.getElementById("taskName");
let taskDateInput = document.getElementById("taskDate");
let taskDescriptionInput = document.getElementById("taskDescription");
let msg = document.getElementById("msg");
let taskList = document.getElementById("taskList");
let addBtn = document.getElementById("addBtn");
let closeBtn = document.getElementById("closeBtn");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formValidation();
});

const formValidation = ()=>{
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


const closeModal = ()=>{
    if(taskNameInput.value != "")
         acceptData();
 
    closeBtn.setAttribute("data-bs-dismiss", "modal");
    closeBtn.click();
    
    (()=>{
        closeBtn.setAttribute("data-bs-dismiss", "");
    })()
};

let data = [];

const acceptData = () =>{
    data.push({
        taskName: taskNameInput.value,
        taskDate: taskDateInput.value,
        taskDescription: taskDescriptionInput.value,
    });

    localStorage.setItem("taskList", JSON.stringify(data));

    addTask();
};


const addTask = () =>{

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

const clearForm = () =>{
    taskNameInput.value = "";
    taskDateInput.value = "";
    taskDescriptionInput.value = "";
};

const deleteTask = (curObj) =>{
    curObj.parentElement.parentElement.remove();
    data.splice(curObj.parentElement.parentElement.id, 1);
    localStorage.setItem("taskList", JSON.stringify(data));
};
    
const editTask = (curObj) =>{
    let selectedTask = curObj.parentElement.parentElement;

    taskNameInput.value = selectedTask.children[0].innerHTML;
    taskDateInput.value = selectedTask.children[1].innerHTML;
    taskDescriptionInput.value = selectedTask.children[2].innerHTML;
    
    deleteTask(curObj);
};

(()=>{
    data = JSON.parse(localStorage.getItem("taskList")) || [];
    addTask();
})();




