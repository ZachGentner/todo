const form = document.querySelector("form");
const input = document.querySelector('#input');
const list = document.querySelector('#list');
const checks = document.querySelectorAll("#list input");

//Add events
form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask();
});

list.addEventListener("click", (event) => {
    removeTask(event);
    console.log(event.target)
});


function addTask() {
    if (input.value != "") {
        //Create a new line item element.
        let task = document.createElement("li");


        //Create and append checkbox
        let checkbox = document.createElement("button");
        checkbox.className = "checkbox btn btn-secondary";
        let icon = document.createElement("i");
        icon.className = "fa-solid fa-check";

        checkbox.appendChild(icon);
        task.appendChild(checkbox);

        //Create and append content
        let content = document.createElement("p")
        content.innerText = input.value;
        task.appendChild(content);

        //Append task to list and reset input value
        list.appendChild(task);
        input.value = '';
    }
}

function removeTask(e) {
    if(e.target.classList.contains("checkbox")) {
        e.target.parentElement.remove();
    }
}

 