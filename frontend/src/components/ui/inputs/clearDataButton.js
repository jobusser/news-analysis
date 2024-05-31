import React, { useState, useEffect } from 'react';
import { IoRemove } from "react-icons/io5";
import { ClipLoader, MoonLoader, PulseLoader } from "react-spinners";

import { useCountry } from '../../context/countryProvider';

function ClearDataButton({ id, size }) {
  const { awaitingData, isData, clearData } = useCountry();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    clearData();
  }

  useEffect(() => {
    if (awaitingData) {
      setIsLoading(true);
      setIsVisible(true);
    } else if (isData) {
      setIsLoading(false);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

  }, [awaitingData, isData]);

  const loaderCss = {
    borderColor: "#ccc",
    borderWidth: "2px",
    width: "50%",
    height: "50%",
  };


  return (
    <>
      {isVisible && (
        <button
          type='button'
          disabled={isLoading}
          onClick={handleClick}
        >
          {isLoading ? (
            <ClipLoader
              cssOverride={loaderCss}
              speedMultiplier={0.5}
            />
          ) : (
            <IoRemove size={size} />
          )}
        </button>
      )}
    </>

  )

}

export default ClearDataButton;
