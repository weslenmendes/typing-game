import React from 'react';

const Word = ({ word, validKeys }) => {
  if (!word) return null;

  const joinedKeys = validKeys.join('');
  const matched = word.slice(0, joinedKeys.length);
  const remainder = word.slice(joinedKeys.length);

  if (matched.length === word.length) {
    return (
      <>
        <span className="matched animated">{matched}</span>
        <span className="remainder">{remainder}</span>
      </>
    );
  }

  return (
    <>
      <span className="matched">{matched}</span>
      <span className="remainder">{remainder}</span>
    </>
  );
};

export default Word;
