import React from "react";
import { IoImage, IoImageOutline } from "react-icons/io5";

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
      <div className="article-text">
        <div className="article-title">
          <h2>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h2>
        </div>
        <div className="article-tags">
          <span>
            <strong>
              <a href={baseSiteUrl} target="_blank" rel="noopener noreferrer">
                {domain}
              </a>
            </strong>
          </span>
          <span>
            <strong>{seendate.substring(6, 8) + "/" + seendate.substring(4, 6) + "/" + seendate.substring(0, 4)}</strong>
          </span>
          <span>
            <strong>{language}</strong>
          </span>
          {includeCountry && (
            <span>
              <strong>{sourcecountry}</strong>
            </span>
          )}
        </div>

      </div>

      <div className="article-image-wrapper">
        {socialimage ? (
          <img
            className="article-image"
            src={socialimage}
            alt="Article Image"
            onError={(e) => { e.target.src = defaultImage; }}
          />
        ) : (
          <IoImageOutline size={40} />
        )}
      </div>
    </div>
  );
}

export default Article;
