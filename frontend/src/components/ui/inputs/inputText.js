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

  function validate() {
    const inputText = text.trim();

    if (inputText.length !== 0 && inputText.length < 3) {
      setError('Key is too short.');
      return null;
    }
    const acceptable = /^[a-zA-Z ]*$/;
    if (!inputText.match(acceptable)) {
      setError('No numbers or special characters.');
      return null;
    } else {
      setError('');
      setText(inputText);
      return inputText;
    }
  };


  useImperativeHandle(ref, () => ({
    getValue: () => validate(),
  }));

  useEffect(() => {
    validate();
  }, [isFocused]);

  return (
    <>
      <div className="input-container" style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="text-input" >{label}</label>
        <div className='input-wrapper'>
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
        </div>
      </div>

      {error && (<p className='input-error'>{error}</p>)}
    </>
  );
});

export default InputText;


