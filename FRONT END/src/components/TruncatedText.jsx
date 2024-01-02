// TruncatedText.jsx
import React from 'react';
import Tooltip from 'react-tooltip-lite';

const TruncatedText = ({ text, maxChars }) => {
  const truncatedText = text.length > maxChars ? `${text.slice(0, maxChars)}...` : text;

  return (
    <Tooltip content={text} direction="up">
      <span className="truncate">{truncatedText}</span>
    </Tooltip>
  );
};

export default TruncatedText;
