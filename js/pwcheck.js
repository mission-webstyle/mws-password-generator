const letters = "abcdefghijklmnopqrstuvwxyz";
const specialCharacters = "|<>#+*~-_!?§$%&/()=@";
const numbers = "0123456789";

const passwordMinimumLength = 8;
const advisedDivideValue = 4;

const circleCheck = "fa-regular fa-circle-check";
const circleXmark = "fa-regular fa-circle-xmark";

const greenBackgroundColorCode = "#99e699";
const redBackgroundColorCode = "#ff8080";

// const lengthAdviseText = `Empfohlene Mindestlänge des Passwortes: ${passwordMinimumLength}`;
// const specialCharacterAdviseText = "Empfohlene Mindestanzahl an Sonderzeichen: ";
// const numbersAdviseText = "Empfohlene Mindestanzahl an Zahlen: ";
// const uppercaseLetterssAdviseText = "Empfohlene Mindestanzahl an Großbuchtsaben: ";

let adviseSections = new Array();

let advisedAmountOfEachCharType;

function checkPassword() {

    var password = document.getElementById("passwordInput").value;
    advisedAmountOfEachCharType = Math.floor(password.length / advisedDivideValue);

    const lengthAdviseText = `Empfohlene Mindestlänge des Passwortes: ${passwordMinimumLength}`;
    const specialCharacterAdviseText = `Empfohlene Mindestanzahl an Sonderzeichen: ${advisedAmountOfEachCharType}`;
    const numbersAdviseText = `Empfohlene Mindestanzahl an Zahlen: ${advisedAmountOfEachCharType}`;
    const uppercaseLetterssAdviseText = `Empfohlene Mindestanzahl an Großbuchtsaben: ${advisedAmountOfEachCharType}`;
    const lowercaseLetterssAdviseText = `Empfohlene Mindestanzahl an Kleinbuchstaben: ${advisedAmountOfEachCharType}`;

    removeAllAdviseSections().then(() => {
        if (passwordHasMinimumLength(password)) {
            createAdviseSection(lengthAdviseText, greenBackgroundColorCode);
        } else {
            createAdviseSection(lengthAdviseText, redBackgroundColorCode);
        }

        if (passwordHasMinimumAmountOfCharType(password, specialCharacters)) {
            createAdviseSection(specialCharacterAdviseText, greenBackgroundColorCode);
        } else {
            createAdviseSection(specialCharacterAdviseText, redBackgroundColorCode);
        }

        if (passwordHasMinimumAmountOfCharType(password, numbers)) {
            createAdviseSection(numbersAdviseText, greenBackgroundColorCode);
        } else {
            createAdviseSection(numbersAdviseText, redBackgroundColorCode);
        }

        if (passwordHasMinimumAmountOfCharType(password, letters.toUpperCase())) {
            createAdviseSection(uppercaseLetterssAdviseText, greenBackgroundColorCode);
        } else {
            createAdviseSection(uppercaseLetterssAdviseText, redBackgroundColorCode);
        }

        if (passwordHasMinimumAmountOfCharType(password, letters)) {
            createAdviseSection(lowercaseLetterssAdviseText, greenBackgroundColorCode);
        } else {
            createAdviseSection(lowercaseLetterssAdviseText, redBackgroundColorCode);
        }
    });
}

function removeAllAdviseSections() {
    return new Promise((resolve) => {

        for (var adviseSection of adviseSections) {
            adviseSection.remove();
        }

        resolve();
    });
}

function passwordHasMinimumLength(password) {
    if (password.length < passwordMinimumLength) {
        return false;
    }
    return true;
}

function passwordHasMinimumAmountOfCharType(password, chars) {

    var charTypeAmount = 0;

    for (var char of password) {
        if (chars.includes(char)) {
            charTypeAmount++;
        }
    }

    console.log(charTypeAmount);

    if (charTypeAmount < advisedAmountOfEachCharType) {
        return false;
    }
    return true;
}

function createAdviseSection(adviseText, backgroundColor) {
    var adviseSection = document.createElement("section");
    adviseSection.setAttribute("style", `background-color: ${backgroundColor};`);

    var row = document.createElement("div");
    row.setAttribute("class", "row-no-gutters");

    row.textContent = adviseText;

    adviseSection.appendChild(row);

    document.getElementsByTagName("main")[0].appendChild(adviseSection);
    adviseSections.push(adviseSection);
}