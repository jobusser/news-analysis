import React, { createContext, useContext, useState } from 'react';

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  function selectCountry(countryName) {
    console.log("Selected Country:", countryName);
    setSelectedCountry(countryName);
  };

  return (
    <CountryContext.Provider value={{ selectedCountry, selectCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
