import React, { useState, useEffect } from 'react';

import Country from './country';
import countriesData from '../assets/data/countries.geo.json';

const CountryLayer = ({ globeRadius }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setCountries(countriesData.features);
  }, [countriesData]);

  return (
    <>
      {countries.map((feature, index) => (
        <Country key={index} feature={feature} globeRadius={globeRadius * 1.05} />
      ))}
    </>
  );
};

export default CountryLayer;
