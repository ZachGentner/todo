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
});

search.addEventListener("input", (event) => {
    searchList(event);
})


//ADD A TASK TO THE LIST
function addTask() {
    if (input.value != "") {
        //Create a new line item element.
        let task = document.createElement("li");

        //Create and append checkbox
        let checkbox = document.createElement("button");
        checkbox.className = "checkbox btn btn-warning";
        let icon = document.createElement("i");
        icon.className = "fa-solid fa-check";

        checkbox.appendChild(icon);
        task.appendChild(checkbox);

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
    if(e.target.classList.contains("checkbox")) {
        e.target.parentElement.remove();
    } else if (e.target.parentElement.classList.contains("checkbox")) {
        e.target.parentElement.parentElement.remove();
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