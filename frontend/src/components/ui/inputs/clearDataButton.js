import React, { useState, useEffect } from 'react';
import { IoRemove } from "react-icons/io5";
import { ClipLoader, MoonLoader, PulseLoader } from "react-spinners";

import { useCountry } from '../../context/countryProvider';

function ClearDataButton({ id, size }) {
  const { awaitingData, isData, clearData } = useCountry();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  function handleClick() {
    clearData();
  }

  useEffect(() => {
    if (awaitingData) {
      setTooltipText("Loading");
      setIsLoading(true);
      setIsVisible(true);
    } else if (isData) {
      setTooltipText("Clear search");
      setIsLoading(false);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

  }, [awaitingData, isData]);

  useEffect(() => {
    function updateCursorPosition(event) {
      setCursorX(event.clientX);
      setCursorY(event.clientY);
    }
    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };





  const tooltipStyle = {
    top: `${cursorY + 10}px`,
    left: `${cursorX + 10}px`,
  };


  const loaderCss = {
    borderColor: "#ccc",
    borderWidth: "2px",
    width: "50%",
    height: "50%",
  };


  return (
    <>
      {isVisible && (
        <>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
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
          </div>

          {tooltipVisible && (
            <div className="tooltip" style={tooltipStyle}>
              {tooltipText}
            </div>
          )}
        </>

      )
      }
    </>

  )

}

export default ClearDataButton;
