/**
 * Generates an HTML string representing an open task card.
 * made by: Mina Zarkesh
 *
 * @param {number} id - The ID of the task.
 * @param {string} openCategory - The category of the task.
 * @param {string} openTitle - The title of the task.
 * @param {string} openDescription - The description of the task.
 * @param {string} openDate - The due date of the task.
 * @param {string} openPriority - The priority of the task.
 * @param {string} openPriorityImg - The image URL for the priority icon.
 * @return {string} The HTML string representing the open task card.
 */
function generateOpenTask(
    id,
    openCategory,
    openTitle,
    openDescription,
    openDate,
    openPriority,
    openPriorityImg
  ) {
    return /*html*/ `
        <div class="cardOpen">
          <div class="taskOpen">
            <span>${openCategory}</span>
             <button onclick="closeOpenTask()"><img src="../assets/img/close.png" alt=""></button></div>
          <div class="titelOpen createScrollBehaviorY">
            <h1>${openTitle}</h1>
          </div>
  
          <div class="descriptionOpen createScrollBehaviorY">
            <span>${openDescription}</span>
          </div>
          <div class="datumOpen">
            <h3>Due date:</h3>
            <span>${openDate}</span>
          </div>
          <div class="priorityOpen">
            <h3>Priority:</h3>
            <span>${openPriority}</span> <div><img src="${openPriorityImg}"></div>
          </div>
          <div class="assignetToOpen">
            <h3>Assigned To:</h3>
            <div id="openAssignetTo"></div>
          <div class="suptasksOpen">
            <h3>Subtasks</h3>
            <div id="openSubtasksDiv">
            </div>
          </div>
          <div class="deletAndEditOpen">
            <button onclick="deleteTask(${id});"><img src="../assets/img/delete.png" alt="" />Delete</button>
            <div class="BTNMIddle"></div>
            <button onclick="showEditTask(${id});"><img src="../assets/img/edit.png" alt="" />Edit</button>
          </div>
        </div>
      `;
  }
  
  
  /**
   * Generates a HTML string for the add task form.
   * made by Mina Zarkesh
   *
   * @return {string} The generated HTML string.
   */
  function generateAddTask(nameOfColumn) {
    return /*html*/ `
         <div class="closeDiv">
            <h1>Add Task</h1>
            <div class="closeDivMobile">
            <button onclick="closeMainTask()">X</button>
            </div>
          </div>
          <form id="add-formID" onsubmit="add_createTask(); return false" data-column="${nameOfColumn}">
            <div class="inputTitle">
              <input
                class="taskTitle"
                id="add-taskTitle"
                required
                type="text"
                placeholder="Enter a title"
              />
              <div class="seperator"></div>
            </div>
    
            <div class="input_fields">
              <h3>Description</h3>
              <textarea
                id="add-description"
                required
                cols="45"
                class="descriptionArea"
                type="text"
                placeholder="Enter a Description"
              ></textarea>
            </div>
    
            <div class="input_fields">
              <h3>Due date</h3>
              <input
                id="add-date"
                required
                class="input_field font_size_19px"
                type="date"
                placeholder="dd/mm/yyyy"
              />
              <div class="seperator"></div>
            </div>
    
            <div class="input_fields">
              <h3>Priority</h3>
              <div class="priorityAddTask" style="display: flex; height: 45px">
                <button
                  type="button"
                  onclick="changePriority_Add(this)"
                  id="add-urgent"
                  class="custom-container"
                  name="Urgent"
                >
                  Urgent
                  <img src="../assets/img/urgentImg.png" />
                </button>
                <button
                  type="button"
                  onclick="changePriority_Add(this)"
                  id="add-medium"
                  name="Medium"
                  class="custom-container"
                >
                  Medium
                  <img style="margin-left: 10px" src="../assets/img/medium.png" />
                </button>
                <button
                  type="button"
                  onclick="changePriority_Add(this)"
                  id="add-low"
                  class="custom-container"
                  name="Low"
                >
                  Low
                  <img style="margin-left: 10px" src="../assets/img/low.png" />
                </button>
              </div>
            </div>
    
            <div id="assignedTo1" class="input_fields">
              <h3>Assigned to</h3>
              <div class="input-row">
                <input
                  id="add-assignetToInput"
                  onkeypress="add_dropDownContacts();"
                  class="input_field font_size_19px placeholder"
                  type="text"
                  placeholder="Assigned to"
                />
                <div class="backgroundForImg" onclick="add_dropUpContacts()">
                  <img id="add-assignetToImg" src="../assets/img/arrow_drop_down.png" />
                </div>
              </div>
              <div id="add-assignetTo" class="assignetTo scroll d-none"></div>
            </div>
    
            <div id="add-assignetToProfile-badges"></div>
    
            <div class="input_fields">
              <h3>Category</h3>
              <select required id="add-category">
              <option value=-1 disabled selected>Select Task Category</option>
                <option value=0>User Story</option>
                <option value=1>Technical Task</option>
              </select>
            </div>
    
            <div class="input_fields">
              <h3>Subtasks</h3>
              <div class="input-row">
                <input
                  id="add-subtasks_input"
                  class="input_field font_size_19px placeholder"
                  type="text"
                  placeholder="Add new subtask"
                  onclick="add_changeSubtasksImgs()"
                />
                <img
                  id="add-Board_subtasksImg-plus"
                  class="corner_image"
                  src="../assets/img/+.png"
                />
                <img
                  id="add-Board_subtasksImg-close"
                  class="corner_image d-none"
                  src="../assets/img/close.png"
                  onclick="add_clearSubtasksInput()"
                />
                <div id="add-Board_line" class="line d-none"></div>
                <img onclick="add_renderSubtask()"
                  id="add-Board_subtasksImg-check"
                  class="corner_image d-none"
                  src="../assets/img/check.png"
                />
              </div>
            </div>
    
            <div id="add-subtasksDiv">
            </div>
  
            <div id="add-parentDivCreateTask" class="add_task_create_div button">
              <button id="add-board-add_task-createTask">
                Create Task
              </button>
            </div>
    
          </form>
      `;
  }
  
  
  /**
   * Generate a HTML element for assigning a contact to a task.
   *
   * @param {object} contact - The contact object.
   * @param {number} i - The index of the contact.
   * @return {string} The generated HTML element.
   * made by Mina Zarkesh
   */
  function generateAssignetTo(contact, i) {
    return /*html*/ `
        <div id="assignetToAddTask${i}" class="assignetToAddTask heWhoMustNotBeNamed" onclick="chooseContact(${i})">
        <div class="addTasksContactFrame">
        <div class="profile-badge" style="background-color: var(${contact.color});">
            <span >${contact.nameTag}</span>
          </div>
          <span class="contactName">${contact.name}</span>
        </div>
        <img id="checkContactImg${i}" src="../assets/img/checket.png" alt="">
        </div>
      `;
  }
  
  
  /**
   * Generate a HTML element for assigning a contact to a task.
   *
   * @param {object} contact - The contact object.
   * @param {number} i - The index of the contact.
   * @return {string} The generated HTML element.
   * made by Mina Zarkesh
   */
  function add_generateAssignetTo(contact, i) {
    return /*html*/ `
        <div id="add-assignetToAddTask${i}" class="assignetToAddTask heWhoMustNotBeNamed" onclick="add_chooseContact(${i})">
        <div class="addTasksContactFrame">
        <div class="profile-badge" style="background-color: var(${contact.color});">
            <span >${contact.nameTag}</span>
          </div>
          <span class="contactName">${contact.name}</span>
        </div>
        <img id="add-checkContactImg${i}" src="../assets/img/checket.png" alt="">
        </div>
      `;
  }