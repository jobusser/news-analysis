import React, { useState } from 'react';

function ToggleButton({ id, textOff, textOn, toggleCallback }) {
  const [toggle, setToggle] = useState(false);

  const toggleOptions = () => {
    setToggle(!toggle);
    toggleCallback();
  };

  return (
    <div id={id}>
      <button
        type='button'
        onClick={toggleOptions}
      >
        {toggle ? textOn : textOff}
      </button>
    </div>
  )

}

export default ToggleButton;
