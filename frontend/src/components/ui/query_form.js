import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

import languages from '../../assets/data/GDELT_options/processedLanguages.json';

function QueryForm() {
  const [formData, setFormData] = useState({
    key1: '',
    key2: '',
    key3: '',
    theme: '',
    sourceLang: '',
    start: '',
    end: ''
  });

  const [selectedLang, setSelectedLang] = useState('');
  const [langSearchResults, setLangSearchResults] = useState([]);

  const fuseLanguageOptions = {
    isCaseSensitive: false,
    includeScore: true,
    keys: [
      "langCode",
      "langName"
    ]
  };

  const fuseLang = new Fuse(languages, fuseLanguageOptions);

  useEffect(() => {
    if (selectedLang.length > 2) { // Start searching when the query is 3 or more characters
      const searchResults = fuseLang.search(selectedLang).map(result => result.item.langName);
      console.log(fuseLang.search(selectedLang))
      console.log(searchResults)
      setLangSearchResults(searchResults);
    } else {
      setLangSearchResults([]);
    }
  }, [selectedLang]);

  const handleSelect = (item) => {
    setSelectedLang(item);
    setLangSearchResults([]); // Clear results after selection
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you can add code to handle the submission of the form data
  };

  return (
    <form className="query-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="key1" value={formData.key1}
        onChange={handleChange}
        placeholder="key1"
      />
      <input
        type="text"
        name="key2"
        value={formData.key2}
        onChange={handleChange}
        placeholder="key2"
      />
      <input
        type="text"
        name="key3"
        value={formData.key3}
        onChange={handleChange}
        placeholder="key3"
      />
      <input
        type="text"
        name="theme"
        value={formData.theme}
        onChange={handleChange}
        placeholder="theme"
      />
      <input
        type="text"
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)} placeholder="Search language" /> {langSearchResults.length > 0 && (
          <ul>
            {langSearchResults.map((item, index) => (
              <li key={index} onClick={() => handleSelect(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      <input
        type="text"
        name="start"
        value={formData.start}
        onChange={handleChange}
        placeholder="start"
      />
      <input
        type="text"
        name="end"
        value={formData.end}
        onChange={handleChange}
        placeholder="end"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default QueryForm;
