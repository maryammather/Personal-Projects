const targetWord = "humble"; // The word to guess
const maxGuesses = 6;
let currentRow = 0;

const board = document.getElementById("board");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

// Initialize the board
for (let i = 0; i < maxGuesses * 6; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
}

submitBtn.addEventListener("click", () => {
    const guess = guessInput.value.toLowerCase();
    if (guess.length !== 6) {
        message.textContent = "Please enter a 6-letter word.";
        return;
    }

    if (currentRow >= maxGuesses) {
        message.textContent = "Game over! The word was: " + targetWord;
        return;
    }

    // Process the guess
    const cells = board.children;
    const rowStart = currentRow * 6;
    const rowEnd = rowStart + 6;

    const targetCounts = {}; // Track counts of each letter in targetWord
    [...targetWord].forEach(letter => targetCounts[letter] = (targetCounts[letter] || 0) + 1);

    const guessResult = [...guess].map((letter, i) => {
        if (letter === targetWord[i]) {
            targetCounts[letter]--;
            return "correct";
        }
        return null;
    });

    // Second pass for "present" letters
    [...guess].forEach((letter, i) => {
        if (guessResult[i] !== "correct" && targetCounts[letter]) {
            targetCounts[letter]--;
            guessResult[i] = "present";
        } else if (guessResult[i] !== "correct") {
            guessResult[i] = "absent";
        }
    });

    // Update the board
    [...guess].forEach((letter, i) => {
        const cell = cells[rowStart + i];
        cell.textContent = letter;
        cell.classList.add(guessResult[i]);
    });

    currentRow++;

    if (guess === targetWord) {
        message.textContent = "Congratulations! You guessed the word!";
        guessInput.disabled = true;
        submitBtn.disabled = true;
    } else if (currentRow >= maxGuesses) {
        message.textContent = "Game over! The word was: " + targetWord;
    } else {
        message.textContent = "Keep trying!";
    }

    guessInput.value = "";
    guessInput.focus();
});
