import wordList from '../resources/words.json';

const getWord = () => {
  const index = Math.floor(Math.random() * wordList.length);
  const word = wordList[index];

  return word.toLowerCase();
};

export default getWord;
