/**
 * Closes the mobile overlay and removes the "active" class from the clicked contact box.
 *
 * This function hides the mobile overlay on the web page and removes the "active" class
 * from the contact box that corresponds to the currently selected contact. made by Mina Zarkesh
 */
function closeMobileOverlay() {
    document.getElementById("mobileOverlay").style.display = "none";
  
    let indexID = contactArray.indexOf(contact);
    let contactboxes = document.querySelectorAll(".contact-box");
    let clickedContactbox = contactboxes[indexID];
    clickedContactbox.classList.remove("active");
  }
  
  
  /**
   *
   * Edits the contact's information if changes are made and updates the display.
   *
   * This function updates the contact's information if any changes are made to the name, email, or phone.
   * It then updates the display with the modified contact's information and saves the updated contact
   * list to the backend. made by Mina Zarkesh
   */
  function editContact() {
    let editName = document.getElementById("name");
    let editMail = document.getElementById("mail");
    let editPhone = document.getElementById("phone");
  
    if (editName.value !== "" && editMail.value !== "" && editPhone.value !== "") {
  
      editIndex = contacts.indexOf(contact);
      let editNameTag = createNameTag(editName.value);
      let editContact = {
        name: editName.value,
        color: contact.color,
        mail: editMail.value,
        phone: editPhone.value,
        nameTag: editNameTag,
      };
      loadContacts(editIndex);
      contacts[editIndex] = editContact;
      setItem("contacts", JSON.stringify(contacts));
      renderContactList();
      renderContactRight(editIndex);
    }
    closeOverlay();
  }
  
  
  /**
   * made by Mina Zarkesh
   * Deletes the currently selected contact and updates the display.
   *
   * This function deletes the contact currently being viewed, updates the contact list,
   * saves the updated contact list to the backend, and refreshes the display to reflect the changes.
   */
  async function deleteContact() {
  
    const deletedContact = contacts.splice(selectedContactIndex, 1)[0];
    contactArray = contactArray.filter(contact => contact !== deletedContact);
  
    await setItem("contacts", JSON.stringify(contacts));
  
    resetContactInfo();
    renderContactList();
  }
  
  
  /**
   * Resets the contact information fields and adjusts display properties of related elements.
   * This function clears the values of input fields for name, mail, and phone if the main section is displayed.
   * It also hides the 'floating-contact-box' and the mobile overlay, while ensuring the first element
   * with the class 'contacts-list-box' is visible.
   */
  function resetContactInfo() {
    let editName = document.getElementById("name");
    let editMail = document.getElementById("mail");
    let editPhone = document.getElementById("phone");
    const mainSection = document.getElementById("main_section");
  
    if (mainSection.style.display === "block") {
      editName.value = "";
      editMail.value = "";
      editPhone.value = "";
    }
    let contactFloatingBox = document.getElementById("floating-contact-box");
    contactFloatingBox.classList.add("d-none");
    document.getElementById('main-mobile-Overlay').style.display = "none"
    let elements = document.getElementsByClassName("contacts-list-box");
    if (elements.length > 0) {
      elements[0].style.display = "flex";
    }
  }
  
  
  /**
   * Generates the HTML code for the "Add Contact" form.
   * made by Mina Zarkesh
   * @return {string} The HTML code for the form.
   */
  function generateAddContact() {
    return /*html*/ `
       <div class="add-contact-box">
        <div class="add-contact-box-header">
          <button id="close-btn"
          onclick=closeOverlay()>
            <img
              src="../assets/img/close.svg"
              alt="icon-arrow-left-line-blue"
              id="close"
            />
          </button>
          <img src="../assets/img/Logo_white.svg" alt="Logo" />
          <h1>Add Contact</h1>
          <span>Tasks are better with a team!</span>
        </div>
        <div class="add-contact-inner-box">
          <div class="profile-badge" style="width: 120px; height:120px; border-radius:50%;">
            <img src="../assets/img/person-white.svg" alt="" />
          </div>
          <div class="form">
            <form onsubmit="addContact(); return false" >
            <div class="form-outline">
              <div class="form-inner-field">
                <input required type="text" name="" id="name" placeholder="Name" />
                <img
                  src="../assets/img/icon-person.png"
                  alt="name"
                />
              </div>
            </div>
            <div class="form-outline">
              <div class="form-inner-field">
                <input required type="email" name="" id="mail" placeholder="Email" />
                <img src="../assets/img/icon-mail.png" alt="mail" />
              </div>
            </div>
            <div class="form-outline">
              <div class="form-inner-field">
                <input
                required
                  type="number"
                  name=""
                  id="phone"
                  placeholder="Phone"
                  pattern="[0-9]{2}-[0-9]{3}-[0-9]{3}"
                />
                <img src="../assets/img/icon-call.svg" alt="lock" />
              </div>
            </div>
            <div class="container-checkbox">
              <button
              onclick=closeOverlay();
              id="cancel">
                Cancel
                <img src="../assets/img/icon_cancel-gray.svg" alt="" />
              </button>
              <button id="createContact">
                Create Contact <img src="../assets/img/check.svg" alt="" />
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  
  
  /**
   * Generates the HTML code for the edit contact form.
   * made by Mina Zarkesh
   * @return {string} The HTML code for the edit contact form.
   */
  function generateEditContact() {
    return /*html*/ `
       <div class="add-contact-box">
        <div class="add-contact-box-header">
          <button id="close-btn"
          onclick=closeOverlay();>
            <img
              src="../assets/img/close.svg"
              alt="icon-arrow-left-line-blue"
              id="close"
            />
          </button>
          <img src="../assets/img/Logo_white.svg" alt="Logo" />
          <h1> Contact</h1>
        </div>
        <div class="add-contact-inner-box">
          <div class="profile-badge" style="width: 120px; height: 120px; border-radius:50%; font-size: 47px; background-color: var(${contact.color});">
           <span>${contact.nameTag}</span>
          </div>
          <div class="form">
          <form onsubmit="editContact(); return false;">
            <div class="form-outline">
              <div class="form-inner-field">
                <input type="text" name="" id="name" placeholder="Name" value="${contact.name}" />
                <img
                  src="../assets/img/icon-person.png"
                  alt="name"
                />
              </div>
            </div>
            <div class="form-outline">
              <div class="form-inner-field">
                <input type="email" name="" id="mail" placeholder="Email" value="${contact.mail}" />
                <img src="../assets/img/icon-mail.png" alt="mail" />
              </div>
            </div>
            <div class="form-outline">
              <div class="form-inner-field">
                <input
                value="${contact.phone}"
                  type="number"
                  name=""
                  id="phone"
                  placeholder="49-123-123"
                  pattern="[0-9]{2}-[0-9]{3}-[0-9]{3}"
                />
                <img src="../assets/img/icon-call.svg" alt="lock" />
              </div>
            </div>
            <div class="container-checkbox">
            <button type="button" id="delete" onclick="deleteContact()">
                Delete
              </button>
              <button id="saveContact">
                Save <img src="../assets/img/check.svg" alt=""/>
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  
  
  /**
   * Event listener that checks URL parameters on DOMContentLoaded.
   *
   * This function adds an event listener to the document that is triggered when the DOM is fully loaded.
   * Upon triggering, it checks the URL parameters for a specific parameter ('showAddContact'). If this parameter
   * is set to 'true', it calls the `showAddContact` function. This is typically used in single-page applications
   * or web pages where certain UI elements or functionalities need to be triggered based on URL parameters.
   */
  document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("showAddContact") === "true") {
      showAddContact();
    }
  });