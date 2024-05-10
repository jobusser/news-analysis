import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCountry, getCountryVolume, getWorldVolume } from './requests';

import { isQuery, getErrorMessage } from './utils';

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

  // TODO: change to only be if dates are filled in and country not selected
  useEffect(() => {
    setError(getErrorMessage(selectedCountry, formData))

    if (!error && isQuery(selectedCountry, formData)) {
      (async function() {
        const response = await getCountry(selectedCountry, formData);
        if (!response.success) {
          setError(response.data);
        } else {
          console.log("Received data successfully");
        }
      })();
    }
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
      formData,
      setFormData
    }}>
      {children}
      {error && <div className={'big-error'}>
        {error}
      </div>}
    </CountryContext.Provider >
  );
};

export const useCountry = () => useContext(CountryContext);
