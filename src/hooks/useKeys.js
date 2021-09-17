import { useState, useEffect } from 'react';

import useWord from './useWord';

import isValidKeys from '../utils/isValidKeys';

export default function useKeys({ MAX_TYPED_KEYS }) {
  const [typedKeys, setTypedKeys] = useState([]);
  const [validKeys, setValidKeys] = useState([]);

  const { completedWords, word, setCompletedWords, setWord, getWord } =
    useWord();

  useEffect(() => {
    const wordFromValidKeys = validKeys.join('').toLowerCase();
    let setTimeoutID;

    if (word && word === wordFromValidKeys) {
      let newWord = null;
      do {
        newWord = getWord();
      } while (completedWords.includes(newWord));

      if (validKeys.length === word.length) {
        setTimeoutID = setTimeout(() => {
          setWord(newWord);
          setValidKeys([]);
          setCompletedWords((prev) => [...prev, word]);
        }, 300);
      }
    }

    return () => {
      clearTimeout(setTimeoutID);
    };
  }, [word, validKeys, completedWords, getWord, setWord, setCompletedWords]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    const { key } = e;

    setTypedKeys((prev) => [...prev, key].slice(MAX_TYPED_KEYS * -1));

    if (isValidKeys(key, word)) {
      setValidKeys((prev) => {
        const isValidLength = prev.length <= word.length;
        const isNextChar = isValidLength && word[prev.length] === key;

        return isNextChar ? [...prev, key] : prev;
      });
    }
  };

  return { handleKeyDown, word, validKeys, typedKeys, completedWords };
}
