import React, { useState, useEffect } from "react";
import { useCountry } from "../../context/countryProvider";

function NewsHeader() {
  const { selectedCountry } = useCountry();

  const [name, setName] = useState("");
  const [iso, setIso] = useState("");
  const [continent, setContinent] = useState("");

  useEffect(() => {
    if (selectedCountry) {
      setName(selectedCountry.name);
      setIso(selectedCountry.iso_a3);
      setContinent(selectedCountry.continent);

    } else {
      setName("Earth");
      setIso("");
      setContinent("");
    }

  }, [selectedCountry]
  );

  return (
    <div>
      <h2>{name}</h2>
      {selectedCountry && (
        <>
          <h3>{iso}</h3>
          <h3>{continent}</h3>
        </>
      )}
    </div>
  );

}

export default NewsHeader;

