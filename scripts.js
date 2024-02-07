let form = document.getElementById("form");
let inputField = document.getElementById("input");
let msg = document.getElementById("message");

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
    }
};

