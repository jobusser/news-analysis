import React, { useState } from 'react';
import { IoArrowDown, IoArrowUp } from "react-icons/io5";

function ExpandButton({ id, toggleCallback, size }) {
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
        {toggle ? (
          <IoArrowUp size={size} />
        ) : (
          <IoArrowDown size={size} />
        )}
      </button>
    </div>
  )

}

export default ExpandButton;
