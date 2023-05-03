const letters = "abcdefghijklmnopqrstuvwxyz";
const specialCharacters = "|<>#+*~-_!?§$%&/()=@";
const numbers = "0123456789";

let length;
let amountOfEachCharType;
let includeSpecialCharacters;
let includeNumbers;
let includeUpperCaseLetters;
let passwordAmount;

let passwordSections = new Array();

function startPasswordGeneration() {

    removeAllAdviseSections().then(() => {
        passwordAmount = document.getElementById("passwordAmount").value;

        for (var passwordSectionNumber = 1; passwordSectionNumber <= passwordAmount; passwordSectionNumber++) {
            addPasswordSection(passwordSectionNumber);
            generatePassword(passwordSectionNumber);
        }
    });
}

function generatePassword(passwordSectionNumber) {

    calculateAmountOfEachCharType();

    var password = "";

    if (includeSpecialCharacters) {
        password += getRandomCharsFrom(amountOfEachCharType, specialCharacters);
    }

    if (includeNumbers) {
        password += getRandomCharsFrom(amountOfEachCharType, numbers);
    }

    if (includeUpperCaseLetters) {
        password += getRandomCharsFrom(amountOfEachCharType, letters).toUpperCase();
    }

    password += getRandomCharsFrom(length - password.length, letters);

    password = password.shuffle().slice(0, length);

    document.getElementById("passwordOutput" + passwordSectionNumber).value = password;
}

function calculateAmountOfEachCharType() {
    length = document.getElementById("passwordLength").value;

    includeSpecialCharacters = document.getElementById("specialCharacters").checked;
    includeNumbers = document.getElementById("numbers").checked;
    includeUpperCaseLetters = document.getElementById("upperCaseLetters").checked;

    var divideValue = 1;

    if (includeSpecialCharacters) divideValue++;
    if (includeNumbers) divideValue++;
    if (includeUpperCaseLetters) divideValue++;

    amountOfEachCharType = Math.floor(length / divideValue);
}

function getRandomCharsFrom(amount, characters) {
    var randomCharacters = "";

    for (var i = 0; i < amount; i++) {
        randomCharacters += characters.toCharArray()[Math.floor(Math.random() * characters.length)].toLowerCase();
    }

    return randomCharacters;
}

String.prototype.toCharArray = function () {
    return this.split("");
}

String.prototype.shuffle = function () {
    var charsToShuffle = this.toCharArray();

    for (var index = charsToShuffle.length - 1; index > 0; index--) {
        var switchIndex = Math.floor(Math.random() * (index + 1));

        var temp = charsToShuffle[index];
        charsToShuffle[index] = charsToShuffle[switchIndex];
        charsToShuffle[switchIndex] = temp;
    }
    return charsToShuffle.join("");
}

function togglePasswordVisibility(passwordSectionNumber) {
    var passwordOutput = document.getElementById("passwordOutput" + passwordSectionNumber);

    if (passwordOutput.type === "password") {
        passwordOutput.type = "text";
    }
    else {
        passwordOutput.type = "password";
    }
}

function copyPasswordToClipboard(passwordSectionNumber) {
    var passwordOutput = document.getElementById("passwordOutput" + passwordSectionNumber);
    passwordOutput.select();
    passwordOutput.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(passwordOutput.value);
}

function removeAllAdviseSections() {
    return new Promise((resolve) => {

        for (var passwordSection of passwordSections) {
            passwordSection.remove();
        }

        resolve();
    });
}

function addPasswordSection(passwordSectionNumber) {

    var passwordSection = document.createElement("section");

    var passwordDiv = document.createElement("div");
    passwordDiv.setAttribute("class", "row-no-gutters");

    var passwordOutputLabel = document.createElement("label");
    passwordOutputLabel.setAttribute("for", "passwordOutput" + passwordSectionNumber);
    passwordOutputLabel.textContent = "Passwort " + passwordSectionNumber +":";

    var passwordOutput = document.createElement("input");
    passwordOutput.setAttribute("type", "text");
    passwordOutput.setAttribute("class", "col-md-5 big-input");
    passwordOutput.setAttribute("readonly", "true");
    passwordOutput.id = "passwordOutput" + passwordSectionNumber;

    var copyToCLipboard = document.createElement("button");
    copyToCLipboard.setAttribute("type", "button");
    copyToCLipboard.setAttribute("class", "col-md-1 btn btn-primary");
    copyToCLipboard.setAttribute("readonly", "true");
    copyToCLipboard.setAttribute("onClick", "copyPasswordToClipboard(" + passwordSectionNumber + ")");


    var copyToClipboardIcon = document.createElement("i");
    copyToClipboardIcon.setAttribute("class", "fa-regular fa-copy");

    var addPasswordOutput = document.createElement("button");
    addPasswordOutput.setAttribute("type", "button");
    addPasswordOutput.setAttribute("class", "col-md-1 btn btn-primary");
    addPasswordOutput.setAttribute("readonly", "true");

    var addPasswordOutputIcon = document.createElement("i");
    addPasswordOutputIcon.setAttribute("class", "fa-regular fa-plus");

    passwordSection.appendChild(passwordDiv);
    passwordDiv.appendChild(passwordOutputLabel);
    passwordDiv.appendChild(passwordOutput);
    passwordDiv.appendChild(copyToCLipboard);
    copyToCLipboard.appendChild(copyToClipboardIcon);

    document.getElementsByTagName("main")[0].appendChild(passwordSection);

    copyToCLipboard.addEventListener("click", copyPasswordToClipboard(passwordSectionNumber));

    passwordSections.push(passwordSection);
}