import React, { createContext, useContext, useEffect, useState } from 'react';

import { getErrorMessage } from './utils';

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [error, setError] = useState('');

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [formData, setFormData] = useState({
    key1: '',
    key2: '',
    key3: '',
    theme: '',
    sourcelang: '',
    dateStart: '',
    dateEnd: '',
  });

  useEffect(() => {
    setError(getErrorMessage(selectedCountry, formData))
    console.log('ERROR', error);

    if (!error) {
      console.log('Make backend call');
    }
    console.log("Hovered", hoveredCountry);
    console.log("Selected", selectedCountry);
  }, [selectedCountry, formData]);

  // error timeout
  useEffect(() => {
    if (error !== '') {
      const timer = setTimeout(() => {
        setError('');
      }, 25000); // Clear error after 5 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [error]);

  return (
    <CountryContext.Provider value={{
      selectedCountry,
      setSelectedCountry,
      hoveredCountry,
      setHoveredCountry,
    }}>
      {children}
      {error && <div className={'big-error'}>
        {error}
      </div>}
    </CountryContext.Provider >
  );
};

export const useCountry = () => useContext(CountryContext);
