let buttonXcreated = 0;
let selectedContactIndex;


/**
 * Initializes the contacts by calling the init function and rendering the contact list.
 * made by Mina Zarkesh
 * @return {Promise<void>} - A promise that resolves when the contacts are initialized.
 */
async function initContacts() {
  await init();
  renderContactList();
}


/**
 * Displays the selected contact's information on the web page.
 *
 * This function updates HTML elements to show the details of the selected contact
 * and highlights the appearance of the selected contact.
 *
 * @param {number} id - The index of the contact to display.
 * made by Mina Zarkesh
 */
function renderContactRight(id) {
  contact = contacts[id];
  selectedContactIndex = id;
  indexID = contactArray.indexOf(contact);
  let contactsEmail = document.getElementById("contactsEmail");
  let contactName = document.getElementById("contactsName");
  let contactNameTag = document.getElementById("contactsNameTag");
  let contactsPhone = document.getElementById("contactsPhone");
  let contactsColor = document.getElementById("profile-badge");
  let contactFloatingBox = document.getElementById("floating-contact-box");
  let contactboxes = document.querySelectorAll(".contact-box");
  let clickedContactbox = contactboxes[indexID];
  contactFloatingBox.classList.remove("d-none");
  contactName.innerHTML = `${contact.name}`;
  contactNameTag.innerHTML = `${contact.nameTag}`;
  contactsEmail.innerHTML = `${contact.mail}`;
  contactsPhone.innerHTML = `${contact.phone}`;
  contactsColor.style.backgroundColor = `var(${contact.color})`;
  for (let i = 0; i < contactboxes.length; i++) {
    const element = contactboxes[i];
    element.classList.remove("active");
  }
  clickedContactbox.classList.add("active");
  document.getElementById("main-mobile-Overlay").style.display = "flex";
  if (window.innerWidth < 1025) {
    buttonXcreated++
    let elements = document.getElementsByClassName("contacts-list-box");
    if (elements.length > 0) {
        elements[0].style.display = "none";
    }
    if (buttonXcreated == 1) {
      document.getElementById('main-mobile-Overlay').innerHTML += `
        <button id="specialButton" onclick="closeOverlayKontakt()"><img src="../assets/img/close.png" alt="Close Button"></button>
      `;
    }
  }
}


/**
 * Closes the overlay for the contact section in a mobile view.
 * This function selects an element with the ID 'main-mobile-Overlay' and sets its display style to 'none',
 * effectively hiding it. It also checks if any elements with the class 'contacts-list-box' are present,
 * and if so, sets the first element's display style to 'flex', making it visible.
 */
function closeOverlayKontakt() {
  document.getElementById("main-mobile-Overlay").style.display = "none";
  let elements = document.getElementsByClassName("contacts-list-box");
    if (elements.length > 0) {
        elements[0].style.display = "flex";
    }
}


/**
 * Renders and displays a sorted list of contacts grouped by their first letters.
 *
 * This function takes an array of contact objects, sorts them alphabetically by their names,
 * groups them by the first letter of their names, and displays the contacts accordingly on the website.
 * made by Mina Zarkesh
 */
function renderContactList() {
  letters = [];
  contactArray = [];
  contacts = sortContactsAlphabetically(contacts);
  let contactlist = document.getElementById("contact-list");
  contactlist.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let firstLetter = contact.name.charAt(0).toUpperCase();

    if (!letters.includes(firstLetter)) {
      letters.push(firstLetter);
    }
  }
  for (let j = 0; j < letters.length; j++) {
    let contactIndex = alphabet.indexOf(letters[j]);
    contactlist.innerHTML += generateLetterBox(contactIndex, j);
    let keyword = letters[j];
    let searchResult = contacts.filter(
      (contactUser) => contactUser.name.charAt(0).toUpperCase() === keyword
    );
    for (let k = 0; k < searchResult.length; k++) {
      let Celement = searchResult[k];
      let nameIndex = contacts.indexOf(Celement);
      contactArray.push(Celement);
      contactlist.innerHTML += generateContactBox(
        nameIndex,
        Celement.nameTag,
        Celement.name,
        Celement.mail
      );
    }
  }
}


/**
 * Sorts a list of contacts alphabetically by their names.
 * 
 * This function takes an array of contact objects and sorts them in ascending
 * alphabetical order based on the 'name' property. The sorting is case-insensitive.
 * made by Michael Povoa
 * @param {Array} contacts - The array of contact objects to be sorted.
 * @returns {Array} - The sorted array of contact objects.
 */
function sortContactsAlphabetically(contacts) {
  contacts.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return contacts;
}


/**
 * Generates an HTML element representing a letter box.
 *
 * This function creates an HTML element for displaying a letter box on the web page.
 * Letter boxes are used to group contacts alphabetically by their first letters.
 * made by Mina Zarkesh
 * @param {number} contactIndex - The index of the contact in the alphabet array.
 * @param {number} i - The index of the letter in the letters array.
 * @returns {string} - A string containing the HTML code for the generated letter box.
 */
function generateLetterBox(contactIndex, i) {
  return /*html*/ `
    <div class="lettter-box">
  <span id="alphabet${alphabet[contactIndex]}" class="letter">${letters[i]}</span>
</div>
  `;
}


/**
 * Generates an HTML element representing a contact box.
 *
 * This function creates an HTML element to display contact information on the web page.
 * Clicking on the contact box triggers the 'renderContactRight' function to display
 * detailed information about the contact.
 * made by Mina Zarkesh
 *
 * @param {number} id - The unique identifier of the contact.
 * @param {string} nameTag - The name tag of the contact.
 * @param {string} contactName - The name of the contact.
 * @param {string} mail - The email address of the contact.
 * @returns {string} - A string containing the HTML code for the generated contact box.
 */
function generateContactBox(id, nameTag, contactName, mail) {
  return /*html*/ `
  <div class="contact-box" onclick="renderContactRight(${id})">
      <div class="contact-inner-box">
        <div class="profile-badge" style="background-color: var(${contacts[id].color});">
            <span>${nameTag}</span>
        </div>
        <div class="contact-frame">
            <span class="contact-frame-name">${contactName}</span>
            <span class="contact-frame-mail">${mail}</span>
        </div>
      </div>
    </div> 
`;
}


/**
 * Displays the edit contact form.
 *
 * This function replaces the content of the main section on the web page with an edit contact form.
 * It also displays an overlay to focus user interaction on the edit form.
 * made by Mina Zarkesh
 */
function showEditContact() {
  const mainSection = document.getElementById("main_section");
  const overlay = document.getElementById("overlay");
  mainSection.innerHTML = "";
  mainSection.innerHTML = generateEditContact();
  mainSection.style.display = "block";
  overlay.style.display = "block";
  setTimeout(() => {
    mainSection.style.left = "0";
  }, 10);
}


/**
 *
 * Displays the add contact form with a slide-in animation.
 *
 * This function replaces the content of the main section on the web page with an add contact form
 * and uses a slide-in animation to display it.
 * made by Mina Zarkesh
 */
function showAddContact() {
  const mainSection = document.getElementById("main_section");
  const overlay = document.getElementById("overlay");
  mainSection.innerHTML = "";
  mainSection.innerHTML = generateAddContact();
  mainSection.style.display = "block";
  overlay.style.display = "block";
  setTimeout(() => {
    mainSection.style.left = "";
    mainSection.style.right = "0";
  }, 10);
}


/**
 * Closes an overlay with a slide-out animation.
 *
 * This function slides out the overlay from the right and hides it.
 * made by Mina Zarkesh
 */
function closeOverlay() {
  const mainSection = document.querySelector(".main_section");
  const overlay = document.getElementById("overlay");
  mainSection.style.right = "-100%";
  overlay.style.display = "none";
  mainSection.style.display = "none";
}


/**
 *
 * Adds a new contact to the contact list and updates the display.
 *
 * This function retrieves contact information from HTML input elements, creates a new contact object,
 * adds it to the contact list, and updates the display with the new contact's information.
 * It also saves the updated contact list to the backend and closes the overlay.
 * made by Mina Zarkesh
 */
async function addContact() {
  let Cname = document.getElementById("name");
  let Cemail = document.getElementById("mail");
  let Cphone = document.getElementById("phone");
  let Ccolor = setRandomColor();
  let CnameTag = createNameTag(Cname.value);
  let newContact = {
    name: Cname.value,
    color: Ccolor,
    mail: Cemail.value,
    phone: Cphone.value,
    nameTag: CnameTag,
  };
  contacts.push(newContact);
  await setItem("contacts", JSON.stringify(contacts));
  contact = newContact;
  renderContactList();
  addIndex = contacts.indexOf(contact);
  renderContactRight(addIndex);
  Cname.value = "";
  Cemail.value = "";
  Cphone.value = "";
  closeOverlay();
  document.getElementById('main-mobile-Overlay').style.display = "none"
  let elements = document.getElementsByClassName("contacts-list-box");
  if (elements.length > 0) {
      elements[0].style.display = "flex";
  }
}


