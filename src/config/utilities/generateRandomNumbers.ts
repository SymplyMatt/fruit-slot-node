function shuffleArray(array: Array<number>): Array<number> {

  for (let i = array.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
export const generateRandomNumbers = (count : number ) : Array<number> => {
  const array_with_probabilities = [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,9,9,9];
  const newShuffleArray: Array<number> = shuffleArray(array_with_probabilities);
  const min = 1;
  const max = 9;
  const randomNumbers : Array<number>= [];

  for (let i = 0; i < count; i++) {
    const randomNumber : number = Math.floor(Math.random() * ((newShuffleArray.length -1) - min + 1)) + min;
    randomNumbers.push(newShuffleArray[randomNumber]);
  }

  return randomNumbers;
  }