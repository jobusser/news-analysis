import React, { useState, useEffect } from 'react';
import countriesData from '../assets/data/countries.geo.json';
import Country from './country';


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

