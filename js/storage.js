/**
 * The token used for remote storage authentication.
 * @type {string}
 */
const STORAGE_TOKEN = "848MSA6HLK28ZES60D4LDV7DSIDBDOSA4TSPOBAX";


/**
 * The URL for remote storage.
 * @type {string}
 */
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";


/**
 * Sets a key-value pair in remote storage.
 *
 * This function sends a POST request to the remote storage URL with the provided key and value.
 *
 * @param {string} key - The key for the data.
 * @param {any} value - The value to be stored.
 * @returns {Promise<Object>} - A Promise that resolves to the response data.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {
        method: "POST",
        body: JSON.stringify(payload),
    }).then((res) => res.json());
}


/**
 * Retrieves an item from the storage based on the given key.
 *
 * @param {string} key - The key of the item to retrieve.
 * @return {Promise<any>} A promise that resolves to the value of the retrieved item.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            if (res.data) {
                return res.data.value;
            }
            throw `Could not find data with key "${key}".`;
        });
}


/**
 * Asynchronously includes HTML content  (header) into the current document.
 *
 * @return {Promise<void>} Promise that resolves when all HTML content has been included.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
}


let user = [];
let users = [];
let index = 0;
let contact = [];
let contacts = [];
let contactIndex;
let task = [];
let tasks = [];
let taskIndex;


/**
 * Loads users from the database at the specified index.
 * made by Mina Zarkesh
 * @param {number} index - The index of the user to load.
 * @return {Array} - An array containing all the users and the user at the specified index.
 */
async function loadUsers(index) {
    if (!index) {
        index = 0;
    }
    users = JSON.parse(await getItem("users"));
    user = users[index];
    return users, user, index;
}


/**
 * Loads contacts from the specified index.
 * made by Mina Zarkesh
 * @param {number} index - The index of the contact to load.
 * @return {Array} contacts - The array of loaded contacts.
 * @return {Object} contact - The loaded contact at the specified index.
 * @return {number} contactIndex - The index of the loaded contact.
 */
async function loadContacts(index) {
    contacts = JSON.parse(await getItem("contacts"));
    contact = contacts[index];
    return { contacts, contact, index };
}


/**
 * Loads tasks from storage and returns the specified task and its index.
 * made by Mina Zarkesh
 * 
 * @param {number} index - The index of the task to retrieve.
 * @return {Array} - An array containing all the tasks, the specified task, and its index.
 */
async function loadTasks(index) {
    tasks = JSON.parse(await getItem("tasks"));
    task = tasks[index];
    return tasks, task, taskIndex;
}


let backgroundcolors = ["--default", "--variant02", "--variant03", "--variant04", "--variant05", "--variant06", "--variant07", "--variant08", "--variant09", "--variant10", "--variant11", "--variant12", "--variant13", "--variant14", "--variant15", "--variant16"];


/**
 * Generates a random color from the 'backgroundcolors' array and returns it.
 * made by Mina Zarkesh
 * 
 * @return {string} The randomly generated color.
 */
function setRandomColor() {
    let randomNumber = Math.floor(Math.random() * backgroundcolors.length);
    let color = backgroundcolors[randomNumber];
    return color;
}


/**
 * Initializes the application by setting up the necessary components and loading user-specific data.
 * made by Mina Zarkesh
 * 
 * @return {Promise<void>} - A promise that resolves when the initialization is complete.
 */
async function init() {
    index = getCurrentUserVariable();
    await includeHTML();
    await setInitialsInHeader(index);
    await loadContacts(index);
    await loadTasks(index);
    openTasks = tasks;
}


/**
 * Retrieves the current user variable from the URL query string.
 * made by Mina Zarkesh
 * @return {string} The current user variable.
 */
function getCurrentUserVariable() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    return id;
}


/**
 * Sets the initials in the header based on the given index.
 * made by Mina Zarkesh
 * 
 * @param {number} index - The index to retrieve the user variable from.
 * @return {Promise} A promise that resolves when the function is complete.
 */
async function setInitialsInHeader(index) {

    await loadUsers(index);
    let content = document.getElementById('loginname');
    content.innerHTML = /*html*/ `
  ${user.nameTag} 
 `
}


/**
 * Checks the index and redirects the user to a specific link.
 * made by Mina Zarkesh
 * 
 * @param {string} link - The link to redirect the user to.
 * @return {undefined} This function does not return a value.
 */
function checkIndex(link) {
    index = getCurrentUserVariable();
    if (index === null) {
        index = 0;
    }
    window.location.href = `${link}.html?id=${index}`;
}


/**
 * Generates a name tag based on the given name.
 * made by Mina Zarkesh
 * @param {string} name - The name to generate the name tag from.
 * @return {string} The generated name tag.
 */
/**TODO upperCase */
function createNameTag(name) {
    let currentName = name;
    let nameArray = currentName.split(" ");
    let nameTag = nameArray[0].charAt(0);
    nameTag += nameArray[nameArray.length - 1].charAt(0);
    return nameTag;
}


/**
 * header
 * Toggles the menu content display based on its current state.
 *
 * @return {undefined} No return value.
 */
function toggleMenu() {
    let menuContent = document.getElementById("menuContent");

    if (menuContent.style.display === "block") {
        menuContent.style.display = "none";
    } else {
        menuContent.style.display = "block";
    }

    if (window.innerWidth <= 550) {
        menuContent.innerHTML = `
      <a href="../html/help.html">Help</a>
      <a target="_blank" rel="noopener noreferrer" href="../html/LegalNotice.html">Legal noticee</a>
      <a target="_blank" rel="noopener noreferrer" href="../html/PrivacyPolicy.html">Privacy Policy</a>
      <a href="..\html\index.html">Log Out</a>`
    }
    event.stopPropagation();
}


function eventListenerForMenuContent(id) {
    document.getElementById(id).addEventListener('click', function (event) {
      let menuContent = document.getElementById('menuContent')
      if (menuContent.style.display == "block") {
          menuContent.style.display = "none"
      }
    });
  }


/**
 * Creates an array of tasks for Backup
 */
let oldTasks = [{
    container: "toDo",
    category: "User Story",
    title: "Kochwelt Page & Recipe Recommender",
    description: "Build start page with recipe recommendation.",
    date: "2023-08-23",
    priority: "Medium",
    priorityImg: "../assets/img/medium.png",
    assignedTo: ["Emmanuel Mauer", "Marcel Bauer", "Anton Mayer"],
    assignedToNameTag: ["EM", "MB", "AM"],
    assignedToColor: ["--variant10", "--variant16", "--variant09"],
    subtasks: ["Implement Recipe Recommendation", "Start Page Layout"],
    subtaskschecked: ["checked", "checked"]
},
{
    container: "awaitFeedback",
    category: "Technical Task",
    title: "Titel: Essen",
    description: "Das ist die Description, hier etwas text : handy telefonieren",
    date: "2023-08-23",
    priority: "Urgent",
    priorityImg: "../assets/img/urgentImg.png",
    assignedTo: ["Marcel Bauer", "Anton Mayer", "Emmanuel Mauer"],
    assignedToNameTag: ["MB", "AM", "EM"],
    assignedToColor: ["--variant16", "--variant09", "--variant10"],
    subtasks: ["Subtask1", "Start Page Layout"],
    subtaskschecked: ["checked", "unchecked"]
},
{
    container: "awaitFeedback",
    category: "Development",
    title: "Titel: Essen",
    description: "Das ist die Description, hier etwas text : handy telefonieren",
    date: "2023-12-30",
    priority: "Low",
    priorityImg: "../assets/img/low.png",
    assignedTo: ["Marcel Bauer", "Anton Mayer", "Emmanuel Mauer"],
    assignedToNameTag: ["MB", "AM", "EM"],
    assignedToColor: ["--variant16", "--variant09", "--variant10"],
    subtasks: ["Start Page Layout", "Subtask2"],
    subtaskschecked: ["unchecked", "unchecked"]
},
{
    container: "inProgress",
    category: "Marketing",
    title: "Titel: Halloweenparty",
    description: "Das ist die Description, hier etwas text : handy telefonieren",
    date: "2023-10-31",
    priority: "Urgent",
    priorityImg: "../assets/img/urgentImg.png",
    assignedTo: ["Marcel Bauer", "Anton Mayer", "Emmanuel Mauer"],
    assignedToNameTag: ["MB", "AM", "EM"],
    assignedToColor: ["--variant16", "--variant09", "--variant10"],
    subtasks: ["Start Page Layout", "Subtask3"],
    subtaskschecked: ["unchecked", "checked"]
},
{
    container: "done",
    category: "Technical Task",
    title: "Titel: Sommer Grillparty",
    description: "Wir treffen uns alle zur Grillparty",
    date: "2023-07-27",
    priority: "Low",
    priorityImg: "../assets/img/low.png",
    assignedTo: ["Marcel Bauer", "Anton Mayer", "Emmanuel Mauer"],
    assignedToNameTag: ["MB", "AM", "EM"],
    assignedToColor: ["--variant16", "--variant09", "--variant10"],
    subtasks: ["Grill aufstellen", "Spaß haben"],
    subtaskschecked: ["checked", "checked"]
}
];

let openTasks = oldTasks;


/**
 * Creates an array of contacts for Backup
 */
let oldContacts = [{
    name: "Anton Mayer",
    color: "--variant09",
    mail: "antom@gmail.com",
    phone: "49-123-123",
    nameTag: "AM",
},
{
    name: "Anja Schulz",
    color: "--variant13",
    mail: "schulz@hotmail.com",
    phone: "49-123-123",
    nameTag: "AS",
},
{
    name: "Benedikt Ziegler",
    color: "--default",
    mail: "benedikt@gmail.com",
    phone: "49-123-123",
    nameTag: "BZ",
},
{
    name: "David Eisenberg",
    color: "--variant14",
    mail: "davidberg@gmail.com",
    phone: "49-123-123",
    nameTag: "DE",
},
{
    name: "Eva Fischer",
    color: "--variant06",
    mail: "eva@gmail.com",
    phone: "49-222-222",
    nameTag: "EF",
},
{
    name: "Emmanuel Mauer",
    color: "--variant10",
    mail: "emmanuelma@gmail.com",
    phone: "49-222-222",
    nameTag: "EM",
},
{
    name: "Marcel Bauer",
    color: "--variant16",
    mail: "bauer@gmail.com",
    phone: "49-222-222",
    nameTag: "MB",
},
{
    name: "Tatjana Wolf",
    color: "--variant15",
    mail: "wolf@gmail.com",
    phone: "49-222-222",
    nameTag: "TW",
},
{
    name: "Sofia Müller",
    color: "--variant04",
    mail: "sofiam@gmail.com",
    phone: "49-222-222",
    nameTag: "SM",
},
];


/**
 * Creates an array of letters german alphabet
 */
let alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Ä",
    "Ö",
    "Ü",
];

let letters = [];
let contactArray = [];