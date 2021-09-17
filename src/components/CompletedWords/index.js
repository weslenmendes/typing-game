import React from 'react';

const CompletedWords = ({ data: completedWords }) => {
  return (
    <div className="completed-words">
      <ol>
        {completedWords.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ol>
    </div>
  );
};

export default CompletedWords;
