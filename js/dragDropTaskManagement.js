let currentDraggableElement;
let dragAndDropGenerated = false;
let arrayForDragAndDropButtons = [];
let openTaskWindow = document.getElementById('openTask')
let cardWindow = document.getElementById('cardID')
let overlayWindow = document.getElementById('overlay')
let addtaskOverlayWindow = document.getElementById('AddTask-overlay')

/**
 * Sets the current draggable element to the specified element.
 *
 * @param {object} element - The element to set as the current draggable element.
 */
function startDragging(element) {
  currentDraggableElement = element;
}


/**
 * Prevents the default behavior of an event.
 *
 * @param {Event} ev - The event object.
 */
function allowDrop(ev) {
  ev.preventDefault();
}


/**
 * Moves the current draggable element to the specified position.
 *
 * @param {string} position - The ID of the target container where the element will be moved.
 * @return {Promise<void>} - A promise that resolves once the element has been moved.
 */
async function moveTo(position) {
  let element = currentDraggableElement;
  let targetContainer = document.getElementById(position);
  targetContainer.appendChild(element);
  removehiglight(position);
  let cardId = element.id;
  cardId = cardId.slice(4);
  tasks[cardId].container = position;
  await setItem("tasks", JSON.stringify(tasks));
  updateNoTasksDisplay();
}


/**
 * Highlights an element with the given id.
 *
 * @param {string} id - The id of the element to highlight.
 * @return {undefined} - This function does not return anything.
 */
function higlight(id) {
  document.getElementById(id).classList.add("dragAreaHiglight");
}


/**
 * Removes the "dragAreaHiglight" class from the element with the specified ID.
 *
 * @param {string} id - The ID of the element.
 */
function removehiglight(id) {
  document.getElementById(id).classList.remove("dragAreaHiglight");
}


/**
 * Removes the highlight from the "toDo", "inProgress", "awaitFeedback", and "done" elements.
 *
 * @param {string} param - The name of the element to be highlighted.
 */
function removeHiglightDone() {
  removehiglight("toDo");
  removehiglight("inProgress");
  removehiglight("awaitFeedback");
  removehiglight("done");
}


/**
 * Updates the display of the "No Tasks" placeholder based on the presence of child elements in the specified containers.
 *
 * @param {Array} containerIds - A list of IDs of the containers to be checked.
 * @return {void}
 */
function updateNoTasksDisplay() {
  const containerIds = ["toDo", "inProgress", "awaitFeedback", "done"];
  containerIds.forEach((id) => {

    const container = document.getElementById(id);
    const placeholder = container.querySelector(".noTasks");
    const childElements = container.querySelectorAll(".card");

    if (childElements.length === 0) {
      placeholder.style.display = "block";
    } else {
      placeholder.style.display = "none";
    }
  });
}


/**
 * Filters tasks based on the search query.
 * Title, Description, Category
 *
 * @return {undefined} No return value.
 */
function filterTasks() {
  let search = document.getElementById("searchTask").value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const titleElement = card.querySelector(".cardTitel p");
    const categoryElement = card.querySelector(".cardCategory span");
    const descriptionElement = card.querySelector(".cardDescription");
    const title = titleElement.textContent.toLowerCase();
    const category = categoryElement.textContent.toLowerCase();
    const description = descriptionElement.textContent.toLowerCase();
    if (!search) {
      card.style.display = "flex";
    } else if (
      title.includes(search) ||
      category.includes(search) ||
      description.includes(search)
    ) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}


/**
 * Opens a task window with the given ID.
 * made by Mina Zarkesh
 *
 * @param {number} id - The ID of the task to open.
 * @return {void} - This function does not return a value.
 */
function openTask(id) {
  let cardWindow = document.getElementById('cardID');
  let openTaskWindow = document.getElementById("openTask");
  cardWindow.style.display = 'flex';
  openTaskWindow.style.display = "flex";
  renderOpenTask(id);
}


/**
 * Closes the open task window and hides the associated card.
 * This function targets elements with specific IDs ('cardID' and 'openTask') and sets their display style to 'none' to hide them.
 * Additionally, it resets the 'ContactChosenDiv' array if its length is greater than 1, ensuring that the selection state is cleared.
 *
 * @return {void}
 */
function closeOpenTask() {
  let card = document.getElementById('cardID');
  let openTaskWindow = document.getElementById("openTask");
  card.style.display = 'none'
  openTaskWindow.style.display = 'none'
  if (ContactChosenDiv.length > 1) {
    ContactChosenDiv = [];
  }
}


/**
 * Iterates over arrays of assigned contact information and appends generated HTML to a specified div.
 *
 * This function loops through the 'openAssignedTo', 'openassignedToNameTag', and 'openassignedToColor' arrays.
 * For each set of elements in these arrays, it generates HTML using the `generateOpenProfileBadgeWithName` function
 * and appends this HTML to the 'clickedAssignetToDiv'. This function is typically used to display information about 
 * contacts that are assigned to a task or a similar entity in a dynamic and visual format.
 *
 * @param {Array} openAssignedTo - An array of names of assigned contacts.
 * @param {Array} openassignedToNameTag - An array of name tags corresponding to the assigned contacts.
 * @param {Array} openassignedToColor - An array of colors associated with the assigned contacts.
 * @param {HTMLElement} clickedAssignetToDiv - The HTML element to which the generated HTML will be appended.
 */
function schleifeForOpenAssignedTo(openAssignedTo, openassignedToNameTag, openassignedToColor, clickedAssignetToDiv) {
  for (let i = 0; i < openAssignedTo.length; i++) {
    const openTaskContactName = openAssignedTo[i];
    const openTaskContactNameTag = openassignedToNameTag[i];
    const openTaskContactColor = openassignedToColor[i];
    clickedAssignetToDiv.innerHTML += generateOpenProfileBadgeWithName(
      openTaskContactName,
      openTaskContactNameTag,
      openTaskContactColor
    );
  }
}


/**
 * Iterates over an array of open subtasks, generates their corresponding HTML divs, 
 * and updates subtask-related arrays.
 *
 * This function loops through the 'openSubtasks' array and for each subtask, it generates 
 * HTML using the `generateOpenSubtaskDiv` function and appends this HTML to the 'clickedSubtasksDiv'. 
 * It also updates the 'subTasksBoard' array by adding each open subtask and updates the 'subtaskscheckedArray' 
 * by copying the status of each subtask from 'openSubtaskcheckedArray'. This function is commonly used 
 * in task management systems to display and manage subtasks of a particular task.
 *
 * @param {Array} openSubtasks - An array of open subtasks to be processed.
 * @param {HTMLElement} clickedSubtasksDiv - The HTML element where the generated subtask divs will be appended.
 * @param {number} index - The index representing the position of the main task in a larger list or array.
 * @param {Array} subTasksBoard - An array to which the open subtasks will be added.
 * @param {Array} subtaskscheckedArray - An array to which the checked status of subtasks will be added.
 * @param {Array} openSubtaskcheckedArray - An array containing the checked status of open subtasks.
 */
function schleifeForOpenSubtasks(openSubtasks, clickedSubtasksDiv, index, subTasksBoard, subtaskscheckedArray, openSubtaskcheckedArray) {
  for (let i = 0; i < openSubtasks.length; i++) {
    const openSubtask = openSubtasks[i];
    clickedSubtasksDiv.innerHTML += generateOpenSubtaskDiv(
      index,
      openSubtask,
      i
    );
    subTasksBoard.push(openSubtask);
    subtaskscheckedArray.push(openSubtaskcheckedArray[i]);
  }
}


/**
 * Iterates over an array of subtask check statuses and updates the corresponding checkboxes.
 *
 * This function loops through the 'openSubtaskcheckedArray', where each element represents the checked 
 * status ('checked' or otherwise) of a subtask. For each element, it finds the corresponding checkbox element 
 * by its ID ('confirm' followed by the index) and sets its 'checked' property based on the status. 
 * This is typically used in task management applications to initialize the state of subtask checkboxes 
 * when opening or displaying a task with multiple subtasks.
 *
 * @param {Array} openSubtaskcheckedArray - An array containing the checked statuses ('checked' or otherwise) of subtasks.
 */
function schleifeForOpenSubtaskArray(openSubtaskcheckedArray) {
  for (let j = 0; j < openSubtaskcheckedArray.length; j++) {
    const openSubtaskCheckLabel = openSubtaskcheckedArray[j];
    let openSubtaskCheckbox = document.getElementById("confirm" + j);
    if (openSubtaskCheckLabel === "checked") {
      openSubtaskCheckbox.checked = true;
    }
  }
}


/**
 * Renders an open task based on the given index.
 * made by Mina Zarkesh
 * @param {number} index - The index of the task to render.
 * @return {undefined} This function does not return a value.
 */
function renderOpenTask(index) {
  let clickedOpenTask = document.getElementById("openTask");
  clickedOpenTask.innerHTML = "";
  let openCategory = tasks[index]["category"];
  let openTitle = tasks[index]["title"];
  let openDescription = tasks[index]["description"];
  let openDate = tasks[index]["date"];
  let openPriority = tasks[index]["priority"];
  let openPriorityImg = tasks[index]["priorityImg"];
  let openAssignedTo = tasks[index]["assignedTo"];
  let openassignedToNameTag = tasks[index]["assignedToNameTag"];
  let openassignedToColor = tasks[index]["assignedToColor"];
  let openSubtasks = tasks[index]["subtasks"];
  let openSubtaskcheckedArray = tasks[index]["subtaskschecked"];
  clickedOpenTask.innerHTML = generateOpenTask(
    index,
    openCategory,
    openTitle,
    openDescription,
    openDate,
    openPriority,
    openPriorityImg
  );
  let clickedSubtasksDiv = document.getElementById("openSubtasksDiv");
  let clickedAssignetToDiv = document.getElementById("openAssignetTo");
  clickedAssignetToDiv.innerHTML = "";
  clickedSubtasksDiv.innerHTML = "";
  schleifeForOpenAssignedTo(openAssignedTo, openassignedToNameTag, openassignedToColor, clickedAssignetToDiv);
  subTasksBoard = [];
  subtaskscheckedArray = [];
  schleifeForOpenSubtasks(openSubtasks, clickedSubtasksDiv, index, subTasksBoard, subtaskscheckedArray, openSubtaskcheckedArray)
  schleifeForOpenSubtaskArray(openSubtaskcheckedArray)
}


/**
 * Delete a task from the list of tasks (card).
 * made by Mina Zarkesh
 *
 * @param {number} id - The ID of the task to delete.
 * @return {Promise<void>} - A promise that resolves after the task is deleted.
 */
async function deleteTask(id) {
  tasks.splice(id, 1);
  await setItem("tasks", tasks);
  closeOpenTask();
  renderBoard();
}


/**
 * Asynchronously sets up the interface for editing a task.
 *
 * This function initializes the interface for editing a task by clearing existing content and setting up
 * new content based on the task at the given index. It clears the inner HTML of certain elements and
 * sets new content using the 'generateEditTask' function. Additionally, it sets the minimum date for a 
 * date input element and resets the 'ContactChosenDiv' array. The function assumes the existence of 
 * specific DOM elements and that 'tasks' is an array of task objects.
 *
 * @param {number} index - The index of the task in the 'tasks' array to be edited.
 */
async function setupEditTaskInterface(index) {
  let clickedOpenTask = document.getElementById("openTask");
  let addTask = document.getElementById("AddTask-overlay");
  let assignedTo = document.getElementById("assignetTo");
  let subtasksDiv = document.getElementById("subtasksDiv");

  clickedOpenTask.innerHTML = "";
  addTask.innerHTML = "";
  if (assignedTo) {
    assignedTo.innerHTML = "";
  }
  if (subtasksDiv) {
    subtasksDiv.innerHTML = "";
  }
  
  editedTask = tasks[index];
  clickedOpenTask.innerHTML = generateEditTask(editedTask, index);
  document.getElementById("date").min = new Date().toISOString().split("T")[0];
  ContactChosenDiv = [];
}


/**
 * Sets the priority of a task and updates the UI to reflect this priority.
 *
 * This function adjusts the task's priority based on the 'editedTask' object. It sets the priority image 
 * and updates the class and background color of the priority-related HTML elements (low, medium, urgent) 
 * to reflect the current priority of the task. The function assumes the existence of the 'editedTask' object, 
 * global variables for priority image and priority, and specific DOM elements identified by 'low', 'medium', 
 * and 'urgent'.
 *
 * @param {number} index - The index of the task in the 'tasks' array whose priority is being set.
 */
function setTaskPriority(index) {
  let priorityID = editedTask.priority.toLowerCase();
  let priorityColor = "--" + editedTask.priority;

  if (priorityID === "low") {
    priorityImg = "../assets/img/low.png";
    low.classList.add("active");
    priority = "Low";
    low.style.backgroundColor = `var(${priorityColor})`;
  } else if (priorityID === "medium") {
    priorityImg = "../assets/img/medium.png";
    medium.classList.add("active");
    medium.style.backgroundColor = `var(${priorityColor})`;
    priority = "Medium";
  } else {
    priorityImg = "../assets/img/urgentImg.png";
    urgent.classList.add("active");
    urgent.style.backgroundColor = `var(${priorityColor})`;
    priority = "Urgent";
  }
}


/**
 * Renders the assigned contacts for a specific task and updates the profile badges in the UI.
 *
 * This function takes the index of a task in the 'tasks' array and updates the 'ContactChosenDiv' array
 * with the assigned contacts from that task. It also iterates through the 'contacts' array and updates
 * the 'isContactchosenArray' and 'ContactChosenDiv' arrays to reflect the assigned contacts. Additionally,
 * it calls 'renderAssignetToProfileBadges' to update the profile badges in the UI.
 *
 * @param {number} index - The index of the task in the 'tasks' array to render assigned contacts for.
 */
function renderAssignedContacts(index) {
  let profileBadges = document.getElementById("assignetToProfile-badges");
  profileBadges = "";

  tasks[index].assignedTo.forEach((assignedTo) => {
    ContactChosenDiv.push(assignedTo);
  });

  for (let i = 0; i < contacts.length; i++) {
    const contactElement = contacts[i];
    if (ContactChosenDiv.includes(contactElement.name)) {
      isContactchosenArray[i] = true;
      chosenIndex = ContactChosenDiv.indexOf(contactElement.name);

      ContactChosenDiv[chosenIndex] = contactElement;
      renderAssignetToProfileBadges(i);
    }
  }
}