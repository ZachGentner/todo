//VARIABLES-QUERY SELECTORS
const form = document.querySelector('form');
const input = document.querySelector('#input');
const list = document.querySelector('#list');
const search = document.querySelector('#search');

//EVENT HANDLERS
form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask();
});

list.addEventListener("click", (event) => {
    removeTask(event);
    editTask(event);
});

search.addEventListener("input", (event) => {
    searchList(event);
})


//ADD A TASK TO THE LIST
function addTask() {
    if (input.value != "") {
        //Create a new line item element.
        let task = document.createElement("li");

        //Create and append checkbox button
        let btn = document.createElement("button");
        btn.className = "checkbox btn btn-warning";
        let icon = document.createElement("i");
        icon.className = "checkbox fa-solid fa-check";
        btn.appendChild(icon);
        task.appendChild(btn);

        //Create and append edit button
        btn = document.createElement("button");
        btn.className = "edit mx-1 btn btn-secondary";
        icon = document.createElement("i");
        icon.className = "fa-regular fa-pen-to-square";
        btn.appendChild(icon);
        task.appendChild(btn);

        //Create and append content
        let content = document.createElement("p")
        content.className = "m-2";
        content.innerText = input.value;
        task.appendChild(content);

        //Append task to list and reset input value
        list.appendChild(task);
        input.value = '';
    }
}

//REMOVE A TASK FROM THE LIST
function removeTask(e) {
    if (e.target.classList.contains("checkbox")) {
        e.target.parentElement.remove();
    } else if (e.target.parentElement.classList.contains("checkbox")) {
        e.target.parentElement.parentElement.remove();
    }
}

//EDIT A TASK FROM THE LIST
function editTask(e) {
    if (e.target.classList.contains("edit")) {
        //Remove the task from view, storing the data in a temp variable.
        let content = e.target.parentElement.querySelector("p")
        content.remove();

        //Create a new form to replace the task text.
        let form = document.createElement("form");
        
        //Create a text field for the form.
        let field = document.createElement("input");
        field.appendChild(document.createElement("input"));
        field.className = ("edit m-1")
        field.setAttribute("type", "text");
        field.setAttribute("placeholder", content.innerText);

        form.appendChild(field);

        //Add the new text field as a child of the list item.
        e.target.parentElement.appendChild(form);

    } else if (e.target.parentElement.classList.contains("edit")) {
        e.target.parentElement.parentElement.querySelector("p").remove();
    }
}

//SEARCH FUNCTIONALITY
function searchList(e) {
    tasks = Array.from(list.children);

    tasks.forEach((task) => {
        const taskText = task.querySelector("p").innerText.toLowerCase();
        const searchValue = search.value.toLowerCase();
    
        if (searchValue === "" || taskText.includes(searchValue)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}