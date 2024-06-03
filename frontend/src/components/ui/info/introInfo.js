import GlobeIcon from "./globeIcon";

function IntroInfo() {

  return (
    <>
      <div className="intro-logo">
        <div id="globe-icon">
          <GlobeIcon size={60} />
        </div>
        <div>
          Nav
        </div>
        <div>
          News
        </div>
      </div>

      <hr className="separator" />

      <p>
        Select a country or try a search to start.
        More information on the workings of <span className="green highlight">NavNews</span> is given below.
      </p>

      <hr className="separator" />
      <h3> The data </h3>
      <p>
        The <a href="https://www.gdeltproject.org">GDELT Project</a> is a global monitoring system
        that tracks news across the world.
        Codifying human society in realtime using GDELT allows for
        insights of themes, emotions, and events throughout various regions.
      </p>
      <p>
        The core of <span class="green highlight">NavNews</span> is powered by the <a href="https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/">GDELT Doc API</a>.
        Text-based news throughout is aggregated to compare country-specific focus by monitoring the
        news published worldwide with updates every 15 minutes.
      </p>
      <p>
        The GDELT project, most unfortunately, does not specify its language and location reach.
        Keep in mind that the comparisons and articles you find here are not perfect.
      </p>

      <h3> The search </h3>
      <p>
        A search query comprises of an article source country as selected on the globe, and the search box items:
      </p>

      <div className='form-simulation'>
        <div className="input-simultation" style={{ display: 'flex', alignItems: 'center' }}>
          <div className='input-simulation-label'> Keys: </div>
          <div className='input-simulation-input'> exact matches in the title and text of articles </div>
        </div>

        <div className="input-simultation" style={{ display: 'flex', alignItems: 'center' }}>
          <div className='input-simulation-label'> Theme: </div>
          <div className='input-simulation-input'>  categories determined with GDELT's NLP </div>
        </div>

        <div className="input-simultation" style={{ display: 'flex', alignItems: 'center' }}>
          <div className='input-simulation-label'> Language: </div>
          <div className='input-simulation-input'> publishing language. </div>
        </div>
      </div>

      <p>
        Note that the input is case insensitive. The news of the last week is shown if dates are not entered.
      </p>

      <h3> The result </h3>
      <p>
        An overview of all articles relating to the search query is presented.
        Searches by <span>key</span>, <span>theme</span>, or <span>language</span> allow for the comparison of country-specific coverage intensity across the world.
      </p>
      <p>
        A color scale indicates how relevant the search is within a country.
        A <span class="yellow highlight">yellow country</span> has a smaller coverage percentage of published articles relating to the search query.
        A <span class="red highlight">red country</span> indicates that 10% or more of the articles published in the region relate to the search.
        A <span class="grey highlight">grey country</span> has no relevant articles relating to the search,
        which may either indicate a relevance of 0% or that GDELT does not monitor that country.
      </p>
      <p>
        Specific articles are provided based on how closely they relate to the
        search query and how reputable the publisher is.
        This sorting is done by GDELT.
      </p>


    </>
  )
}

export default IntroInfo;
