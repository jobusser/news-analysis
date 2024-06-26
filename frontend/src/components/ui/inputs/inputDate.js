import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const InputDate = forwardRef(({ label, placeholder, formSubmit }, ref) => {
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  function handleChange(event) {

    const input = event.target.value.replace(/[^\d/]/g, '');


    if (input.length < date.length) {
      setDate(input);
      return
    }

    let formattedDate = input;

    if (input.length === 2) {
      formattedDate = input + '/';
    } else if (input.length === 5) {
      formattedDate = input + '/';
    }

    if (input.length > 10) {
      formattedDate = input.slice(0, 11);
    }

    setDate(formattedDate);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && isFocused) {
      event.preventDefault();
      setIsFocused(false);
      inputRef.current.blur();

      formSubmit();
    }
  }


  function validate() {
    if (date === '') {
      setError('');
      return date;
    }

    const parts = date.split('/');
    const formattedDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]), 0, 0, 0);

    if (!formattedDate.valueOf()
      || parseInt(parts[0]) !== formattedDate.getDate()
      || parseInt(parts[1]) - 1 !== formattedDate.getMonth()
      || parseInt(parts[2]) !== formattedDate.getFullYear()) {

      setError('Invalid date.');
      return null;
    }

    const lowerLimit = new Date(2017, 0, 1);
    const upperLimit = new Date().setHours(23, 59, 59);

    if (formattedDate > upperLimit) {
      setError("Date cannot be in the future.");
      return null;

    } else if (formattedDate < lowerLimit) {
      setError("Only articles in 2017 or later are considered.");
      return null;
    }

    setError('');
    return formattedDate;

  }


  useImperativeHandle(ref, () => ({
    getValue: () => validate(),
  }));

  useEffect(() => {
    validate();
  }, [isFocused]);

  return (
    <>
      <div className="input-container" style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="date-input" >{label}</label>
        <div className='input-wrapper'>
          <input
            id="date-input"
            type="text"
            value={date}
            ref={inputRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            placeholder={placeholder}
          />
        </div>
      </div>

      {error && (<p className='input-error'>{error}</p>)}
    </>
  );
});

export default InputDate;

