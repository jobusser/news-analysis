import React from "react";

function Article({ number, article, includeCountry }) {
  const {
    title,
    url,
    domain,
    seendate,
    language,
    sourcecountry,
    socialimage
  } = article;

  const baseSiteUrl = new URL(url).origin;
  const defaultImage = "https://via.placeholder.com/150?text=News";

  return (
    <div className="article">
      <div className="article-header">
        <div className="article-title">
          <h2>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h2>
        </div>
        <div className="article-image-wrapper">
          <img
            className="article-image"
            src={socialimage || defaultImage}
            alt="Article Image"
            onError={(e) => { e.target.src = defaultImage; }}
          />
        </div>
      </div>

    </div>
  );
}

export default Article;
