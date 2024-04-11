let priority;
let priorityColor;
let priorityImg;
priorityImg;
let newTask = [];
let BoardIDs = ["toDo", "inProgress", "awaitFeedback", "done"];
let searchResultTasks;
let subtaskscheckedArray;
let editedTask = [];
let subTasksBoard = [];
let CategoryArray = ["User Story", "Technical Task"];
let y = 0;


/**
 * Initializes the boards.
 * made by Mina Zarkesh
 * @return {Promise<void>} - A promise that resolves when the boards are initialized.
 */
async function initBoards() {
  await init();
  renderBoard();
  updateNoTasksDisplay();
  createContactChosen();
  generateDragAndDropPopUp();
}


/**
 * Renders the main task section and displays it on the screen.
 * made by Mina Zarkesh
 * @return {Promise<void>} This function does not return anything.
 */
async function showMainTask(nameOfColumn) {
  setOnDefault()
  add_renderAddTask(nameOfColumn);
  const mainSection = document.querySelector(".main_section");
  const overlay = document.getElementById("overlay");
  mainSection.style.display = "flex";
  overlay.style.display = "flex";
  setTimeout(() => {
    toDoBoard
    mainSection.style.right = "0";
  }, 10);
  add_renderAssignetTo();
  document.getElementById('AddTask-overlay').addEventListener('click', function (event) {
    if (!event.target.closest('#assignedTo1')) {
      document.getElementById('add-assignetTo').style.display = "none";
      let img = document.getElementById('add-assignetToImg')
      img.src = "../assets/img/arrow_drop_down.png";
    }
  });
}


/**
 * Closes the main task by hiding the main section and overlay.
 * made by Mina Zarkesh
 *
 * @param {none} None - No parameters needed.
 * @return {none} None - No return value.
 */
function closeMainTask() {
  const mainSection = document.querySelector(".main_section");
  const overlay = document.getElementById("overlay");
  mainSection.style.right = "-100%";
  overlay.style.display = "none";
  setTimeout(() => {
    mainSection.style.display = "none";
  }, 300);
}


/**
 * Changes the priority of an element(button for Priority).
 * made by Mina Zarkesh
 * @param {Object} element - The element whose priority is to be changed.
 * @return {undefined} This function does not return a value.
 */
function changePriority(element) {
  let priorityID = element.id;
  priority = element.name;
  priorityColor = "--" + priority;

  let urgent = document.getElementById("urgent");
  let medium = document.getElementById("medium");
  let low = document.getElementById("low");

  if (priorityID === "low") {
    priorityImg = "../assets/img/low.png";
    low.classList.add("active");
    low.style.backgroundColor = `var(${priorityColor})`;
    urgent.style.backgroundColor = `var(--white)`;
    urgent.classList.remove("active");
    medium.style.backgroundColor = `var(--white)`;
    medium.classList.remove("active");
  } else if (priorityID === "medium") {
    priorityImg = "../assets/img/medium.png";
    medium.classList.add("active");
    medium.style.backgroundColor = `var(${priorityColor})`;
    urgent.style.backgroundColor = `var(--white)`;
    urgent.classList.remove("active");
    low.style.backgroundColor = `var(--white)`;
    low.classList.remove("active");
  } else {
    priorityImg = "../assets/img/urgentImg.png";
    urgent.classList.add("active");
    urgent.style.backgroundColor = `var(${priorityColor})`;
    medium.style.backgroundColor = `var(--white)`;
    medium.classList.remove("active");
    low.style.backgroundColor = `var(--white)`;
    low.classList.remove("active");
  }
}


/**
 * Changes the priority settings of a task and updates the UI accordingly.
 *
 * This function is triggered when a priority option is selected. It sets the task's priority,
 * updates the global priority variables, and adjusts the styling of the priority buttons 
 * to reflect the current selection. The function assumes the existence of specific elements 
 * in the DOM (buttons with IDs 'add-urgent', 'add-medium', 'add-low') and specific image paths.
 *
 * @param {HTMLElement} element - The HTML element that triggered the priority change. 
 *                                This element's ID and name are used to determine the new priority.
 */
function changePriority_Add(element) {
  let priorityID = element.id;
  priority = element.name;
  priorityColor = "--" + priority;
  let urgent = document.getElementById("add-urgent");
  let medium = document.getElementById("add-medium");
  let low = document.getElementById("add-low");
  if (priorityID === "add-low") {
    priorityImg = "../assets/img/low.png";
    low.classList.add("active");
    low.style.backgroundColor = `var(${priorityColor})`;
    urgent.style.backgroundColor = `var(--white)`;
    urgent.classList.remove("active");
    medium.style.backgroundColor = `var(--white)`;
    medium.classList.remove("active");
  } else if (priorityID === "add-medium") {
    priorityImg = "../assets/img/medium.png";
    medium.classList.add("active");
    medium.style.backgroundColor = `var(${priorityColor})`;
    urgent.style.backgroundColor = `var(--white)`;
    urgent.classList.remove("active");
    low.style.backgroundColor = `var(--white)`;
    low.classList.remove("active");
  } else {
    priorityImg = "../assets/img/urgentImg.png";
    urgent.classList.add("active");
    urgent.style.backgroundColor = `var(${priorityColor})`;
    medium.style.backgroundColor = `var(--white)`;
    medium.classList.remove("active");
    low.style.backgroundColor = `var(--white)`;
    low.classList.remove("active");
  }
}


/**
 * Renders the "assignetTo" section of editTask.
 * made by Mina Zarkesh
 * @return {undefined}
 */
function renderAssignetTo() {
  let content = document.getElementById("assignetTo");
  const contactsAddTasks = document.querySelectorAll(".assignetToAddTask");
  let profileBadges = document.getElementById("assignetToProfile-badges");
  content.innerHTML = "";
  profileBadges = "";

  for (let i = 0; i < contacts.length; i++) {
    let tempContact = contacts[i];
    content.innerHTML += generateAssignetTo(tempContact, i);
  }

  for (let j = 0; j < isContactchosenArray.length; j++) {
    let isContactchosen = isContactchosenArray[j];
    let contentB = document.getElementById("assignetToAddTask" + j);
    let CheckImg = document.getElementById("checkContactImg" + j);

    if (isContactchosen) {
      CheckImg.src = "../assets/img/box-white.png";
      if (!contentB.classList.contains("chosenOne")) {
        contentB.classList.add("chosenOne");
        if (contentB.classList.contains("heWhoMustNotBeNamed")) {
          contentB.classList.remove("heWhoMustNotBeNamed");
        }
      }
    } else {
      if (contentB) {
        contentB.classList.remove("chosenOne");
        contentB.classList.add("heWhoMustNotBeNamed");
        CheckImg.src = "../assets/img/checket.png";
      }
    }
  }
}


/**
 * Renders the "assignetTo" section of editTask.
 * made by Mina Zarkesh
 * @return {undefined}
 */
function add_renderAssignetTo() {
  let content = document.getElementById("add-assignetTo");
  const contactsAddTasks = document.querySelectorAll(".assignetToAddTask");
  let profileBadges = document.getElementById("add-assignetToProfile-badges");
  content.innerHTML = "";
  profileBadges = "";
  for (let i = 0; i < contacts.length; i++) {
    let tempContact = contacts[i];
    content.innerHTML += add_generateAssignetTo(tempContact, i);
  }
  for (let j = 0; j < isContactchosenArray.length; j++) {
    let isContactchosen = isContactchosenArray[j];
    let contentB = document.getElementById("add-assignetToAddTask" + j);
    let CheckImg = document.getElementById("add-checkContactImg" + j);
    if (isContactchosen) {
      CheckImg.src = "../assets/img/box-white.png";
      if (!contentB.classList.contains("chosenOne")) {
        contentB.classList.add("chosenOne");
        if (contentB.classList.contains("heWhoMustNotBeNamed")) {
          contentB.classList.remove("heWhoMustNotBeNamed");
        }
      }
    } else {
      if (contentB) {
        contentB.classList.remove("chosenOne");
        contentB.classList.add("heWhoMustNotBeNamed");
        CheckImg.src = "../assets/img/checket.png";
      }
    }
  }
}


/**
 * Filters the contacts based on the input search value.
 * made by Mina Zarkesh
 * @param {string} search - The search value to filter the contacts.
 * @return {void} No return value.
 */
function filterContacts() {
  renderAssignetTo();

  let contactScroll = document.getElementById("assignetTo");
  let search = document
    .getElementById("assignetToInput")
    .value.replace(" ", "")
    .toLowerCase();
  contactScroll.classList.remove("d-none");
  const contactsAddTasks = document.querySelectorAll(".assignetToAddTask");

  contactsAddTasks.forEach((contactAddTask) => {
    const contactNameElement = contactAddTask.querySelector(".contactName");
    const contactName = contactNameElement.textContent
      .replace(" ", "")
      .toLowerCase();
    if (!search) {
      contactAddTask.style.display = "flex";
    } else if (contactName.includes(search)) {
      contactAddTask.style.display = "flex";
    } else {
      contactAddTask.style.display = "none";
    }
  });
}


/**
 * Filters the contacts based on the input search value.
 * made by Mina Zarkesh
 * @param {string} search - The search value to filter the contacts.
 * @return {void} No return value.
 */
function add_filterContacts() {
  add_renderAssignetTo();
  let contactScroll = document.getElementById("add-assignetTo");
  contactScroll.classList.remove("d-none");
  let search = document
    .getElementById("add-assignetToInput")
    .value.replace(" ", "")
    .toLowerCase();

  const contactsAddTasks = document.querySelectorAll(".assignetToAddTask");

  contactsAddTasks.forEach((contactAddTask) => {
    const contactNameElement = contactAddTask.querySelector(".contactName");
    const contactName = contactNameElement.textContent
      .replace(" ", "")
      .toLowerCase();
    if (!search) {
      contactAddTask.style.display = "flex";
    } else if (contactName.includes(search)) {
      contactAddTask.style.display = "flex";
    } else {
      contactAddTask.style.display = "none";
    }
  });
}


/**
 * Change the images of subtasks.
 * vom X/haken zu edit/delete
 *
 * made by Mina Zarkesh
 *
 *
 * @return {undefined} This function does not return a value.
 */
function changeSubtasksImgs() {
  let subtaskImgPlus = document.getElementById("Board_subtasksImg-plus");
  let subtaskImgClose = document.getElementById("Board_subtasksImg-close");
  let boardLine = document.getElementById("Board_line");
  let subtaskImgCheck = document.getElementById("Board_subtasksImg-check");

  subtaskImgPlus.classList.add("d-none");

  if (subtaskImgClose.classList.contains("d-none")) {
    subtaskImgClose.classList.remove("d-none");
  }
  if (boardLine.classList.contains("d-none")) {
    boardLine.classList.remove("d-none");
  }
  if (subtaskImgCheck.classList.contains("d-none")) {
    subtaskImgCheck.classList.remove("d-none");
  }
}


/**
 * Change the images of subtasks.
 * vom X/haken zu edit/delete
 *
 * made by Mina Zarkesh
 *
 *
 * @return {undefined} This function does not return a value.
 */
function add_changeSubtasksImgs() {
  let subtaskImgPlus = document.getElementById("add-Board_subtasksImg-plus");
  let subtaskImgClose = document.getElementById("add-Board_subtasksImg-close");
  let boardLine = document.getElementById("add-Board_line");
  let subtaskImgCheck = document.getElementById("add-Board_subtasksImg-check");

  subtaskImgPlus.classList.add("d-none");

  if (subtaskImgClose.classList.contains("d-none")) {
    subtaskImgClose.classList.remove("d-none");
  }
  if (boardLine.classList.contains("d-none")) {
    boardLine.classList.remove("d-none");
  }
  if (subtaskImgCheck.classList.contains("d-none")) {
    subtaskImgCheck.classList.remove("d-none");
  }
}


/**
 * Clears the input field for subtasks and resets related elements to their default state.
 * made by Mina Zarkesh
 *
 * @param {HTMLElement} subtask - The input field for subtasks.
 * @param {HTMLElement} subtaskImgPlus - The plus icon for adding subtasks.
 * @param {HTMLElement} subtaskImgClose - The close icon for removing subtasks.
 * @param {HTMLElement} boardLine - The line element separating subtasks.
 * @param {HTMLElement} subtaskImgCheck - The check icon for completing subtasks.
 */
function clearSubtasksInput() {
  let subtask = document.getElementById("subtasks_input");
  let subtaskImgPlus = document.getElementById("Board_subtasksImg-plus");
  let subtaskImgClose = document.getElementById("Board_subtasksImg-close");
  let boardLine = document.getElementById("Board_line");
  let subtaskImgCheck = document.getElementById("Board_subtasksImg-check");
  subtaskImgClose.classList.add("d-none");
  boardLine.classList.add("d-none");
  subtaskImgCheck.classList.add("d-none");
  if (subtaskImgPlus.classList.contains("d-none")) {
    subtaskImgPlus.classList.remove("d-none");
  }
  subtask.value = "";
}





