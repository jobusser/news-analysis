import React, { useState, useEffect } from 'react';

function InputFromList({ label, placeholder, fuzzySearcher, onFormChange }) {
  const [inputText, setInputText] = useState('');
  const [searchResults, setSearchResults] = useState('');

  useEffect(() => {
    if (inputText.length > 0) {
      const searchResults = fuzzySearcher.search(inputText).filter(item => item.score < 0.1).slice(0, 4);
      console.log(searchResults);

      if (searchResults[0].score < 0.00001) {
        setSearchResults([]);
      } else {
        setSearchResults(searchResults);
      }

    } else {
      setSearchResults([]);
    }
  }, [inputText]);

  function handleSuggestionSelect(item) {
    console.log("IN select:", item)
    setInputText(item.item.key);
  };

  function handleSubmit() {
    console.log("Submitted " + label);
  }



  return (
    <div className="input-container">

      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)} placeholder={placeholder} /> {searchResults.length > 0 && (
          <ul>
            {searchResults.map((item, index) => (
              <li key={index} onClick={() => handleSuggestionSelect(item)}>
                {item.item.key}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

export default InputFromList;

