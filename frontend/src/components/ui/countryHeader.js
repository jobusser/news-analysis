import React, { useState, useEffect } from "react";
import { useCountry } from "../context/countryProvider";

// TODO: country/world header with counts
function CountryNews() {
  const [isVisible, setIsVisible] = useState(true);
  const { selectedCountry } = useCountry();

  const [countryName, setCountryName] = useState("");
  const [countryISO, setCountryISO] = useState("");


  useEffect(() => {
    if (selectedCountry !== null) {
      setIsVisible(true);
      setCountryName(selectedCountry.name);
      setCountryISO(selectedCountry.iso_a2);

    } else {
      setIsVisible(false);
    }

  }, [selectedCountry]
  );


  if (!isVisible) return null;

  return (
    <div>
      <h2> {countryName} </h2>
      <h3> {countryISO} </h3>
      <h3> Country counts (with percentage) </h3>
      <h3> add some boxing for *visuals* </h3>




    </div>
  );
}

export default CountryNews;

