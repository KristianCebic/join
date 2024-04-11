/**
 * Renders the subtasks for a specific task and updates the UI with a list of subtasks.
 *
 * This function takes the index of a task in the 'tasks' array and generates a list of subtasks
 * from the subtasks of that task. It then updates the 'subtasksDiv' element in the UI to display
 * the list of subtasks.
 *
 * @param {number} index - The index of the task in the 'tasks' array to render subtasks for.
 */
function renderSubtasks(index) {
    subTasksBoard = [];
  
    for (let i = 0; i < editedTask.subtasks.length; i++) {
      subTasksBoard.push(editedTask.subtasks[i]);
    }
    let ulbegin = "<ul>";
  
    for (let i = 0; i < subTasksBoard.length; i++) {
      const tempSubTask = subTasksBoard[i];
      ulbegin += generateSubtaskDiv(tempSubTask, i);
    }
    ulbegin += "</ul>";
  
    subtasksDiv.innerHTML = ulbegin;
  }
  
  
  /**
   * Sets the task priority, renders assigned contacts, and subtasks for a specific task.
   *
   * This function takes the index of a task in the 'tasks' array, sets the task priority based on
   * the task's priority, renders assigned contacts for the task, and renders the list of subtasks
   * for the task.
   *
   * @param {number} index - The index of the task in the 'tasks' array to perform the operations for.
   */
  function setPriorityAndRenderTaskComponents(index) {
    setTaskPriority(index);
    renderAssignedContacts(index);
    renderSubtasks(index);
  }
  
  
  /**
   * Show the edit task form for a specific task.
   * made by Mina Zarkesh
   *
   * @param {number} index - The index of the task to edit.
   * @return {Promise<void>} A promise that resolves when the edit task form is displayed.
   */
  async function showEditTask(index) {
    await setupEditTaskInterface(index);
    setPriorityAndRenderTaskComponents(index);
    closeDiv();
  }
  
  
  /**
   * Returns an edited task object with the specified properties.
   */
  function getEditedTask(index, CategoryArray, taskCategory, taskTitle, taskDescription, taskDate, taskPriority, taskPriorityImg, taskassignedTo, taskassignedToNameTag, taskassignedToColor, taskSubtasks, taskSubtaskschecked) {
    return {
      container: tasks[index].container,
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
   * Edits a task in the task list.
   * made by Mina Zarkesh
   *
   * @param {number} index - The index of the task to be edited.
   * @return {Promise} A promise that resolves after the task has been edited.
   */
  async function editTask(index) {
    let taskCategory = document.getElementById("category");
    let taskTitle = document.getElementById("taskTitle");
    let taskDescription = document.getElementById("description");
    let taskDate = document.getElementById("date");
    let taskPriority = priority;
    let taskPriorityImg = priorityImg;
    let taskassignedTo = [];
    let taskassignedToNameTag = [];
    let taskassignedToColor = [];
    let taskSubtasks = [];
    let taskSubtaskschecked = [];
  
    for (let i = 0; i < ContactChosenDiv.length; i++) {
      const element = ContactChosenDiv[i];
      if (taskassignedTo)
      taskassignedTo.push(element.name);
      taskassignedToNameTag.push(element.nameTag);
      taskassignedToColor.push(element.color);
    }
  
    for (let i = 0; i < subTasksBoard.length; i++) {
      taskSubtasks.push(subTasksBoard[i]);
      taskSubtaskschecked.push(subtaskscheckedArray[i]);
    }
  
    editedTask = getEditedTask(index, CategoryArray, taskCategory, taskTitle, taskDescription, taskDate, taskPriority, taskPriorityImg, taskassignedTo, taskassignedToNameTag, taskassignedToColor, taskSubtasks, taskSubtaskschecked)
    
    tasks[index] = editedTask;
    await addTasktoBackend();
    renderBoard();
    closeOpenTask();
  }
  
  
  /**
   * Deletes a subtask from the subTasksBoard array at the specified index.
   * made by Mina Zarkesh
   * @param {number} i - The index of the subtask to be deleted.
   * @return {undefined} This function does not return any value.
   */
  function deleteSubtask(i) {
    subTasksBoard.splice(i, 1);
    let subtask = document.getElementById("subtasks_input");
    subtask.value = "";
    renderSubtask();
  }
  
  
  /**
   * Deletes a subtask from the subTasksBoard array at the specified index.
   * made by Mina Zarkesh
   * @param {number} i - The index of the subtask to be deleted.
   * @return {undefined} This function does not return any value.
   */
  function add_deleteSubtask(i) {
    subTasksBoard.splice(i, 1);
    let subtask = document.getElementById("add-subtasks_input");
    subtask.value = "";
    add_renderSubtask();
  }
  
  
  /**
   * Toggles the checked state of subtasks for a given index.
   * made by Mina Zarkesh
   * @param {number} index - The index of the task in the tasks array.
   * @param {number} i - The index of the subtask in the subtaskscheckedArray.
   * @return {undefined} No return value.
   */
  function toggleSubtaskschecked(index, i) {
    let inputfield = document.getElementById("confirm" + i);
    let isChosen = inputfield.checked;
    if (isChosen) {
      subtaskscheckedArray[i] = "checked";
      tasks[index].subtaskschecked[i] = "checked";
    } else {
      subtaskscheckedArray[i] = "unchecked";
      tasks[index].subtaskschecked[i] = "unchecked";
    }
    renderBoard();
  }
  
  /**
   * Edits a subtask in the subtasks board.
   * made by Mina Zarkesh
   * @param {number} i - The index of the subtask to be edited.
   * @return {undefined} No return value.
   */
  function editSubtask(i) {
    let subtask = document.getElementById("subtasks_input");
    subtask.value = subTasksBoard[i];
    subTasksBoard.splice(i, 1);
  }
  
  /**
   * Edits a subtask in the subtasks board.
   * made by Mina Zarkesh
   * @param {number} i - The index of the subtask to be edited.
   * @return {undefined} No return value.
   */
  function add_editSubtask(i) {
    let subtask = document.getElementById("add-subtasks_input");
    subtask.value = subTasksBoard[i];
    subTasksBoard.splice(i, 1);
  }
  
  
  /**
   * Renders the "AddTask" section of the application.
   * made by Mina Zarkesh
   * @return {undefined} This function does not return a value.
   */
  function add_renderAddTask(nameOfColumn) {
    let mainSection = document.getElementById("AddTask-overlay");
    mainSection.innerHTML = generateAddTask(nameOfColumn);
    document.getElementById("add-date").min = new Date().toISOString().split("T")[0];
  }
  
  
  /**
   * Prevents the click event from propagating when clicking the "openTask" element.
   *
   * @function
   * @name preventClickPropagation
   *
   * @param {boolean} openTaskWindow - A boolean indicating whether the "openTask" window is open.
   */
  if (openTaskWindow) {
    document.getElementById('openTask').addEventListener('click', function (event) {
      event.stopPropagation();
    });
  }
  
  
  /**
   * Attaches a click event listener to the "cardID" element to close an open task window if it is open.
   *
   * @function
   * @name attachClickEventToCloseTask
   *
   * @param {boolean} cardWindow - A boolean indicating whether the open task window is currently open.
   */
  if (cardWindow) {
    document.getElementById('cardID').addEventListener('click', function () {
      closeOpenTask()
    });
  }
  
  
  /**
   * Attaches a click event listener to the "overlay" element to close the main task window if it is open.
   *
   * @function
   * @name attachClickEventToCloseMainTask
   *
   * @param {boolean} overlayWindow - A boolean indicating whether the main task window overlay is currently open.
   */
  if (overlayWindow) {
    document.getElementById('overlay').addEventListener('click', function (event) {
      closeMainTask()
    });
  }
  
  
  /**
   * Attaches a click event listener to the "AddTask-overlay" element to prevent event propagation if the "addtaskOverlayWindow" is open.
   *
   * @function
   * @name attachClickEventToPreventPropagation
   *
   * @param {boolean} addtaskOverlayWindow - A boolean indicating whether the "AddTask-overlay" window is currently open.
   */
  if (addtaskOverlayWindow) {
    document.getElementById('AddTask-overlay').addEventListener('click', function (event) {
      event.stopPropagation();
    });
  }
  
  
  /**
   * Toggles the visibility of a popup based on its current state.
   * @param {number} id - The ID of the task for which the popup is being toggled.
   */
  function togglePopup(id) {
    let popup = document.getElementById(`moveTo${id}`);
    let isHidden = window.getComputedStyle(popup).display === 'none';
    popup.style.display = isHidden ? 'flex' : 'none';
    event.stopPropagation();
  }
  
  
  /**
   * Generates a drag and drop popup for each task when the window size is small.
   * It dynamically creates a popup element for each task in the 'tasks' array and displays it.
   */
  function generateDragAndDropPopUp() {
    if (window.innerWidth <= 600 && !dragAndDropGenerated) {
      for (let index = 0; index < tasks.length; index++) {
        let card = document.getElementById(`card${index}`);
        card.innerHTML += `
            <div id="popUpDragAndDrop${index}" class="dragAndDropForMobileStyle" onclick="togglePopup(${index})">
              <img src="../assets/img/arrow_left_pop_up.png">
            </div>
            `;
        document.getElementById(`popUpDragAndDrop${index}`).style.display = "flex"
        arrayForDragAndDropButtons.push("true");
      }
    }
  
    if (arrayForDragAndDropButtons.length === tasks.length) {
      dragAndDropGenerated = true;
    }
  }
  
  
  /**
   * Removes the drag and drop popup from each task.
   * This function iterates over each task and hides the associated popup element.
   */
  function removeDragAndDropPopUp() {
    if (window.innerWidth > 600 && dragAndDropGenerated) {
      for (let index = 0; index < tasks.length; index++) {
        let card = document.getElementById(`popUpDragAndDrop${index}`);
        if (card) {
          card.style.display = "none"
        }
      }
    }
  }
  
  
  /**
   * Moves a task card to the 'To Do' column.
   * @param {number} id - The ID of the task to be moved.
   */
  function moveToToDo(id) {
    card = document.getElementById(`card${id}`)
    startDragging(card);
    moveTo('toDo');
    togglePopup(id)
    event.stopPropagation();
  }
  
  
  /**
   * Moves a task card to the 'In Progress' column.
   * @param {number} id - The ID of the task to be moved.
   */
  function moveToInProgress(id) {
    card = document.getElementById(`card${id}`)
    startDragging(card);
    moveTo('inProgress');
    togglePopup(id)
    event.stopPropagation();
  }
  
  
  /**
   * Moves a task card to the 'Await Feedback' column.
   * @param {number} id - The ID of the task to be moved.
   */
  function moveToAwaitFeedback(id) {
    card = document.getElementById(`card${id}`)
    startDragging(card);
    moveTo('awaitFeedback');
    togglePopup(id)
    event.stopPropagation();
  }
  
  
  /**
   * Moves a task card to the 'Done' column.
   * @param {number} id - The ID of the task to be moved.
   */
  function moveToDone(id) {
    card = document.getElementById(`card${id}`)
    startDragging(card);
    moveTo('done');
    togglePopup(id)
    event.stopPropagation();
  }
  
  
  /**
   * Checks the window size and generates or removes the drag and drop popup accordingly.
   * This function triggers the generation of a drag and drop popup for smaller window sizes (<= 600px)
   * and removes it for larger window sizes.
   */
  window.addEventListener('resize', function () {
    if (window.innerWidth <= 600 && dragAndDropGenerated) {
      for (let index = 0; index < tasks.length; index++) {
        document.getElementById(`popUpDragAndDrop${index}`).style.display = "flex"
      }
    } else {
      generateDragAndDropPopUp();
    }
  });
  
  
  /**
   * Attaches a resize event listener to the window and removes the drag-and-drop popup if the window width becomes greater than 600 pixels.
   *
   * @function
   * @name attachResizeEventListener
   */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 600) {
      removeDragAndDropPopUp();
    }
  });