import React, { useState, useEffect } from "react";
import { useCountry } from "../../context/countryProvider";

function NewsHeader() {
  const { newsOverview } = useCountry();

  const [name, setName] = useState("");

  useEffect(() => {
    if (newsOverview && newsOverview.selectedRegion) setName(newsOverview.selectedRegion);
    else setName("World");
  }, [newsOverview]
  );

  return (
    <div id="news-header" className="content">
      <h1>{name}</h1>
    </div>
  );

}

export default NewsHeader;

