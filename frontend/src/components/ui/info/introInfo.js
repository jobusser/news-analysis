function IntroInfo() {
  return (
    <>
      <h1>Global news analysis</h1>
      <hr className="separator" />
      <p>
        Select a country or try a search to start.
        More information on the workings of the website is given below.
      </p>

      <hr className="separator" />
      <h3> GDELT </h3>
      <p>
        The <a href="https://www.gdeltproject.org">GDELT Project</a> is a global monitoring system
        that tracks news of all types across the world in multiple languages.
        The insights from codifying human society in realtime using GDELT allows for the
        comparison of themes, emotions, and events throughout various regions.
      </p>
      <p>
        The core functionality of this website is powered by
        the <a href="https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/">GDELT Doc API</a>.
        With the goal of aggregating text-based news to provide a comparable overview
        of country-specific focus, this website monitors the text news published worldwide
        with updates occurring every 15 minutes.
      </p>
      <p>
        The GDELT project, most unfortunately, does not specify the language and location reach.
        Keep in mind that the comparisons and articles you find here are not perfect.
      </p>

      <h3> The search </h3>
      <p>
        A search query comprises of several elements.
        At least one of the search fields are required.
        The search query includes:
        <ul>
          <li><strong>Source Country:</strong> as selected on the globe, the country where the article was published.</li>
          <li><strong>Keys:</strong> exact matches in the article title and text.</li>
          <li><strong>Theme:</strong> predefined categories of news through natural language processing.</li>
          <li><strong>Language:</strong> language of the articles.</li>
        </ul>
        The news of the last 24 hours is shown by default.
      </p>

      <h3> What you will see</h3>
      <p>
        An overview of everything that can be found is provided.
        A key, theme, or language search allows for the comparison of
        country-specific news.
        Countries are compared by the percentage of articles published in that
        country that are relevant to the search.
        Country relevance is shown from yellow to red. Red means that
        1o percent or more of the articles in that country relate to the
        search.
        A grey color indicates that no relevant articles were found,
        this could indicate a percentage of 0 or that GDELT does not monitor
        that country.

        Articles are provided based on how closely they relate to the
        search query and how reputable the source of news is.
        This sorting is done by GDELT.
      </p>

      <h3> The analysis </h3>
      <p>
        You will see an overview of all relevant news articles.
        Searches by key, theme, or language allow for the comparison of country-specific news across the world.
        Countries are compared based on the percentage of articles relevant to your search.
      </p>
      <p>
        A color scale from yellow to red indicates how relevant the search is within a country.
        A yellow highlight indicates that few relevant articles were found in that country.
        A red highlight indicates that 10% or more of the articles in that country are relevant to the search.
        A grey colormeans that no relevant articles found, which may indicate either a 0% relevance or that GDELT does not monitor that country.
      </p>
      <p>
        Articles are sorted by how closely they match the search query and the reputation of the news source. This sorting is handled by GDELT.
      </p>


    </>
  )
}

export default IntroInfo;
