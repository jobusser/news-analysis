import React, { createContext, useContext, useState } from 'react';

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  // TODO: add article volume on hover
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [queryData, setQueryData] = useState({
    // TODO: set up full context for query and expose it via functions
    key1: null,
    key2: null,
    key3: null,
    theme: null,
    sourcelang: null,

  });


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
