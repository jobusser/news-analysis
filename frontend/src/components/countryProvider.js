import React, { createContext, useContext, useState } from 'react';

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const selectCountry = (countryName) => {
    console.log("Selected Country:", countryName);
    setSelectedCountry(countryName);
  };

  return (
    <CountryContext.Provider value={{ selectCountry, selectCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
