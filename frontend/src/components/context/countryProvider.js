import React, { createContext, useContext, useState } from 'react';

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);


  return (
    <CountryContext.Provider value={{
      selectedCountry,
      setSelectedCountry,
      hoveredCountry,
      setHoveredCountry,
    }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
