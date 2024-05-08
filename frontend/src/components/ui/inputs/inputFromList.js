import React, { useState, useEffect, useRef } from 'react';

function InputFromList({ label, placeholder, fuzzySearcher, formKey, formSubmit }) {
  const [inputText, setInputText] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // search suggestions
  useEffect(() => {
    if (inputText.length > 0) {
      const searchResults = fuzzySearcher.search(inputText).filter(item => item.score < 0.1).slice(0, 4);
      console.log(searchResults);

      if (searchResults.length > 0 && searchResults[0].score < 0.0000001) {
        setSearchResults([]);
      } else {
        setSearchResults(searchResults);
      }

    } else {
      setSearchResults([]);
    }
  }, [inputText]);

  function handleSuggestionSelect(item) {
    setInputText(item.item.key);
  };

  function handleKeyDown(event) {
    if (event.key === 'Enter' && isFocused) {
      event.preventDefault();
      setIsFocused(false);
      inputRef.current.blur();
    }
  }

  // submit
  useEffect(() => {
    if (!isFocused) {
      // TODO: add input validation/ error message
      const searchRes = fuzzySearcher.search(inputText);

      let inputValue = '';
      if (searchRes.length > 0) {
        setInputText(searchRes[0].item.key);
        inputValue = searchRes[0].item.value;
      }
      formSubmit(formKey, inputValue);
    }
  }, [isFocused]);



  return (
    <div className="input-container">

      <input
        type="text"
        value={inputText}
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
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

