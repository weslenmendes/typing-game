import React from 'react';

import useKeys from './hooks/useKeys';

import Word from './components/Word';
import CompletedWords from './components/CompletedWords';

const MAX_TYPED_KEYS = 30;

const App = () => {
  const { handleKeyDown, word, validKeys, typedKeys, completedWords } =
    useKeys(MAX_TYPED_KEYS);

  return (
    <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="valid-keys">
        <Word word={word} validKeys={validKeys} />
      </div>
      <div className="typed-keys">{typedKeys}</div>
      <CompletedWords data={completedWords} />
    </div>
  );
};

export default App;
