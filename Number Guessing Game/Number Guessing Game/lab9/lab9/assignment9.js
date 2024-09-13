const prompt = require('prompt-sync')({sigint: true});

// Get the user's name
const name = prompt("What's your name?: ");
console.log(`> Hello ${name}, Let’s try to guess a number in my mind.`);

let playAgain = 'Y';

while (playAgain.toUpperCase() === 'Y') {
  // Random number from 1 - 100
  let numberInMind = Math.floor(Math.random() * 100) + 1;

  // This variable is used to determine if the app should continue prompting the user for input
  let foundCorrectNumber = false;

  while (!foundCorrectNumber) {
    // Get user input (don't forget that the input is a string)
    let userGuess = prompt('> I have a number in my mind. It is between 0-100, guess it: ');

    // Compare the guess to the secret answer and
    // let the user know the feedback (too large, too small, correct).
    if (userGuess > numberInMind) {
      console.log('> It’s too large. Next guess?');
    } else if (userGuess < numberInMind) {
      console.log('> It’s too small. Next guess?');
    } else {
      console.log('> Correct! You found the number.');
      foundCorrectNumber = true;
    }
  }

  // Bonus Point: prompt user and provide option for user to start a new game after winning
  // Ask if the user wants to play again
  playAgain = prompt('> Do you want to play again? (Y/N): ');
}

console.log('> Thanks for playing!');
