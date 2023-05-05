
const passwordGenerationForm = document.getElementById("password-generation-form");

const amountOfPasswordsToGenerate = document.getElementById("amount-of-passwords-to-generate");
const chosenPasswordLength = document.getElementById("chosen-password-length");

const passwordHasToIncludeSpecialCharacters = document.getElementById("password-has-to-include-special-characters");
const passwordHasToIncludeUpperCaseLetters = document.getElementById("password-has-to-include-upper-case-Letters");
const passwordHasToIncludeNumbers = document.getElementById("password-has-to-include-numbers");

const passwordOutputId = "password-output";

const letters = "abcdefghijklmnopqrstuvwxyz";
const specialCharacters = "|<>#+*~-_!?§$%&/()=@";
const numbers = "0123456789";

let passwordLength;
let amountOfEachCharType;
let includeSpecialCharacters;
let includeNumbers;
let includeUpperCaseLetters;
let amountOfPasswords;

let passwordSections = new Array();


passwordGenerationForm.addEventListener('submit', (e) => {
	e.preventDefault();
	startPasswordGeneration();
})
function startPasswordGeneration() {
	
	removeAllPasswordSections().then(() => {
		amountOfPasswords = amountOfPasswordsToGenerate.value;
		passwordLength = chosenPasswordLength.value;
		
		includeSpecialCharacters = passwordHasToIncludeSpecialCharacters.checked;
		includeNumbers = passwordHasToIncludeNumbers.checked;
		includeUpperCaseLetters = passwordHasToIncludeUpperCaseLetters.checked;
		
		for (var passwordSectionNumber = 1; passwordSectionNumber <= amountOfPasswords; passwordSectionNumber++) {
			generatePasswordSection(passwordSectionNumber);
			generatePassword(passwordSectionNumber);
		}
	});
}

function removeAllPasswordSections() {
	return new Promise((resolve) => {
		
		for (var passwordSection of passwordSections) {
			passwordSection.remove();
		}
		
		resolve();
	});
}

function generatePasswordSection(passwordSectionNumber) {
	
	var passwordSection = document.createElement("section");
	
	var passwordDiv = document.createElement("div");
	passwordDiv.setAttribute("class", "row-no-gutters");
	
	var passwordOutputLabel = document.createElement("label");
	passwordOutputLabel.setAttribute("for", passwordOutputId + passwordSectionNumber);
	passwordOutputLabel.textContent = "Passwort " + passwordSectionNumber + ":";
	
	var passwordOutput = document.createElement("input");
	passwordOutput.setAttribute("type", "text");
	passwordOutput.setAttribute("class", "col-md-5 big-input");
	passwordOutput.setAttribute("readonly", "true");
	passwordOutput.id = passwordOutputId + passwordSectionNumber;
	
	var copyToClipboard = document.createElement("button");
	copyToClipboard.setAttribute("type", "button");
	copyToClipboard.setAttribute("class", "col-md-1 btn btn-primary");
	copyToClipboard.setAttribute("readonly", "true");
	copyToClipboard.setAttribute("onClick", "copyPasswordToClipboard(" + passwordSectionNumber + ")");
	
	
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
	passwordDiv.appendChild(copyToClipboard);
	copyToClipboard.appendChild(copyToClipboardIcon);
	
	document.getElementsByTagName("main")[0].appendChild(passwordSection);
	
	copyToClipboard.addEventListener("click", () => copyPasswordToClipboard(passwordSectionNumber));
	
	passwordSections.push(passwordSection);
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
	
	password += getRandomCharsFrom(passwordLength - password.length, letters);
	
	password = password.shuffle().slice(0, passwordLength);
	
	document.getElementById(passwordOutputId + passwordSectionNumber).value = password;
}

function calculateAmountOfEachCharType() {
	
	var divideValue = 1;
	
	if (includeSpecialCharacters) {
		divideValue++;
	}
	if (includeNumbers) {
		divideValue++;
	}
	if (includeUpperCaseLetters) {
		divideValue++;
	}
	
	amountOfEachCharType = Math.floor(passwordLength / divideValue);
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

function copyPasswordToClipboard(passwordSectionNumber) {
	var passwordOutput = document.getElementById(passwordOutputId + passwordSectionNumber);
	passwordOutput.select();
	passwordOutput.setSelectionRange(0, 99999);
	
	navigator.clipboard.writeText(passwordOutput.value);
}