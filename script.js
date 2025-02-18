let userInput = document.querySelector("#todo-input");
const addTaskBtn = document.querySelector("#add-btn");
const taskList = document.querySelector("#task-list");
const todoContainer = document.querySelector(".todo-container");

// Load tasks from local storage when the page loads
window.onload = () => {
    loadTasks();
};

addTaskBtn.addEventListener('click',() => {
    addTask(userInput.value);
});

userInput.addEventListener('keypress' , (e)=>{
    if(e.key === "Enter"){
        addTask(userInput.value);
    }
})

function addTask(task){
    if(task !== ''){
        let li = document.createElement('li');
        // checkbox added to the li
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("task-checkbox");
        li.appendChild(checkBox);

        //li created and task added to li
        let taskText = document.createElement('span');
        taskText.innerText = task;
        li.appendChild(taskText);

        // Create the Edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        li.appendChild(editBtn);

        // Delete button created and added
        const delBtn = document.createElement("button");
        delBtn.innerText = `x`;
        li.appendChild(delBtn);

        // Checkbox Event Listener (Toggle Strikethrough)
        checkBox.addEventListener("change", function() {
            taskText.classList.toggle("completed", checkBox.checked);
        });


        // Add event listener for the edit button
        editBtn.addEventListener('click', function() {
            if (editBtn.innerText === "Edit") {
                // Create an input field to edit the task
                let inputField = document.createElement('input');
                inputField.type = "text";
                inputField.value = taskText.innerText;

                // Replace the task text with input field
                li.replaceChild(inputField, taskText);
                editBtn.innerText = "Save";

                // When Enter key is pressed, save the new task
                inputField.addEventListener("keypress", function(e) {
                    if (e.key === "Enter") {
                        saveTask();
                    }
                });
                

                // Save function to update the task
                function saveTask() {
                    taskText.innerText = inputField.value;
                    li.replaceChild(taskText, inputField);
                    editBtn.innerText = "Edit";
                    saveTasksToLocalStorage(); // Save tasks to local storage after editing
                }

                // When Save button is clicked, update the task
                editBtn.addEventListener('click', saveTask, { once: true });
            }
        });
        

        // event listener for delete button
        delBtn.addEventListener('click',()=>{
            taskList.removeChild(li);
            saveTasksToLocalStorage();
        })

        taskList.appendChild(li);
        // Save tasks to local storage after adding
        saveTasksToLocalStorage();

        // Trigger the smooth transition after the task is appended
        setTimeout(() => {
            li.classList.add('show');
        }, 50);
        userInput.value = "";
    }
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach(item => {
        const taskText = item.querySelector('span').innerText;
        const isChecked = item.querySelector('input').checked;
        tasks.push({ task: taskText, completed: isChecked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks as a JSON string
}


// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement('li');

            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = task.completed; // Set the checkbox state
            checkBox.classList.add("task-checkbox");
            li.appendChild(checkBox);

            let taskText = document.createElement('span');
            taskText.innerText = task.task;
            li.appendChild(taskText);

            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            li.appendChild(editBtn);

            const delBtn = document.createElement("button");
            delBtn.innerText = `x`;
            li.appendChild(delBtn);

            editBtn.addEventListener('click', function() {
                if (editBtn.innerText === "Edit") {
                    let inputField = document.createElement('input');
                    inputField.type = "text";
                    inputField.value = taskText.innerText;

                    li.replaceChild(inputField, taskText);
                    editBtn.innerText = "Save";

                    inputField.addEventListener("keypress", function(e) {
                        if (e.key === "Enter") {
                            saveTask();
                        }
                    });

                    function saveTask() {
                        taskText.innerText = inputField.value;
                        li.replaceChild(taskText, inputField);
                        editBtn.innerText = "Edit";
                        saveTasksToLocalStorage(); // Save tasks after editing
                    }

                    editBtn.addEventListener('click', saveTask, { once: true });
                }
            });

            delBtn.addEventListener('click', () => {
                taskList.removeChild(li);
                saveTasksToLocalStorage(); // Save tasks after deletion
            });

            taskList.appendChild(li);
            // Add 'show' class to make it visible after loading
            setTimeout(() => {
                li.classList.add('show');
            }, 50);
        });
    }
}

const clearAll = document.createElement("button");
    clearAll.innerText = `Clear All Tasks`;
    todoContainer.appendChild(clearAll);
    clearAll.style.width = "90%"
    clearAll.style.marginTop = "10px"

    clearAll.addEventListener("click", () => {
        const tasks = document.querySelectorAll("#task-list li");
    
        tasks.forEach((task, index) => {
            setTimeout(() => {
                task.style.opacity = "0";  // Fade out effect
                task.style.transform = "translateY(-10px)"; // Slight lift effect
            }, index * 100); // Stagger the effect for better animation
        });
    
        setTimeout(() => {
            taskList.innerHTML = ""; // Clear the tasks after animation completes
        }, tasks.length * 100 + 500);
    });


