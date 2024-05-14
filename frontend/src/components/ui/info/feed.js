import React, { useState, useEffect } from "react";
import { useCountry } from "../../context/countryProvider";

import Article from "./article";

function Feed() {
  const { articles, selectedCountry } = useCountry();

  const [feedArticles, setFeedArticles] = useState(null);
  const [includeCountry, setIncludeCountry] = useState(false);

  useEffect(() => {
    if (articles) setFeedArticles(articles.articles);
    else setFeedArticles(null);

    if (selectedCountry) setIncludeCountry(false);
    else setIncludeCountry(true);

  }, [articles, selectedCountry]);

  return (
    <div className="feed-container">
      {feedArticles && feedArticles.map((article, index) => (
        <Article key={index} number={index + 1} article={article} includeCountry={includeCountry} />
      ))}
    </div>
  );
}

export default Feed;

