document.addEventListener('DOMContentLoaded', () => {
  createSquares();

  let guessedWords = [[]];
  let availableSpace = 1;
  let word = 'dairy';
  let gussedWordCount = 0;

  const keys = document.querySelectorAll('.keyboard-row button');

  function getCurrentWordArray() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedWords(letter) {
    const currentWordArray = getCurrentWordArray();
    if (currentWordArray && currentWordArray.length < 5) {
      currentWordArray.push(letter);
      const availableSpaceEl = document.getElementById(String(availableSpace));
      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
  }

  function getTileColor(letter, index) {
    const isCorrectLetter = word.includes(letter);
    if (!isCorrectLetter) {
      return 'rgb(58, 58, 60)';
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return 'rgb(83, 141, 70)';
    }

    return 'rgb(181, 159, 59)';
  }
  function handleSubmitWord() {
    const currentWordArray = getCurrentWordArray();
    if (currentWordArray.length !== 5) {
      window.alert('Word must be 5 letters');
    }

    const currentWord = currentWordArray.join('');

    const firstLetterId = gussedWordCount * 5 + 1;

    const interval = 200;
    currentWordArray.forEach((letter, index) => {
      setTimeout(() => {
        const tileColor = getTileColor(letter, index);
        const letterId = firstLetterId + index;
        const letterEl = document.getElementById(letterId);
        letterEl.classList.add('animate__flipInX');
        letterEl.style = `background-color: ${tileColor}; border-color: ${tileColor}`;
      }, interval * index);
    });

    gussedWordCount += 1;

    if (currentWord == word) {
      window.alert('Congratulations!');
    }

    if (guessedWords.length === 6) {
      window.alert(`Sorry, you have no more guesses. The word was ${word}.`);
    }

    guessedWords.push([]);
  }

  function createSquares() {
    const gameBoard = document.getElementById('board');

    for (let index = 0; index < 30; index++) {
      let square = document.createElement('div');
      square.classList.add('square');
      square.classList.add('animate__animated');
      square.setAttribute('id', index + 1);
      gameBoard.appendChild(square);
    }
  }
  for (let index = 0; index < keys.length; index++) {
    keys[index].onclick = ({ target }) => {
      const letter = target.getAttribute('data-key');
      if (letter === 'enter') {
        handleSubmitWord();
        return;
      }
      updateGuessedWords(letter);
    };
  }
});
