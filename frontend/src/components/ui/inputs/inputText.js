import React, { useState, useEffect, useRef } from 'react';

function InputText({ label, placeholder, formKey, formSubmit }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

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
      const alphaNumeric = /^[a-z0-9]*$/;

      if (text.match(alphaNumeric)) {
        setError('');
        formSubmit(formKey, text)
      } else {
        setError('No special characters');
      }
    }
  }, [isFocused]);

  return (
    <div className="input-container" style={{ display: 'flex', alignItems: 'center' }}>
      <label htmlFor="text-input" >{label}</label>
      <input
        id="text-input"
        type="text"
        value={text}
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
      />
      {error && (<p> {error} </p>)}
    </div>
  );
}

export default InputText;


