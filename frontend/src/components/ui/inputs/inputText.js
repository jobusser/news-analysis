import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const InputText = forwardRef(({ label, placeholder, formSubmit }, ref) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  function handleKeyDown(event) {
    if (event.key === 'Enter' && isFocused) {
      event.preventDefault();
      setIsFocused(false);
      inputRef.current.blur();

      formSubmit()
    }
  }

  // TODO: at least three characters and other validations
  function validate() {
    console.log("IN VALIDATE!!!");
    const alphaNumeric = /^[a-z0-9 ]*$/;
    if (text.match(alphaNumeric)) {
      setError('');
      return text;
    } else {
      setError('No special characters');
      return null;
    }
  };


  useImperativeHandle(ref, () => ({
    getValue: () => validate(),
  }));

  useEffect(() => {
    validate();
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
});

export default InputText;


