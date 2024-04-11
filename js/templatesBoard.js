/**
 * Generates a board column with the given ID and name.
 *
 * @param {string} ID - The ID of the board column.
 * @param {string} name - The name of the board column.
 * @returns {string} The generated HTML code for the board column.
 * made by Mina Zarkesh
 */
function generateBoardColumn(ID, name) {
  return /*html*/ `
    <div class="dragAndDropContainer"
         id="${ID}"
         ondrop="moveTo('${ID}')"
         ondragleave="removehiglight('${ID}')"
         ondragover="allowDrop(event);higlight('${ID}')"
         >
         <div class="dragAndDropHeadline">
                  <h3>${name}</h3>
                  <button onclick="showMainTask('${ID}')">+</button>
                </div>
                <div class="DragContainer">
                  <div class="noTasks" style="display: none">
                    <p>No tasks To do</p>
                  </div>  
                  <div id="C_${ID}">
  
                  </div>
       </div>  
   `;
}


/**
 * Generates a task card HTML element based on the provided parameters.
 *
 * made by Mina Zarkesh
 * @param {number} id - The unique identifier of the task card.
 * @param {string} taskCategory - The category of the task.
 * @param {string} taskTitle - The title of the task.
 * @param {string} taskDescription - The description of the task.
 * @return {string} The generated task card HTML element.
 */
function generateTaskCard(id, taskCategory, taskTitle, taskDescription) {
  return /*html*/ `
          <div
          id="card${id}"
          onclick="openTask(${id})" 
                    class="card"
                    draggable="true"
                    ondragstart="startDragging(this)"
                  >

                  <div id="moveTo${id}" class="popUpToMoveCard">
                    <span style="margin-bottom: 5px; font-weight: bold;">Move to ...</span>
                    <span class="onHoverPopUp" onclick="moveToToDo(${id})">To do</span>
                    <span class="onHoverPopUp" onclick="moveToInProgress(${id})">in Progress</span>
                    <span class="onHoverPopUp" onclick="moveToAwaitFeedback(${id})">Await feedback</span>
                    <span class="onHoverPopUp" onclick="moveToDone(${id})">Done</span>
                  </div>

                    <div id="cardCategory${id}" class="cardCategory user-story">
                      <span>${taskCategory}</span>
                    </div>
                    <div class="cardTitel">
                      <p class="titelDiv">${taskTitle}</p>
                    </div>
                    <div class="cardDescription">
                    ${taskDescription}
                    </div>
                   <div id="progressBar${id}" class="progressBar">
                   </div>
                    <div id="priority" class="badgeAndPriorityDiv">
                    <div class="profile-badges" id="profileBadges${id}">
                    </div>
                    <div id="priorityImg${id}">
  
                    </div>
                      </div>
                    </div>
                  </div>
    `;
}


/**
 * Generate a profile badge with the given color and name tag.
 * made by Mina Zarkesh
 * 
 * @param {string} taskassignedToColor - The color of the profile badge.
 * @param {string} taskassignedToNameTag - The name tag to be displayed on the profile badge.
 * @return {string} The HTML code for the profile badge.
 */
function generateProfileBadge(taskassignedToColor, taskassignedToNameTag) {
  return /*html*/ `
    <div class="profile-badge" style="background-color: var(${taskassignedToColor});">
          <span>${taskassignedToNameTag}</span>
        </div>
  `;
}


/**
 * Generates an open profile badge with a given contact name, tag, and color.
 * made by Mina Zarkesh
 * @param {string} openTaskContactName - The name of the contact.
 * @param {string} openTaskContactNameTag - The tag of the contact.
 * @param {string} openTaskContactColor - The color of the badge.
 * @return {string} The generated HTML for the open profile badge.
 */
function generateOpenProfileBadgeWithName(
  openTaskContactName,
  openTaskContactNameTag,
  openTaskContactColor
) {
  return /*html*/ `
       <div class="assignetNames">
          <div class="profile-badge" style="background-color: var(${openTaskContactColor});">
              <span>${openTaskContactNameTag}</span>
          </div>
          <div class="contact-frame">
              <span class="contact-frame-name">${openTaskContactName}</span>
          </div>
          </div>
    `;
}


/**
 * Generates a division element for a subtask.
 * made by Mina Zarkesh
 * @param {string} subtask - The subtask to display in the division element.
 * @param {number} i - The index of the subtask.
 * @return {string} The HTML code for the division element.
 */
function generateSubtaskDiv(subtask, i) {
  return /*html*/ `
       <li><div class="listitem">${subtask}<div class="row"><img onclick="editSubtask(${i})" src="../assets/img/edit.png"><div  id="Board_line${i}" class="line"></div><img onclick="deleteSubtask(${i})" src="../assets/img/delete.png"></div></div></li>
    `;
}


/**
 * Generates a division element for a subtask.
 * made by Mina Zarkesh
 * @param {string} subtask - The subtask to display in the division element.
 * @param {number} i - The index of the subtask.
 * @return {string} The HTML code for the division element.
 */
function add_generateSubtaskDiv(subtask, i) {
  return /*html*/ `
       <li><div class="listitem">${subtask}<div class="row"><img onclick="add_editSubtask(${i})" src="../assets/img/edit.png"><div  id="Board_line${i}" class="line"></div><img onclick="add_deleteSubtask(${i})" src="../assets/img/delete.png"></div></div></li>
    `;
}


/**
 * Generates an HTML string for an open subtask div.
 * made by Mina Zarkesh
 * @param {number} index - The index of the open subtask div.
 * @param {string} openSubtask - The open subtask string.
 * @param {number} i - The loop index.
 * @return {string} The generated HTML string for the open subtask div.
 */
function generateOpenSubtaskDiv(index, openSubtask, i) {
  return /*html*/ `
         <div>
            <input id="confirm${i}" type="checkbox" onclick="toggleSubtaskschecked(${index},${i})"/>
            <label for="confirm${i}">${openSubtask}</label>
          </div>
    `;
}


/**
 * Generates the HTML code for editing a task.
 * made by Mina Zarkesh
 *
 * @param {Object} editedTask - The edited task object.
 * @param {number} index - The index of the task in the list.
 * @return {string} The HTML code for editing the task.
 */
function generateEditTask(editedTask, index) {
  return /*html*/ `
    <div class="cardOpen ">
      <div class="taskOpen" style="justify-content: flex-end">
          <button  onclick="closeOpenTask()"><img src="../assets/img/close.png" alt="X"></button>
          </div>
        <form id="formID1" onsubmit="editTask(${index}); return false">
          <div class="inputTitle">
            <input
              class="taskTitle taskTitleEdit"
              id="taskTitle"
              required
              type="text"
              placeholder="Enter a title"
              value="${editedTask.title}"
            />
            <div class="seperator"></div>
          </div>
  
          <div class="input_fields">
            <h3>Description</h3>
            <textarea
              id="description"
              required
              cols="45"
              class="descriptionArea"
              type="text"
              placeholder="Enter a Description"
            >${editedTask.description}</textarea>
          </div>
  
          <div class="input_fields">
            <h3>Due date</h3>
            <input
              id="date"
              required
              class="input_field input_fieldsEdit font_size_19px"
              type="date"
              placeholder="dd/mm/yyyy"
              value="${editedTask.date}"/>
            <div class="seperator"></div>
          </div>
          <div class="input_fields">
            <h3>Priority</h3>
            <div class="priorityAddTask" style="display: flex; height: 45px">
              <button
                type="button"
                onclick="changePriority(this)"
                id="urgent"
                class="custom-container"
                name="Urgent"
              >
                Urgent
                <img class="priorityIMGs" src="../assets/img/urgentImg.png" />
              </button>
              <button
                type="button"
                onclick="changePriority(this)"
                id="medium"
                name="Medium"
                class="custom-container"
              >
                Medium
                <img class="priorityIMGs" src="../assets/img/medium.png" />
              </button>
              <button
                type="button"
                onclick="changePriority(this)"
                id="low"
                class="custom-container"
                name="Low"
              >
                Low
                <img class="priorityIMGs" src="../assets/img/low.png" />
              </button>
            </div>
          </div>
  
          <div id="asgnt" class="input_fields">
            <h3>Assigned to</h3>
            <div class="input-row">
              <input
                id="assignetToInput"
                onkeyup="filterContacts();"
                class="input_field input_fieldsEdit font_size_19px placeholder"
                type="text"
                placeholder="Assigned to"
              />
              <div class="backgroundForImg" onclick="dropDownContacts()">
                <img id="assignetToImg" src="../assets/img/arrow_drop_down.png" />
              </div>
            </div>
            <div id="assignetTo" class="assignetTo scroll d-none"></div>
          </div>
  
          <div id="assignetToProfile-badges"></div>
  
          <div class="input_fields">
            <h3>Category</h3>
            <select required id="category">
              <option value=-1 disabled selected>Select Task Category</option>
              <option value=0>User Story</option>
              <option value=1>Technical Task</option>
            </select>
          </div>
  
          <div class="input_fields">
            <h3>Subtasks</h3>
            <div class="input-row">
              <input
                id="subtasks_input"
                class="input_field input_fieldsEdit font_size_19px placeholder"
                type="text"
                placeholder="Add new subtask"
                onclick="changeSubtasksImgs()"
              />
              <img
                id="Board_subtasksImg-plus"
                class="corner_image"
                src="../assets/img/+.png"
              />
              <img
                id="Board_subtasksImg-close"
                class="corner_image d-none"
                src="../assets/img/close.png"
                onclick="clearSubtasksInput()"
              />
              <div id="Board_line" class="line d-none"></div>
              <img onclick="renderSubtask()"
                id="Board_subtasksImg-check"
                class="corner_image d-none"
                src="../assets/img/check.png"
              />
            </div>
          </div>
    
          <div id="subtasksDiv">
          </div>
  
          <div class="blueButton">
            <button type="onsubmit" id="board-add_task-createTask">
              ok
            </button>
          </div>
          </div>
        </form>
        </div>
    `;
}