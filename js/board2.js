/**
 * Clears the input field for adding subtasks and resets the display of related icons.
 * This function finds the 'add-subtasks_input' element and clears its value. It also
 * adjusts the display of several related elements by toggling their visibility. Specifically,
 * it hides the 'close', 'line', and 'check' icons related to subtasks, and ensures that the
 * 'plus' icon is visible.
 */
function add_clearSubtasksInput() {
    let subtask = document.getElementById("add-subtasks_input");
    let subtaskImgPlus = document.getElementById("add-Board_subtasksImg-plus");
    let subtaskImgClose = document.getElementById("add-Board_subtasksImg-close");
    let boardLine = document.getElementById("add-Board_line");
    let subtaskImgCheck = document.getElementById("add-Board_subtasksImg-check");
    subtaskImgClose.classList.add("d-none");
    boardLine.classList.add("d-none");
    subtaskImgCheck.classList.add("d-none");
    if (subtaskImgPlus.classList.contains("d-none")) {
      subtaskImgPlus.classList.remove("d-none");
    }
    subtask.value = "";
  }
  
  
  /**
   * Generates a function comment for the given function body.
   * made by Mina Zarkesh
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  function renderSubtask() {
    let subtask = document.getElementById("subtasks_input");
    let subtasksDiv = document.getElementById("subtasksDiv");
    subtasksDiv.innerHTML = "";
    if (!(subtask.value === "")) {
      subTasksBoard.push(subtask.value);
    }
    let ulbegin = "<ul>";
    for (let i = 0; i < subTasksBoard.length; i++) {
      const tempSubTask = subTasksBoard[i];
      ulbegin += generateSubtaskDiv(tempSubTask, i);
    }
    ulbegin += "</ul>";
    subtasksDiv.innerHTML = ulbegin;
    subtask.value = "";
  }
  
  
  /**
   * Generates a function comment for the given function body.
   * made by Mina Zarkesh
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  function add_renderSubtask() {
    let subtask = document.getElementById("add-subtasks_input");
    let subtasksDiv = document.getElementById("add-subtasksDiv");
    subtasksDiv.innerHTML = "";
    if (!(subtask.value === "")) {
      subTasksBoard.push(subtask.value);
    }
    let ulbegin = "<ul>";
    for (let i = 0; i < subTasksBoard.length; i++) {
      const tempSubTask = subTasksBoard[i];
      ulbegin += add_generateSubtaskDiv(tempSubTask, i);
    }
    ulbegin += "</ul>";
    subtasksDiv.innerHTML = ulbegin;
    subtask.value = "";
  }
  
  
  /**
   * Iterates over the 'ContactChosenDiv' array and appends relevant data to the given arrays.
   *
   * This function takes an array of contact elements and three empty arrays as parameters. For each element
   * in the 'ContactChosenDiv' array, it extracts the name, name tag, and color and appends these details
   * to the respective arrays ('taskassignedTo', 'taskassignedToNameTag', 'taskassignedToColor'). 
   * This is used to store the assigned contacts for a task.
   *
   * @param {Array} ContactChosenDiv - An array of objects containing contact data.
   * @param {Array} taskassignedTo - An array that will hold the names of the assigned contacts.
   * @param {Array} taskassignedToNameTag - An array that will hold the name tags of the assigned contacts.
   * @param {Array} taskassignedToColor - An array that will hold the colors of the assigned contacts.
   */
  function schleifeForTaskassignedTo(ContactChosenDiv, taskassignedTo, taskassignedToNameTag, taskassignedToColor) {
    for (let i = 0; i < ContactChosenDiv.length; i++) {
      const element = ContactChosenDiv[i];
      taskassignedTo.push(element.name);
      taskassignedToNameTag.push(element.nameTag);
      taskassignedToColor.push(element.color);
    }
  }
  
  
  /**
   * Iterates over the 'subTasksBoard' array and populates the 'taskSubtasks' and 'taskSubtaskschecked' arrays.
   *
   * This function is used to process a list of subtasks from the 'subTasksBoard' array. For each subtask,
   * it adds the subtask to the 'taskSubtasks' array and appends an "unchecked" status to the 'taskSubtaskschecked' array. 
   * This is typically used for initializing or updating the subtasks and their statuses in a task management context.
   *
   * @param {Array} subTasksBoard - An array of subtasks to be processed.
   * @param {Array} taskSubtasks - An array that will hold the subtasks.
   * @param {Array} taskSubtaskschecked - An array that will hold the status (checked/unchecked) of each subtask.
   */
  function schleifeForSubTaskBoard(subTasksBoard, taskSubtasks, taskSubtaskschecked) {
    for (let i = 0; i < subTasksBoard.length; i++) {
      taskSubtasks.push(subTasksBoard[i]);
      taskSubtaskschecked.push("unchecked");
    }
  }
  
  
  /**
   * Constructs a new task object with the provided parameters.
   *
   * This function creates a new task object using various task attributes passed as parameters. It includes
   * details such as the task's container, category, title, description, due date, priority, and information 
   * about who it's assigned to (including name tags and colors). It also includes an array of subtasks and their 
   * respective statuses. This function is primarily used in task management contexts where tasks need to be 
   * dynamically created and managed.
   *
   * @param {string} nameOfColumn - The column or container where the task belongs.
   * @param {Array} CategoryArray - An array of available categories.
   * @param {HTMLElement} taskCategory - The HTML element representing the task's category.
   * @param {HTMLElement} taskTitle - The HTML element representing the task's title.
   * @param {HTMLElement} taskDescription - The HTML element representing the task's description.
   * @param {HTMLElement} taskDate - The HTML element representing the task's due date.
   * @param {string} taskPriority - The priority level of the task.
   * @param {string} taskPriorityImg - The URL or path to the priority image.
   * @param {Array} taskassignedTo - An array of names the task is assigned to.
   * @param {Array} taskassignedToNameTag - An array of name tags for those the task is assigned to.
   * @param {Array} taskassignedToColor - An array of colors associated with those the task is assigned to.
   * @param {Array} taskSubtasks - An array of subtasks for the task.
   * @param {Array} taskSubtaskschecked - An array indicating the checked status of each subtask.
   * @returns {Object} The newly created task object.
   */
  function generateNewTask(nameOfColumn, CategoryArray, taskCategory, taskTitle, taskDescription, taskDate, taskPriority, taskPriorityImg, taskassignedTo, taskassignedToNameTag, taskassignedToColor, taskSubtasks, taskSubtaskschecked) {
    newTask = {
      container: nameOfColumn,
      category: CategoryArray[taskCategory.value],
      title: taskTitle.value,
      description: taskDescription.value,
      date: taskDate.value,
      priority: taskPriority,
      priorityImg: taskPriorityImg,
      assignedTo: taskassignedTo,
      assignedToNameTag: taskassignedToNameTag,
      assignedToColor: taskassignedToColor,
      subtasks: taskSubtasks,
      subtaskschecked: taskSubtaskschecked,
    };
  }
  
  
  /**
   * Creates a new task by extracting data from the HTML input elements and adding it to the tasks array.
   * made by Mina Zarkesh
   * @return {Promise<void>} - A promise that resolves once the task has been added to the backend.
   */
  async function add_createTask() {
    dragAndDropGenerated = false;
    let taskCategory = document.getElementById("add-category");
    let taskTitle = document.getElementById("add-taskTitle");
    let taskDescription = document.getElementById("add-description");
    let taskDate = document.getElementById("add-date");
    let taskPriority = priority;
    let taskPriorityImg = priorityImg;
    let taskassignedTo = [];
    let taskassignedToNameTag = [];
    let taskassignedToColor = [];
    let taskSubtasks = [];
    let taskSubtaskschecked = [];
    schleifeForTaskassignedTo(ContactChosenDiv, taskassignedTo, taskassignedToNameTag, taskassignedToColor);
    schleifeForSubTaskBoard(subTasksBoard, taskSubtasks, taskSubtaskschecked)
    const formElement = document.getElementById("add-formID");
    const nameOfColumn = formElement.getAttribute("data-column");
    subTasksBoard = []
    generateNewTask(nameOfColumn, CategoryArray, taskCategory, taskTitle, taskDescription, taskDate, taskPriority, taskPriorityImg, taskassignedTo, taskassignedToNameTag, taskassignedToColor, taskSubtasks, taskSubtaskschecked);
    tasks.push(newTask);
    await addTasktoBackend();
    renderBoard();
    let animatedImg = document.getElementById("animatedImg");
    animatedImg.style.display = "block";
    animatedImg.style.animation = "none";
    setTimeout(function () {
      animatedImg.style.animation =
        "moveDown 3s ease-in-out 0s 1 normal forwards, hide 1s 2s 1 normal forwards";
    }, 100);
    closeMainTask();
    initBoards();
  }
  
  
  /**
   * Adds a task to the backend.
   * made by Mina Zarkesh
   * @return {Promise<void>} - A promise that resolves when the task is added.
   */
  async function addTasktoBackend() {
    await setItem("tasks", JSON.stringify(tasks));
  }
  
  
  /**
   * Renders the board by populating the "toDoBoard" element with board columns and task cards.
   * made by Mina Zarkesh
   *
   * @param {type} - None
   * @return {type} - None
   */
  function renderBoard() {
    let content = document.getElementById("toDoBoard");
    let names = ["To do", "in Progress", "Await feedback", "Done"];
    content.innerHTML = "";
    for (let i = 0; i < BoardIDs.length; i++) {
      const column = BoardIDs[i];
      const name = names[i];
      content.innerHTML += generateBoardColumn(column, name);
      renderTaskCard(column);
    }
  }
  
  
  /**
   * Renders a task card based on the given ID.
   * made by Mina Zarkesh
   *
   * @param {number} id - The ID of the task.
   * @return {void} This function does not return a value.
   */
  function renderTaskCard(id) {
    let content = document.getElementById(`C_${id}`);
    content.innerHTML = "";
    let keyword = id;
    tasks = tasks.filter((task, index) => {
      if (typeof task.container === 'undefined') {
        return false;
      }
      return true;
    });
    searchResultTasks = tasks.filter(
      (task) => task.container && task.container.indexOf(keyword) > -1
    );
    let j;
    for (let k = 0; k < searchResultTasks.length; k++) {
      let Telement = searchResultTasks[k];
      j = tasks.indexOf(Telement);
      let taskCategory = Telement["category"];
      let taskTitle = Telement["title"];
      let taskDescription = Telement["description"];
      content.innerHTML += generateTaskCard(
        j,
        taskCategory,
        taskTitle,
        taskDescription
      );
      let cardCategory = document.getElementById("cardCategory" + j);
      if (taskCategory === "User Story") {
        cardCategory.style.backgroundColor = `var(--userStory)`;
      } else {
      }
      renderProfileBadges(j);
      renderPriorityImg(j);
      renderProgessBar(j);
      j++;
    }
  }
  
  
  /**
   * Renders profile badges based on the given index.
   * made by Mina Zarkesh
   * @param {number} i - The index of the profile badges to render.
   * @return {undefined} This function does not return a value.
   */
  function renderProfileBadges(i) {
    let profileBadges = document.getElementById("profileBadges" + i);
    let taskassignedToNameTag = tasks[i]["assignedToNameTag"];
    let taskassignedToColor = tasks[i]["assignedToColor"];
    let taskPriorityImg = "../assets/img/medium.png";
    profileBadges.innerHTML = "";
    for (let j = 0; j < taskassignedToColor.length; j++) {
      const assignedToColor = taskassignedToColor[j];
      const assignedToNameTag = taskassignedToNameTag[j];
      profileBadges.innerHTML += generateProfileBadge(
        assignedToColor,
        assignedToNameTag
      );
    }
  }
  
  
  /**
   * Generates HTML markup for a profile badge with specific color and name tag.
   * This function creates a div element with the class 'profile-badge', 
   * setting its background color and containing a span element with the provided name tag.
   *
   * @param {string} taskassignedToColor - The color to be used for the badge's background.
   * @param {string} taskassignedToNameTag - The name tag to be displayed inside the badge.
   * @return {string} HTML string representing the profile badge.
   */
  function add_generateProfileBadge(taskassignedToColor, taskassignedToNameTag) {
    return /*html*/ `
      <div class="profile-badge" style="background-color: var(${taskassignedToColor});">
            <span>${taskassignedToNameTag}</span>
          </div>
    `;
  }
  
  
  /**
   * Renders profile badges based on the given index.
   * made by Mina Zarkesh
   * @param {number} i - The index of the profile badges to render.
   * @return {undefined} This function does not return a value.
   */
  function add_renderProfileBadges(i) {
    let profileBadges = document.getElementById("add-profileBadges" + i);
    let taskassignedToNameTag = tasks[i]["assignedToNameTag"];
    let taskassignedToColor = tasks[i]["assignedToColor"];
    let taskPriorityImg = "../assets/img/medium.png";
    profileBadges.innerHTML = "";
    for (let j = 0; j < taskassignedToColor.length; j++) {
      const assignedToColor = taskassignedToColor[j];
      const assignedToNameTag = taskassignedToNameTag[j];
      profileBadges.innerHTML += add_generateProfileBadge(
        assignedToColor,
        assignedToNameTag
      );
    }
  }
  
  
  /**
   * Renders the priority image for a given task.
   * made by Mina Zarkesh
   * @param {number} i - The index of the task.
   * @return {undefined} Does not return a value.
   */
  function renderPriorityImg(i) {
    let priorityImg = document.getElementById("priorityImg" + i);
    let taskPriorityImg;
    let priority = tasks[i].priority;
    if (priority === "Urgent" || priority === "urgent") {
      taskPriorityImg = "../assets/img/urgentImg.png";
    } else if (priority === "Medium" || priority === "medium") {
      taskPriorityImg = "../assets/img/medium.png";
    } else {
      taskPriorityImg = "../assets/img/low.png";
    }
    priorityImg.innerHTML = "";
    priorityImg.innerHTML = /*html*/ `
     <img src=${taskPriorityImg}  />
    `;
  }
  
  
  /**
   * Renders a progress bar based on the provided index.
   * made by Mina Zarkesh
   * @param {number} i - The index of the progress bar to render.
   * @return {void} This function does not return a value.
   */
  function renderProgessBar(i) {
    let subtasks = [];
    subtasks = tasks[i].subtasks;
    subtaskscheckedArray = tasks[i].subtaskschecked;
    let progressBar = document.getElementById("progressBar" + i);
    let subtasksLength = tasks[i].subtasks.length;
    let valueSubTasks = 0;
    for (let j = 0; j < subtaskscheckedArray.length; j++) {
      const element = subtaskscheckedArray[j];
      if (element === "checked") {
        valueSubTasks++;
      }
    }
    progressBar.innerHTML = /*html*/ `
     <progress id="progress${i}" max="${subtasksLength}" value="${valueSubTasks}"></progress>
                    <span>${valueSubTasks}/${subtasksLength} Subtasks</span>
  `;
  }
  

  /**
   * Closes the 'assignetTo' div when a click event occurs outside of a specific area.
   *
   * This function adds an event listener to the element with the ID 'openTask'. It checks if a click
   * event occurred outside the element with the ID 'asgnt'. If so, it hides the 'assignetTo' div and 
   * changes the source of the 'assignetToImg' image to indicate that the div is closed. This is typically 
   * used in UIs where certain elements should be hidden when the user interacts with other parts of the 
   * application.
   */
  function closeDiv() {
    let assignetTo = document.getElementById('assignetTo');
    let img = document.getElementById('assignetToImg');
    document.getElementById('openTask').addEventListener('click', function (event) {
      if (!event.target.closest('#asgnt') && assignetTo) {
        assignetTo.style.display = "none";
        img.src = "../assets/img/arrow_drop_down.png";
      }
    });
  }