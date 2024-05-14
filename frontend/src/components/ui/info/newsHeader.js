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
    <div id="news-header" className="content">
      <h1>{name}</h1>
    </div>
  );

}

export default NewsHeader;

