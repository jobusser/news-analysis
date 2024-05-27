import React, { useState, useEffect } from "react";
import { useCountry } from "../../context/countryProvider";

function NewsHeader() {
  const { selectedCountry } = useCountry();

  const [name, setName] = useState("");

  useEffect(() => {
    if (selectedCountry) setName(selectedCountry.name);
    else setName("Earth");

  }, [selectedCountry]
  );

  return (
    <div id="news-header" className="content">
      <h1>{name}</h1>
    </div>
  );

}

export default NewsHeader;

