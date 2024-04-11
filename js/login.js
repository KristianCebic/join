let isPasswordVisible = false;


/**
 * Checks the login credentials of a user and performs appropriate actions based on the result.
 * made by Mina Zarkesh
 * @return {string} The URL of the page to redirect to after login.
 */
function checkLogin() {
    let hasMatch = false;
    index = 0;
    let emailcheck = [hasMatch, index];
    index = checkEmail();

    if (index > -1) {
        index = checkPassword(index);
        if (index > 0) {
            loadUsers(index);
            return (window.location.href = `summary.html?id=${index}`);
        }
        if ((index = 0)) {
            alert("Nutze als Gast den GuestLogin");
        }
        alert("Das Password ist falsch!");

        return (window.location.href = `index.html`);
    } else {
        alert("Login: Es gibt keinen User, der mit dieser Email registiert ist!");
        return (window.location.href = `index.html`);
    }
}


/**
 * Check if the entered email exists in the list of users.
 * made by Mina Zarkesh
 * 
 * @return {number} The index of the user in the list, or -1 if the email doesn't exist.
 */
function checkEmail() {
    let mail = document.getElementById("LoginMail");
    let hasMatch = false;
    let index;

    for (let i = 0; i < users.length; i++) {
        let tempUser = users[i];

        if (tempUser.mail === mail.value) {
            hasMatch = true;
            index = i;
            break;
        } else {
            hasMatch = false;
            index = -1;
        }
    }
    return index;
}


/**
 * Checks if the entered password matches the password of a user.
 * made by Mina Zarkesh
 * This function compares the entered password with the password of a specified user.
 *
 * @param {number} i - The index of the user in the 'users' array.
 * @returns {number} - The index of the user if the password matches; otherwise, returns -1.
 */
function checkPassword(i) {
    let password = document.getElementById("LoginPassword");
    let hasMatch = false;
    let tempUser = users[i];

    if (tempUser.password === password.value) {
        index = i;
    } else {
        hasMatch = false;
        index = -1;
    }
    return index;
}


/**
 * This function changes the image as soon as something is entered in the input field.
 * 
 */
function changeLockImg() {
    const newPasswordInput = document.getElementById("LoginPassword");
    const passwordImgDiv = document.getElementById("passwordImageDiv");
    if (newPasswordInput.value === "") {
        passwordImgDiv.innerHTML = `<img src="../assets/img/icon-lock-closed.png" alt="lock"/>`;
    } else {
        passwordImgDiv.innerHTML = `<img onclick="showPasswordNew()" src="../assets/img/hidepassword.png" alt="">`;
    }
}


/**
 * This function toggles the visibility of a password in an input field by switching between displaying plain text and hidden text and changing the corresponding image.
 *
 */
function showPasswordNew() {
    const newPasswordInput = document.getElementById("LoginPassword");
    const passwordImg = document.querySelector("#passwordImageDiv img");

    if (isPasswordVisible) {
        passwordImg.src = "../assets/img/hidepassword.png";
        newPasswordInput.type = "password";
        isPasswordVisible = false;
    } else {
        passwordImg.src = "../assets/img/showpassword.png";
        newPasswordInput.type = "text";
        isPasswordVisible = true;
    }
}


/**
 * This feature allows storing and retrieving credentials based on the "Remember Me" checkbox,
 * displaying previously saved data if the input fields are empty or storing new credentials if the checkbox is checked.
 *made by Michael Povoa
 */
async function rememberMe() {
    let rememberLogin = [];

    const rememberMeCheckbox = document.getElementById("RememberMe");
    const emailFeld = document.getElementById("LoginMail");
    const passwortFeld = document.getElementById("LoginPassword");

    if (rememberMeCheckbox.checked) {
        if (
            emailFeld.value === "" &&
            passwortFeld.value === "" &&
            rememberMeCheckbox.checked
        ) {
            const RememberME = await getItem("RememberME");
            rememberLogin = JSON.parse(RememberME);
            if (rememberLogin.length > 0) {
                const erinnerteDaten = rememberLogin[rememberLogin.length - 1];
                emailFeld.value = erinnerteDaten.rememberedEmail;
                passwortFeld.value = erinnerteDaten.rememberedPassword;
            }
            if (rememberLogin.length === 0) {
                emailFeld.value = `Bitte zuerst einmal Daten Speichern`;
            }
        } else {
            const datenZumErinnern = {
                rememberedEmail: emailFeld.value,
                rememberedPassword: passwortFeld.value,
            };
            rememberLogin.push(datenZumErinnern);
            await setItem("RememberME", JSON.stringify(rememberLogin));
        }
    }
}