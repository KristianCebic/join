let emails = [];
let email = "";
let isPasswordVisible = false;


/**
 * Generates a user object with the specified properties.
 *
 * @function
 * @name generateUserArray
 * @param {HTMLInputElement} userName - The HTML input element for the user's name.
 * @param {HTMLInputElement} mail - The HTML input element for the user's email.
 * @param {string} userNameTag - The user's name tag.
 * @param {HTMLInputElement} password - The HTML input element for the user's password.
 * @param {string} userColor - The user's color.
 * @param {string} STORAGE_TOKEN - The user's storage token.
 * @returns {Object} A user object.
 */
function generateUserArray(userName, mail, userNameTag, password, userColor, STORAGE_TOKEN) {
    return {
        name: userName.value,
        mail: mail.value,
        nameTag: userNameTag,
        password: password.value,
        phone: "+49 1111 111 11 1",
        color: userColor,
        token: STORAGE_TOKEN,
    };
}


/**
 * Register a new user.
 * made by Mina Zarkesh
 * @return {Promise<void>} Promise that resolves when the user is registered.
 */
async function registerUser() {
    let userName = document.getElementById("signupName");
    let mail = document.getElementById("signupMail");
    let password = document.getElementById("signupPassword");
    let confirmPassword = document.getElementById("signupConfirmPassword");
    let signUpsuccsesImg = document.getElementById('signUpsuccsesImg');
    let userNameTag = "G";
    userNameTag = createNameTag(userName.value);
    userColor = setRandomColor();
    userArray = generateUserArray(userName, mail, userNameTag, password, userColor, STORAGE_TOKEN);
    users = [];
    await loadUsers();
    await loadUsers();

    for (let i = 0; i < users.length; i++) {

        email = users[i].mail;
        emails.push(email);
    }
    if (!(emails.includes(mail.value))) {
        users.push(userArray);
        await setItem("users", JSON.stringify(users));
        userName.value = '';
        mail.value = '';
        password.value = '';
        confirmPassword.value = '';
        signUpsuccsesImg.style.display = "block";

        setTimeout(() => {
            window.location.href = `index.html`;
        }, 3000);
    } else {
        mail.value = '';
        alert("Diese Mail ist schon registriert. Loggen Sie sich ein oder nutzen Sie eine andere Mail-Adresse.");
    }
}


/**
 * Checks if the signup password matches the confirmation password and performs the signup process.
 * made by Mina Zarkesh
 * 
 * @return {Promise<void>} A promise that resolves when the signup process is complete.
 */
async function checkSignup() {
    let password = document.getElementById('signupPassword');
    let confirmPassword = document.getElementById('signupConfirmPassword');

    if (password.value === confirmPassword.value) {
        await registerUser();
    } else {
        password.value = '';
        confirmPassword.value = '';
        alert("Passwörter stimmen nicht überein!");
    }
}


/**
 * This function changes the lock icon in the first input field
 *
 */
function changeLockImageNewSignUp() {
    const newPasswordInput = document.getElementById("signupPassword");
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
    const newPasswordInput = document.getElementById("signupPassword");
    const passwordImg = document.querySelector("#paassword-img-div img");

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
 * This function changes the lock icon in the second input field
 *
 */
function changeLockImageConfirmSignUp() {
    const confirmPasswordInput = document.getElementById("signupConfirmPassword");
    const confirmPassworddiv = document.getElementById("confirm-paassword-img-div");

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
    const confirmPasswordInput = document.getElementById("signupConfirmPassword");
    const confirmPasswordImg = document.querySelector("#confirm-paassword-img-div img");

    if (isPasswordVisible) {
        confirmPasswordImg.src = "../assets/img/hidepassword.png";
        confirmPasswordInput.type = "password";
        isPasswordVisible = false;

    } else {

        confirmPasswordImg.src = "../assets/img/showpassword.png";
        confirmPasswordInput.type = "text";
        isPasswordVisible = true;
    }
}