let userEmails= [];
let isPasswordVisibleReset = false;


/**
 * Sends a reset password email.
 * made by Mina Zarkesh
 * 
 * @param {string} resetEmail - The email address to send the reset password email to.
 * @return {undefined} This function does not return a value.
 */
async function sendResetPasswordEmail() {
  const resetEmail = document.getElementById("mail").value;
  let errorFieldEmail = document.getElementById("error-message-Email");
  let sendEmailImg = document.getElementById("sendEmailImg");
  await loadUsers();
  let isRegistered;

  for (let i = 0; i < users.length; i++) {
    const element = users[i].mail;
    emails.push(element);
  }
  isRegistered = emails.includes(resetEmail);

  if (emails.includes(resetEmail)) {
    sendEmailImg.style.display = "block";
    let userIndex = emails.indexOf(resetEmail);
    setTimeout(() => {
      window.location.href = `resetpassword.html?id=${userIndex}`;
    }, 3000);
  } else {
    errorFieldEmail.textContent = "Diese E-mail Existiert Nicht!";
    errorFieldEmail.style.color = "red";
  }
}


/**
 * Checks the password entered by the user and performs the necessary actions based on the result.
 * made by Mina Zarkesh
 * @return {Promise<void>} This function does not return anything.
 */
async function checkPassword() {
  let imgreset = document.getElementById("sendresetpasswordimg");
  let password = document.getElementById("new-password");
  let confirmPassword = document.getElementById("confirm-password");
  let errorField = document.getElementById("error-message");

  if (password.value === confirmPassword.value) {
    userIndex = getCurrentUserVariable();
    await loadUsers(userIndex);
    user.password = password.value;
    users[userIndex] = user;
    await setItem("users", JSON.stringify(users));
    imgreset.style.display = "block";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  } else {
    password.value = "";
    confirmPassword.value = "";
    errorField.textContent = "Die Passwörter stimmen nicht überein!";
    errorField.style.color = "red";
  }
}


/**
 * This function changes the lock icon in the first input field
 *
 */
function changeLockImageNew() {
  const newPasswordInput = document.getElementById("new-password");
  const passwordImgDiv = document.getElementById("paassword-img-div");
  if (newPasswordInput.value === "") {
    passwordImgDiv.innerHTML = `<img src="../assets/img/icon-lock-closed.png" alt="lock"/>`;
  } else {
    passwordImgDiv.innerHTML = `<img onclick="showPasswordNew()" src="../assets/img/hidepassword.png" alt="">`;
  }
}


/**
 * This function changes the type in the first input from password to text
 *
 */
function showPasswordNew() {
  const newPasswordInput = document.getElementById("new-password");
  const passwordImg = document.querySelector("#paassword-img-div img");

  if (isPasswordVisibleReset) {
    passwordImg.src = "../assets/img/hidepassword.png";
    newPasswordInput.type = "password";
    isPasswordVisibleReset = false;
  } else {
    passwordImg.src = "../assets/img/showpassword.png";
    newPasswordInput.type = "text";
    isPasswordVisibleReset = true;
  }
}


/**
 * This function changes the lock icon in the second input field
 *
 */
function changeLockImageConfirm() {
  const confirmPasswordInput = document.getElementById("confirm-password");
  const confirmPassworddiv = document.getElementById(
    "confirm-paassword-img-div"
  );

  if (confirmPasswordInput.value === "") {
    confirmPassworddiv.innerHTML = `<img src="../assets/img/icon-lock-closed.png" alt="lock"/>`;
  } else {
    confirmPassworddiv.innerHTML = `<img onclick="showPasswordConfirm()" src="../assets/img/hidepassword.png" alt="">`;
  }
}


/**
 * This function changes the type in the secoud input from password to text
 *
 */
function showPasswordConfirm() {
  const confirmPasswordInput = document.getElementById("confirm-password");
  const confirmPasswordImg = document.querySelector(
    "#confirm-paassword-img-div img"
  );

  if (isPasswordVisibleReset) {
    confirmPasswordImg.src = "../assets/img/hidepassword.png";
    confirmPasswordInput.type = "password";
    isPasswordVisibleReset = false;
  } else {
    confirmPasswordImg.src = "../assets/img/showpassword.png";
    confirmPasswordInput.type = "text";
    isPasswordVisibleReset = true;
  }
}
