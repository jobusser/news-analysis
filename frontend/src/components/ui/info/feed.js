import React, { useState, useEffect } from "react";
import { useCountry } from "../../context/countryProvider";

import Article from "./article";

// TODO: automatically add articles on a scroll?
// Add back to top function?
function Feed() {
  const { articleList, selectedCountry } = useCountry();

  const [feedArticles, setFeedArticles] = useState(null);
  const [includeCountry, setIncludeCountry] = useState(false);

  useEffect(() => {
    if (articleList) setFeedArticles(articleList.articles);
    else setFeedArticles(null);

    if (selectedCountry) setIncludeCountry(false);
    else setIncludeCountry(true);

  }, [articleList, selectedCountry]);

  return (
    <div className="feed-container">
      {feedArticles ? (
        feedArticles.map((article, index) => (
          <Article key={index} number={index + 1} article={article} includeCountry={includeCountry} />
        ))
      ) : (
        <p>No articles were found.</p>
      )}
    </div>
  );
}
export default Feed;

