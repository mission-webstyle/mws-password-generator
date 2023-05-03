const mainTag = document.getElementsByTagName("main")
const passwordCheckForm = document.getElementById("password-check-form")
const passwordInput = document.getElementById("password-input")

const letters = "abcdefghijklmnopqrstuvwxyz";
const specialCharacters = "|<>#+*~-_!?§$%&/()=@";
const numbers = "0123456789";

const minPasswordLength = 16;
const minAmountOfEachCharType = 1;

const adviseMinAmountOfPrefix = 'Empfohlene Mindestanzahl an '
const adviseMinPasswordLength = `Empfohlene Mindestlänge des Passwortes: ${minPasswordLength}`;
const adviseMinAmountOfSpecialCharacters = `${adviseMinAmountOfPrefix} an Sonderzeichen: ${minAmountOfEachCharType}`;
const adviseMinAmountOfNumbers = `${adviseMinAmountOfPrefix} an Zahlen: ${minAmountOfEachCharType}`;
const adviseMinAmountOfUppercaseLetters = `${adviseMinAmountOfPrefix} an Großbuchstaben: ${minAmountOfEachCharType}`;
const adviseMinAmountOfLowercaseLetters = `${adviseMinAmountOfPrefix} an Kleinbuchstaben: ${minAmountOfEachCharType}`;

const bgFulfilledStandard = "#99e699";
const bgImprovement = "#ff8080";

let adviseSections = [];

passwordCheckForm.addEventListener('submit', (e) => {
	e.preventDefault();
	checkPassword();
})


function checkPassword() {
	
	const password = passwordInput.value;
	
	clearPreviousPasswordAdvice().then(() => {
		
		if (!passwordHasMinimumLength(password)) {
			createPasswordAdvise(adviseMinPasswordLength, bgImprovement);
		} else {
			showPasswordImprovements(password);
			showFulfilledPasswordStandards(password);
		}
		
	});
}

function clearPreviousPasswordAdvice() {
	return new Promise((resolve) => {
		
		for (const adviseSection of adviseSections) {
			adviseSection.remove();
		}
		
		resolve();
	});
}

function createPasswordAdvise(adviseText, backgroundColor) {
	const adviseSection = document.createElement("section");
	adviseSection.setAttribute("style", `background-color: ${backgroundColor};`);
	
	const adviseDiv = document.createElement("div");
	adviseDiv.setAttribute("class", "row-no-gutters");
	adviseDiv.textContent = adviseText;
	
	
	adviseSection.appendChild(adviseDiv);
	mainTag[0].appendChild(adviseSection);
	
	adviseSections.push(adviseSection);
}

function showPasswordImprovements(password) {
	if (!passwordHasMinimumAmountOfCharType(password, specialCharacters)) {
		createPasswordAdvise(adviseMinAmountOfSpecialCharacters, bgImprovement);
	}
	
	if (!passwordHasMinimumAmountOfCharType(password, numbers)) {
		createPasswordAdvise(adviseMinAmountOfNumbers, bgImprovement);
	}
	
	if (!passwordHasMinimumAmountOfCharType(password, letters.toUpperCase())) {
		createPasswordAdvise(adviseMinAmountOfUppercaseLetters, bgImprovement);
	}
	
	if (!passwordHasMinimumAmountOfCharType(password, letters)) {
		createPasswordAdvise(adviseMinAmountOfLowercaseLetters, bgImprovement);
	}
}

function showFulfilledPasswordStandards(password) {
	createPasswordAdvise(adviseMinPasswordLength, bgFulfilledStandard);
	
	
	if (passwordHasMinimumAmountOfCharType(password, specialCharacters)) {
		createPasswordAdvise(adviseMinAmountOfSpecialCharacters, bgFulfilledStandard);
	}
	
	if (passwordHasMinimumAmountOfCharType(password, numbers)) {
		createPasswordAdvise(adviseMinAmountOfNumbers, bgFulfilledStandard);
	}
	
	if (passwordHasMinimumAmountOfCharType(password, letters.toUpperCase())) {
		createPasswordAdvise(adviseMinAmountOfUppercaseLetters, bgFulfilledStandard);
	}
	
	if (passwordHasMinimumAmountOfCharType(password, letters)) {
		createPasswordAdvise(adviseMinAmountOfLowercaseLetters, bgFulfilledStandard);
	}
}


function passwordHasMinimumLength(password) {
	return (password.length >= minPasswordLength);
	
}

function passwordHasMinimumAmountOfCharType(password, chars) {
	
	var charTypeAmount = 0;
	
	for (var char of password) {
		if (chars.includes(char)) {
			charTypeAmount++;
		}
	}
	
	return (charTypeAmount >= minAmountOfEachCharType);
	
}