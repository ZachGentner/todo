//VARIABLES-QUERY SELECTORS
const form = document.querySelector('form');
const input = document.querySelector('#input');
const list = document.querySelector('#list');
const search = document.querySelector('#search');
let taskList = {};

//EVENT HANDLERS
window.addEventListener("load", () => {
    // load all of the tasks from local storage
});

window.addEventListener("unload", () => {
    //Save all of the tasks to a local storage variable
    localStorage.setItem("tasks", JSON.stringify(taskList));
});

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
        icon.className = "fa-solid fa-check";
        btn.appendChild(icon);
        task.appendChild(btn);

        //Create and append edit button
        btn = document.createElement("button");
        btn.className = "edit mx-1 btn btn-secondary fa-regular fa-pen-to-square";
        task.appendChild(btn);

        //Create and append content
        let content = document.createElement("p")
        content.className = "m-2";
        content.innerText = input.value;
        task.appendChild(content);

        //Append task to list and reset input value
        list.appendChild(task);
        taskList[0] = task;
        localStorage.setItem("tasks", JSON.stringify(taskList));
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
    if (e.target.classList.contains("edit") && e.target.parentElement.querySelector("input") === null) {
        //Disable search functionality while in edit mode.
        let editing = false;
        search.setAttribute("disabled", "true");

        //Remove the task from view, storing the data in a temp variable.
        let todo = e.target.parentElement;
        let content = todo.querySelector("p")
        content.remove();
        
        //Create a text field for the list item.
        let field = document.createElement("input");
        field.appendChild(document.createElement("input"));
        field.className = ("m-1")
        field.setAttribute("type", "text");
        field.setAttribute("placeholder", content.innerText);
        // field.value = content.innerText; //Will add former text content to input field rather than a placeholder.

        //Add the new text field as a child of the list item.
        todo.appendChild(field);

        field.addEventListener("keydown", (e) => { //If user changes the input text and presses enter.
            if (e.key === "Enter") {
                if (e.target.value != "") {
                    let temp = document.createElement("p");
                    temp.className = "m-2";
                    temp.innerText = e.target.value;
                    e.target.parentElement.appendChild(temp);
                    e.target.remove();

                    //Check to see if any other elements are in edit mode. If they are not, enable search.
                    for (let i = 0; i < list.childElementCount; i++) {
                        if (list.children[i].querySelector("input") != null) {
                            editing = true;
                            return;
                        }
                    }

                    if(editing === false) {
                        search.removeAttribute("disabled"); // Enable search funcationality when exiting edit mode.
                    }
                }
            }
        })
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