import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchData } from '../../api/requests';

import { isQuery, isForm, getErrorMessage, formatRequestData } from './utils';

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [formData, setFormData] = useState({
    key1: '',
    key2: '',
    key3: '',
    theme: '',
    sourcelang: '',
    dateStart: null,
    dateEnd: null,
  });

  const [articles, setArticles] = useState(null);
  const [worldVolume, setWorldVolume] = useState(null);
  const [countryVolume, setCountryVolume] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('FORMDATA', formData);
    let localError = ''; // avoid asynchronously updating error state

    const formattedFormData = formatRequestData(selectedCountry, formData);
    console.log('Formatted data in provider', formattedFormData);

    // make requests
    // // TODO: error checking on responses
    (async function() {
      const data = await fetchData(formattedFormData);
      console.log("Received all data", data);


      {/*
      // request raw volume
      if (!localError && isQuery(selectedCountry, formData)) {
        // request country data
        const countryVolumeResponse = await getCountryVolume(selectedCountry, formData);
        if (countryVolumeResponse.success) {
          console.log("Received country volume data", countryVolumeResponse.data)
          setCountryVolume(countryVolumeResponse.data)
        } else {
          localError = countryVolumeResponse.data;
        }
      } else {
        setCountryVolume(null);
      }

      // request world volume
      if (!localError && isForm(formData)) {
        // request country data
        const worldVolumeResponse = await getWorldVolume(selectedCountry, formData);
        if (worldVolumeResponse.success) {
          console.log("Received world volume data", worldVolumeResponse.data)
          setWorldVolume(worldVolumeResponse.data)
        } else {
          localError = worldVolumeResponse.data;
        }
      } else {
        setWorldVolume(null);
      }
        */}

      if (localError) {
        setError(localError);
      }
    })();

  }, [selectedCountry, formData]);


  // error timeout
  useEffect(() => {
    if (error !== '') {
      const timer = setTimeout(() => {
        setError('');
      }, 5000); // Clear error after 5 seconds
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
      setFormData,
      articles,
      worldVolume,
      countryVolume
    }}>
      {children}
      {error && <div className={'big-error'}>
        {error}
      </div>}
    </CountryContext.Provider >
  );
};

export const useCountry = () => useContext(CountryContext);
