function calculateFlames() {
    let yourName = document.getElementById("yourName").value.toLowerCase().replace(/\s/g, ''); // Remove spaces
    let partnerName = document.getElementById("partnerName").value.toLowerCase().replace(/\s/g, '');
    console.log(yourName);
    console.log(partnerName);

    // Validate inputs
    if (yourName.trim() === "" && partnerName.trim() === "") {
        displayError("Love can't calculate without two hearts. ❤️❤️", "result-error");
        return;
    }

    if (yourName.trim() === "") {
        displayError("Whoops! Forgot yourself but remembered your partner ? 😜😛", "result-error");
        return;
    }

    if (partnerName.trim() === "") {
        displayError(`${yourName.toUpperCase()}, who's the mystery partner ? Tell us! 😍🤪`, "result-error");
        return;
    }

    if (yourName === partnerName) {
        displayError(`${yourName.toUpperCase()} & ${partnerName.toUpperCase()} ?, Twins in love Game! 😉😂`, "result-error");
        // return; 
    }

    if (yourName.length < 3 || partnerName.length < 3) {
        displayError("Uho-no, Names shorter than your patience. Try again! 😜🙃", "result-error");
        return;
    }

    const commonCharacters = [];
    console.log("Comman :", commonCharacters)

    for (let i = 0; i < yourName.length; i++) {
        for (let j = 0; j < partnerName.length; j++) {
            if (yourName[i] === partnerName[j]) {
                commonCharacters.push(yourName[i]);
                yourName = yourName.replace(yourName[i], "");
                partnerName = partnerName.replace(partnerName[j], "");
                i--;
                break;
            }
        }
    }

    const totalCharacters = yourName.length + partnerName.length;
    console.log(`Total Characters: ${totalCharacters}`);

    const flamesLetters = ['F', 'L', 'A', 'M', 'E', 'S'];

    let currentIndex = 0;
    while (flamesLetters.length > 1) {
        currentIndex = (currentIndex + totalCharacters - 1) % flamesLetters.length;
        flamesLetters.splice(currentIndex, 1);
    }

    let yourNameRes = document.getElementById("yourName").value.toUpperCase();
    let partnerNameRes = document.getElementById("partnerName").value.toUpperCase();
    const flamesResult = {
        'F': `Friendship between ${yourNameRes} and ${partnerNameRes} is like a treasure hunt without any treasure, but it's still worth it! 😂😍`,
        'L': `Love and Chemistry between ${yourNameRes} and ${partnerNameRes} is so intense; even scientists can't explain it! 😉❤️`,
        'A': `Affection between ${yourNameRes} and ${partnerNameRes} is sweeter than a chocolate fountain. 💖😍`,
        'M': `Marriage alert! You're now ${yourNameRes} and ${partnerNameRes} Inc., partners for life. Cheers to love! ❤️🥰`,
        'E': `Enemies ${yourNameRes} + ${partnerNameRes} = fireworks, but the kind you don't want to be near! 😶😑`,
        'S': `Siblinghood alert! ${yourNameRes} and ${partnerNameRes} will share secrets, snacks, and probably a few wrestling matches. 😉😂`
    };

    const resultLetter = flamesLetters[0];
    const resultMessage = flamesResult[resultLetter];
    displayResult(resultMessage, resultLetter, "result-success");
}

const resultImages = {
    'F': './images/Friends.png',
    'L': './images/Love.png',
    'A': './images/Affection.png',
    'M': './images/Marriage.png',
    'E': './images/Enemy.png',
    'S': './images/Siblings.png'
};

function displayResult(message, resultLetter, resultClass) {
    const resultCard = document.getElementById("resultCard");
    const flamesResult = document.getElementById("flamesResult");
    const resultImage = document.getElementById("resultImage");
    console.log(message)
    console.log(resultLetter)
    resultCard.className = "result-card " + resultClass;

    if (resultClass === "result-success") {
        flamesResult.innerHTML = message;
        flamesResult.style.color = "white";
        flamesResult.style.fontSize = "18px";
        document.getElementById("tryAgainButton").style.display = "none";
    } else {
        flamesResult.textContent = message; // Use textContent to set plain text
        document.getElementById("tryAgainButton").style.display = "block";
    }

    if (resultImages.hasOwnProperty(resultLetter)) {
        resultImage.src = resultImages[resultLetter];
    } else {
        resultImage.src = './images/default.png';
    }

    resultCard.style.display = "block";
}

function clearResult() {
    document.getElementById("yourName").value = "";
    document.getElementById("partnerName").value = "";
    document.getElementById("resultCard").style.display = "none";
}


function displayError(errorMessage, resultClass) {
    const resultCard = document.getElementById("resultCard");
    const flamesResult = document.getElementById("flamesResult");
    const resultImage = document.getElementById("resultImage"); // Get the result image element
    const tryAgainButton = document.getElementById("tryAgainButton")

    resultCard.className = "result-card " + resultClass;
    flamesResult.textContent = errorMessage;
    flamesResult.style.color = "red"; // Seting the text color to red
    flamesResult.style.fontSize = "18px";
    tryAgainButton.style.display = "block";
    resultCard.style.display = "block";
    // Set the image source to "Error.jpg"
    resultImage.style.width = "90px"
    resultImage.style.height = "110px"
    resultImage.src = './images/Error.png';
}