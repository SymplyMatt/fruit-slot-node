"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumbers = void 0;
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const generateRandomNumbers = (count) => {
    const array_with_probabilities = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9];
    const newShuffleArray = shuffleArray(array_with_probabilities);
    const min = 1;
    const max = 9;
    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * ((newShuffleArray.length - 1) - min + 1)) + min;
        randomNumbers.push(newShuffleArray[randomNumber]);
    }
    return randomNumbers;
};
exports.generateRandomNumbers = generateRandomNumbers;
