import React, { useState, useEffect } from 'react';

import Country from './country';
import CountryTerritory from './countryTerritory';
import countriesData from '../../assets/data/custom.geo.json';

const CountryLayer = ({ globeRadius }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setCountries(countriesData.features);
  }, [countriesData]);

  return (
    <>
      {countries.flatMap((feature, index) => {
        const territories = getTerritories(feature);
        return territories.map((territory, idx) => (
          <CountryTerritory
            key={`${index}-${idx}`}
            countryData={territory.countryData}
            coordinates={territory.coordinates}
            globeRadius={globeRadius * 1.04}
          />
        ));
      })}
    </>
  );
};

function getTerritories(feature) {
  const countryData = {
    name: feature.properties.name,
    nameLong: feature.properties.namelong,
    abbrev: feature.properties.abbrev,
    fips_10: feature.properties.fips_10,
    iso_a2: feature.properties.iso_a2,
    iso_a3: feature.properties.iso_a3,
    continent: feature.properties.continent,
    sovereignt: feature.properties.sovereignt,
  };

  const { coordinates, type } = feature.geometry;
  const geometries = type === 'Polygon' ? [coordinates] : coordinates;

  return geometries.map(coords => ({
    countryData,
    coordinates: coords
  }));
}

export default CountryLayer;
