import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';


const InputFromList = forwardRef(({ label, placeholder, fuzzySearcher, formSubmit }, ref) => {
  const [inputText, setInputText] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);


  function handleKeyDown(event) {
    if (event.key === 'Enter' && isFocused) {
      event.preventDefault();
      setIsFocused(false);
      inputRef.current.blur();

      formSubmit();
    }
  }


  // search suggestions
  useEffect(() => {
    if (inputText.length > 0) {
      const searchResults = fuzzySearcher.search(inputText).filter(item => item.score < 0.1);

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



  function validate() {
    const searchRes = fuzzySearcher.search(inputText);

    let inputValue = '';
    if (searchRes.length > 0) {
      setInputText(searchRes[0].item.key);
      inputValue = searchRes[0].item.value;
    }
    return inputValue;
  }


  useImperativeHandle(ref, () => ({
    getValue: () => validate(),
  }));

  useEffect(() => {
    validate();
  }, [isFocused]);



  return (
    <div className="input-container">
      <label htmlFor="input-field">{label}</label>
      <div className="input-wrapper">
        <input
          id="input-field"
          type="text"
          value={inputText}
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={placeholder}
        />
        {isFocused && searchResults.length > 0 && (
          <ul>
            {searchResults.slice(0, 4).map((item, index) => (
              <li key={index} onMouseDown={() => handleSuggestionSelect(item)}>
                {item.item.key}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default InputFromList;
