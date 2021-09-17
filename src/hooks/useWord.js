import { useState, useEffect } from 'react';

import getWord from '../utils/getWord';

export default function useWords() {
  const [completedWords, setCompletedWords] = useState([]);
  const [word, setWord] = useState('');

  useEffect(() => {
    setWord(getWord());
  }, []);

  return {
    completedWords,
    setCompletedWords,
    word,
    setWord,
    getWord,
  };
}
