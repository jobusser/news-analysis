import React, { useState, useEffect, useRef } from 'react';

function InputDate({ label, placeholder, formKey, formSubmit }) {
  const [date, setDate] = useState('');
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
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
      const lowerLimit = new Date(2017, 0, 1);
      const upperLimit = new Date().setHours(23, 59, 59);

      if (date !== '' && !date.match(dateRegex)) {
        setError('Must be DD/MM/YYYY');
      } else if (date !== '' && new Date(date.split('/').reverse().join('-')) > upperLimit) {
        setError("Date cannot be in the future");
      } else if (date !== '' && new Date(date.split('/').reverse().join('-')) < lowerLimit) {
        setError("Date must be 2017 or later");

      } else {
        setError('')
        formSubmit(formKey, date);
      }
    }
  }, [isFocused]);

  return (
    <div className="input-container" style={{ display: 'flex', alignItems: 'center' }}>
      <label htmlFor="date-input" >{label}</label>
      <input
        id="date-input"
        type="text"
        value={date}
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        onChange={(e) => setDate(e.target.value)}
        placeholder={placeholder}
      />
      {error && (<p> {error} </p>)}
    </div>
  );
}

export default InputDate;

