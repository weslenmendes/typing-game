import React, { useState, useEffect } from 'react';

import Word from './components/Word';

import getWord from './utils/getWord';
import isValidKeys from './utils/isValidKeys';

const MAX_TYPED_KEYS = 30;

const App = () => {
  const [typedKeys, setTypedKeys] = useState([]);
  const [validKeys, setValidKeys] = useState([]);
  const [completedWords, setCompletedWords] = useState([]);
  const [word, setWord] = useState('');

  useEffect(() => {
    setWord(getWord());
  }, []);

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
  }, [word, validKeys, completedWords]);

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

  return (
    <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="valid-keys">
        <Word word={word} validKeys={validKeys} />
      </div>
      <div className="typed-keys">{typedKeys}</div>
      <div className="completed-words">
        <ol>
          {completedWords.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default App;
