/**
 * This function checks whether the container with the ID "choosedContacts" contains any badges
 */
function checkIfContainerHasBadges() {
  let content = document.getElementById("choosedContacts");
  if (content.innerHTML === "") {
    content.style.display = "none";
  } else {
    content.style.display = "flex";
  }
}

/**
 * all badges are drawn
 * @param {number} indexNumber - index
 */
function renderBadges(indexNumber) {
  let content = document.getElementById("choosedContacts");
  let isContactchosen = isContactchosenArray[indexNumber];
  contact = contacts[indexNumber];
  if (isContactchosen) {
    if (!ContactChosenDiv.includes(contact)) {
      ContactChosenDiv.push(contact);
    }
  } else {
    if (ContactChosenDiv.includes(contact)) {
      let chosenIndex = ContactChosenDiv.indexOf(contact);
      ContactChosenDiv.splice(chosenIndex, 1);
    } else {
      console.log(
        "renderAssignetToProfileBadges: Fehler: isContactChosen ist " +
        isContactchosen
      );
    }
  }
  content.style.marginTop = "5px";
  content.innerHTML = "";
  for (let i = 0; i < ContactChosenDiv.length; i++) {
    const element = ContactChosenDiv[i];
    content.innerHTML += generateProfileBadge(element.color, element.nameTag);
  }
}

/**
 * Generates HTML for a profile badge.
 *
 * This function creates a profile badge with a custom background color and a name tag. 
 * The color and the name tag are provided as parameters. The color is expected to be a CSS variable name, 
 * and the name tag is a string that will be displayed inside the badge.
 *
 * @param {string} taskassignedToColor - The CSS variable name for the background color of the badge.
 * @param {string} taskassignedToNameTag - The text to be displayed in the badge as a name tag.
 * @returns {string} HTML string representing the profile badge.
 *
 * @example
 * // Generates a profile badge with a blue background and the name 'John Doe'
 * generateProfileBadge('--blue', 'John Doe');
 */
function generateProfileBadge(taskassignedToColor, taskassignedToNameTag) {
  return /*html*/ `
      <div class="profile-badge" style="background-color: var(${taskassignedToColor});">
            <span>${taskassignedToNameTag}</span>
          </div>
    `;
}

/**
 * After a contact is selected, the name is saved into an array
 * @param {string} id - First name and last name of contact
 */
function addNameToArray(id) {
  let addedName = document.getElementById(id).textContent;
  if (!addedContacts.includes(addedName)) {
    addedContacts.push(addedName);
  } else {
    const index = addedContacts.indexOf(addedName);
    addedContacts.splice(index, 1);
  }
}

/**
 * replaces the unclicked box with a clicked img element in the contact div
 * @param {*} id - represents id of a button of each contact
 */
function changeButton(id) {
  const button = document.getElementById(id);

  if (!containerStatesForButtons[id]) {
    button.src = "../assets/img/box.png";
    button.style.filter = "brightness(10)";
    containerStatesForButtons[id] = true;
  } else {
    button.src = "../assets/img/Check button.png";
    button.style.filter = "none";
    containerStatesForButtons[id] = false;
  }
}

/**
 * the options Technical Task and User story in the Category div are displayed
 */
function showOptions() {
  let select = document.getElementById("select");
  let img = document.getElementById("dropDown2");

  if (showedOptions === false) {
    select.style.display = "";
    img.src = `../assets/img/arrow_up.png`;
    showedOptions = true;
  } else {
    select.style.display = "none";
    img.src = `../assets/img/arrow_drop_down.png`;
    showedOptions = false;
  }
}

/**
 * One of both texts (Technical Task) or (User Story) are displayed in the category div
 */
function technicalTask() {
  category = "Technical Task";
  let technicalTask = document.getElementById("select");
  technicalTask.style.display = "none";
  let selectTaskCategoryDiv = document.getElementById("SelectTaskCategoryDiv");
  selectTaskCategoryDiv.value = `Technical Task`;
  document.getElementById("dropDown2").src =
    "../assets/img/arrow_drop_down.png";
  showedOptions = false;
}

/**
 * Handles the selection of 'User Story' in a task category dropdown.
 *
 * This function is designed to be called when a user selects 'User Story' as a category 
 * from a dropdown menu in a task management application. It sets the category to "User Story", 
 * hides the user story selection element, updates the value of the 'SelectTaskCategoryDiv' element 
 * to 'User Story', and changes the source of the 'dropDown2' image to indicate that a selection has been made.
 *
 * Assumes that there are elements with specific IDs ('select', 'SelectTaskCategoryDiv', 'dropDown2') 
 * and a specific asset path ('../assets/img/arrow_drop_down.png') present in the DOM.
 *
 * This function does not take any parameters and does not return any value.
 *
 * Note: This function directly manipulates the DOM and relies on global variables.
 */
function userStory() {
  category = "User Story";
  showedOptions = false;
  let userStory = document.getElementById("select");
  userStory.style.display = "none";
  let selectTaskCategoryDiv = document.getElementById("SelectTaskCategoryDiv");
  selectTaskCategoryDiv.value = `User Story`;
  document.getElementById("dropDown2").src =
    "../assets/img/arrow_drop_down.png";
}

/**
 * takes the div container with the ID "cornerImages" and displays the + sign again
 */
function setDefault() {
  clearInput();
  document.getElementById("cornerImages").innerHTML = `
    <img onclick="addSubtask()" class="corner_image" style="height: 12px; width: 12px;" src="../assets/img/+.png">
    `;
}

/**
 * takes the container with the id cornerImages again and saves there a new div with 2 images (X & a hack)
 */
function addSubtask() {
  document.getElementById("cornerImages").innerHTML = `
    <div class="xAndHacken">
      <img id="hoverElement1" class="corner_image2" onclick="clearInput(), setDefault()" src="../assets/img/close.png">
      <div class="line"></div>
      <img id="hoverElement2" class="corner_image2" onclick="createDivWithNewSubtask(), setDefault()" src="../assets/img/check.png">
    </div>
    `;
}

/**
 * takes the input element with the ID special_placeholder and empties its contents
 */
function clearInput() {
  let inputField = document.getElementById("special_placeholder");
  inputField.value = "";
}

function generateMainDiv() {
  let mainDiv = document.createElement("div");
  mainDiv.id = `subTask${subTasknumber}`;
  mainDiv.className = "subTaskDivs";
  let contentDiv = document.createElement("div");
  contentDiv.style.display = "flex";
  contentDiv.style.alignItems = "center";
  return { mainDiv, contentDiv };
}

function generateInput() {
  let inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.style.display = "none";
  inputElement.style.background = "0px center";
  inputElement.style.padding = "0px";
  inputElement.style.outline = "none";
  inputElement.style.border = "none";
  return inputElement;
}

function generateEditAndDeleteDiv() {
  let editAndDeleteDiv = document.createElement("div");
  editAndDeleteDiv.id = `editAndDelete${subTasknumber}`;
  editAndDeleteDiv.style.display = "none";
  editAndDeleteDiv.style.flexDirection = "row";
  editAndDeleteDiv.style.marginRight = "10px";
  return editAndDeleteDiv;
}

function generateEditImg() {
  let editImg = document.createElement("img");
  editImg.id = `editImg${subTasknumber}`;
  editImg.style.cursor = "pointer";
  editImg.src = "../assets/img/edit.png";
  editImg.classList.add("specialBorder");
  return editImg;
}

function generateDeleteImg() {
  let deleteImg = document.createElement("img");
  deleteImg.id = `deleteImg${subTasknumber}`;
  deleteImg.style.cursor = "pointer";
  deleteImg.classList.add("specialBorder");
  deleteImg.src = "../assets/img/delete.png";
  return deleteImg;
}

/**
 * a new subtask is added and saved into an array
 */
function createDivWithNewSubtask() {
  subTaskStatus.push("unchecked");
  let subTaskValue = document.getElementById("special_placeholder").value;
  let subTaskDiv = document.getElementById("Subtasks");
  subTasknumber++;
  subTaskNumberArray.push(`subTask${subTasknumber}`);
  if (subTaskValue != "") {
    let { mainDiv, contentDiv } = generateMainDiv();
    let smallPoint = document.createElement("div");
    smallPoint.className = "smallPoint";
    contentDiv.appendChild(smallPoint);
    let spanElement = document.createElement("span");
    spanElement.innerText = subTaskValue;
    subTasks.push(subTaskValue);
    contentDiv.appendChild(spanElement);
    let inputElement = generateInput();
    contentDiv.appendChild(inputElement);
    mainDiv.appendChild(contentDiv);
    let editAndDeleteDiv = generateEditAndDeleteDiv();
    let editImg = generateEditImg();
    editImg.onclick = (function (id) {
      return function () {
        edit(id);
      };
    })(`subTask${subTasknumber}`);
    editAndDeleteDiv.appendChild(editImg);
    let lineDiv = document.createElement("div");
    lineDiv.className = "line";
    editAndDeleteDiv.appendChild(lineDiv);
    let deleteImg = generateDeleteImg();
    deleteImg.onclick = (function (id) {
      return function () {
        deleteSubtask(id);
      };
    })(`subTask${subTasknumber}`, `editAndDelete${subTasknumber}`);
    editAndDeleteDiv.appendChild(deleteImg);
    mainDiv.appendChild(editAndDeleteDiv);
    subTaskDiv.appendChild(mainDiv);
    mainDiv.addEventListener("mouseover", function () {
      editAndDeleteDiv.style.display = "flex";
    });
    mainDiv.addEventListener("mouseout", function () {
      editAndDeleteDiv.style.display = "none";
    });
    let scrollContainer = document.getElementById('scroll-container2')
    scrollContainer.scrollTop = scrollContainer.scrollHeight
  }
}

/**
 * With this function you can overwrite the old subtask
 * @param {string} id - id of the corresponding div container of the subtask
 */
function edit(id, editAndDeleteContainer) {
  const subTask = document.getElementById(id);
  if (subTask) {
    const spanElement = subTask.querySelector("span");
    const inputElement = subTask.querySelector("input");
    spanElement.style.display = "none";
    inputElement.style.display = "inline";
    inputElement.value = spanElement.textContent;
    inputElement.focus();
    inputElement.addEventListener("blur", function () {
      spanElement.style.display = "inline";
      inputElement.style.display = "none";
      spanElement.textContent = inputElement.value;
      const index = parseInt(id.replace("subTask", "")) - 1;
      subTasks[index] = spanElement.textContent;
    });
  }
}

/**
 * all fields will be deleted after the "Clear x" button has been clicked
 */
function clearFields() {
  window.location.reload();
}

/**
 * the priority buttons will be reloaded
 */
function reloadPriority() {
  let medium = document.getElementById("medium_div");
  let imgMedium = document.getElementById("medium_img");

  medium.style.backgroundColor = "";
  medium.style.color = "";
  imgMedium.classList.remove("image");

  let low = document.getElementById("low_div");
  let imgLow = document.getElementById("low_img");

  low.style.backgroundColor = "";
  low.style.color = "";
  imgLow.classList.remove("image");

  let urgent = document.getElementById("urgent_div");
  let imgUrgent = document.getElementById("urgent_img");

  urgent.style.backgroundColor = "";
  urgent.style.color = "";
  imgUrgent.classList.remove("image");
}

/**
 * This function deletes a subtask as soon as a trash can is clicked
 * @param {string} id - id parameter represents the identification number of the corresponding subtask div
 */
function deleteSubtask(id) {
  const subTask = document.getElementById(id);
  if (subTask) {
    subTask.remove();
  }
}

/**
 * this feature will display the filtered contacts
 */
async function showFilteredContacts() {
  const search = document.getElementById("assignedTo1").value.toLowerCase();
  const img = document.getElementById("arrow1");
  const scrollContainer = document.getElementById("scrollContainer");

  img.src = "../assets/img/arrow_up.png";
  scrollContainer.style.display = "";

  scrollContainer.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name.toLowerCase().includes(search)) {
      let selectedClass = containerStates[`contactPerson${i}`]
        ? "classForContactButtons"
        : "contactDivs";
      let styleClass = containerStates[`contactPerson${i}`]
        ? "styleForContactButtons"
        : "";
      let imgSrc = containerStatesForButtons[`button${i}`]
        ? "../assets/img/box.png"
        : "../assets/img/Check button.png";
      let imgFilter = containerStatesForButtons[`button${i}`]
        ? "brightness(10)"
        : "none";

      scrollContainer.innerHTML += `
                <div style="cursor:pointer; margin-bottom: 0" id="contactPerson${i}" class="${selectedClass} ${styleClass}" onclick="selectContact('contactPerson${i}', 'spanName${i}', 'nameTag${i}', 'nameTagDiv${i}', '${i}'), changeButton('button${i}')">
                    <div id="nameTagDiv${i}" class="circleTag" style="background-color: var(${contacts[i].color})";"><span id="nameTag${i}" style="color: white; font-size: 16px">${contacts[i].nameTag}</span></div> <span id="spanName${i}" style="margin-left: 15px">${contacts[i].name}</span> <img id="button${i}" style="margin-right:15px; filter: ${imgFilter}" src="${imgSrc}">
                </div>
                `;
      document.getElementById("addNewContactButton").style.display = "";
    }
  }
}


/**
 *This function is responsible for redirecting you to the contacts.html page so that you can then call the showAddContact function to create a new contact
 */
function forwardingToAddNewContact() {
  window.location.href = "contacts.html?showAddContact=true";
}