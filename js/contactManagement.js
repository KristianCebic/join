let isContactchosenArray = [];
let ContactChosenDiv = [];


/**
 * Drops down the contacts when the assignetTo element is clicked.
 * made by Mina Zarkesh
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function dropDownContacts() {
  let content = document.getElementById("assignetTo");
  let imageSrc = document.getElementById("assignetToImg");

  if (imageSrc.src.slice(-8) === "down.png") {
    imageSrc.src = "../assets/img/arrow_up.png";
    content.style.display = "flex";
  } else {
    imageSrc.src = "../assets/img/arrow_drop_down.png";
    content.style.display = "none";
  }
  filterContacts();
}


/**
 * Drops down the contacts when the assignetTo element is clicked.
 * made by Mina Zarkesh
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function add_dropDownContacts() {
  let content = document.getElementById("add-assignetTo");
  let imageSrc = document.getElementById("add-assignetToImg");

  if (imageSrc.src.slice(-8) === "down.png") {
    imageSrc.src = "../assets/img/arrow_up.png";
    content.style.display = "flex";
  }
  add_filterContacts();
}


/**
 * Drops down the contacts when the assignetTo element is clicked.
 * made by Mina Zarkesh
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function add_dropUpContacts() {
  let content = document.getElementById("add-assignetTo");
  let imageSrc = document.getElementById("add-assignetToImg");

  if (imageSrc.src.slice(-8) === "down.png") {
    imageSrc.src = "../assets/img/arrow_up.png";
    content.style.display = "flex";
  } else {
    imageSrc.src = "../assets/img/arrow_drop_down.png";
    content.style.display = "none";
  }
  add_filterContacts();
}


/**
 * Creates a contact chosen array with the same length as the contacts array,
 * initializing all elements to false.
 * made by Mina Zarkesh
 *
 * @param {Array} contacts - The array of contacts.
 * @return {Array} - The contact chosen array.
 */
function createContactChosen() {
  for (let i = 0; i < contacts.length; i++) {
    isContactchosenArray.push(false);
  }
}


/**
 * Choose a contact based on the given index.
 * made by Mina Zarkesh
 *
 * @param {number} index - The index of the contact to choose.
 * @return {undefined} - This function does not return any value.
 */
function chooseContact(index) {
  let isContactchosen = isContactchosenArray[index];
  let content = document.getElementById("assignetToAddTask" + index);
  let CheckImg = document.getElementById("checkContactImg" + index);

  if (!isContactchosen) {
    CheckImg.src = "../assets/img/box-white.png";

    if (!content.classList.contains("chosenOne")) {
      content.classList.add("chosenOne");
    }
    if (content.classList.contains("heWhoMustNotBeNamed")) {
      content.classList.remove("heWhoMustNotBeNamed");
    }
    isContactchosen = true;
  } else {
    content.classList.remove("chosenOne");
    content.classList.add("heWhoMustNotBeNamed");
    isContactchosen = false;
    CheckImg.src = "../assets/img/checket.png";
  }
  isContactchosenArray[index] = isContactchosen;
  renderAssignetToProfileBadges(index);
}


/**
 * Choose a contact based on the given index.
 * made by Mina Zarkesh
 *
 * @param {number} index - The index of the contact to choose.
 * @return {undefined} - This function does not return any value.
 */
function add_chooseContact(index) {
  let isContactchosen = isContactchosenArray[index];
  let content = document.getElementById("add-assignetToAddTask" + index);
  let CheckImg = document.getElementById("add-checkContactImg" + index);

  if (!isContactchosen) {
    CheckImg.src = "../assets/img/box-white.png";

    if (!content.classList.contains("chosenOne")) {
      content.classList.add("chosenOne");
    }
    if (content.classList.contains("heWhoMustNotBeNamed")) {
      content.classList.remove("heWhoMustNotBeNamed");
    }
    isContactchosen = true;
  } else {
    content.classList.remove("chosenOne");
    content.classList.add("heWhoMustNotBeNamed");
    isContactchosen = false;
    CheckImg.src = "../assets/img/checket.png";
  }
  isContactchosenArray[index] = isContactchosen;
  add_renderAssignetToProfileBadges(index);
}


/**
 * Renders assigned badges to the profile.
 * made by Mina Zarkesh
 * @param {number} index - The index of the assigned badge.
 * @return {undefined} This function does not return a value.
 */
function renderAssignetToProfileBadges(index) {
  let isContactchosen = isContactchosenArray[index];
  contact = contacts[index];
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

  let content = document.getElementById("assignetToProfile-badges");
  content.innerHTML = "";
  for (let i = 0; i < ContactChosenDiv.length; i++) {
    const element = ContactChosenDiv[i];
    content.innerHTML += generateProfileBadge(element.color, element.nameTag);
  }
}


/**
 * Renders assigned badges to the profile.
 * made by Mina Zarkesh
 * @param {number} index - The index of the assigned badge.
 * @return {undefined} This function does not return a value.
 */
function add_renderAssignetToProfileBadges(index) {
  let isContactchosen = isContactchosenArray[index];
  contact = contacts[index];
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

  let content = document.getElementById("add-assignetToProfile-badges");
  content.innerHTML = "";
  for (let i = 0; i < ContactChosenDiv.length; i++) {
    const element = ContactChosenDiv[i];
    content.innerHTML += add_generateProfileBadge(element.color, element.nameTag);
  }
}


/**
 * Resets the subtasks board and the contact chosen array to their default states.
 * This function clears the 'subTasksBoard' array and iterates over the 'isContactchosenArray',
 * setting each element to false. It is typically used to reset the state of these arrays,
 * for instance, when initializing or resetting a task-related form or component.
 *
 * @return {void}
 */
function setOnDefault() {
  subTasksBoard = []
  for (let index = 0; index < isContactchosenArray.length; index++) {
    isContactchosenArray[index] = false;
  }
}