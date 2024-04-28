import React, { createContext, useContext, useState } from 'react';

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  function selectCountry(countryName) {
    console.log("Selected Country:", countryName);
    setSelectedCountry(countryName);
  };

  function setHoverCountry(countryName) {
    console.log(countryName);
    setHoveredCountry(countryName);
  };


  return (
    <CountryContext.Provider value={{
      selectedCountry,
      selectCountry,
      hoveredCountry,
      setHoverCountry
    }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
