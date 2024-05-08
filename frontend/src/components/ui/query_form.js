import React, { useState, useEffect } from 'react';
import InputFromList from './inputs/inputFromList';

import { getLanguageSearch, getThemeSearch } from './utils/fuzzySearchers';

// TODO: add error for each input type, and bigger error for specifying query needs at least one
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

  function formSubmit(key, value) {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }));
    //TODO: add form validation
  }

  useEffect(() => {
    console.log('Form data after update: ', formData);
  }, [formData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('e:', e);
    console.log('formData:', formData);
    // Here you can add code to handle the submission of the form data
  };

  return (
    <form className="query-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="key1" value={formData.key1}
        placeholder="key1"
        defaultValue={""}
      />
      <input
        type="text"
        name="key2"
        value={formData.key2}
        placeholder="key2"
        defaultValue={""}
      />
      <input
        type="text"
        name="key3"
        value={formData.key3}
        placeholder="key3"
        defaultValue={""}
      />
      <InputFromList
        label={"themeSearch"}
        placeholder={"Search theme"}
        fuzzySearcher={getThemeSearch()}
        formKey={'theme'}
        formSubmit={formSubmit}
      />
      <InputFromList
        label={"langSearch"}
        placeholder={"Search language"}
        fuzzySearcher={getLanguageSearch()}
        formKey={'sourceLang'}
        formSubmit={formSubmit}
      />
      <input
        type="text"
        name="start"
        value={formData.start}
        placeholder="start"
        defaultValue={""}
      />
      <input
        type="text"
        name="end"
        value={formData.end}
        onChange={handleChange}
        placeholder="end"
        defaultValue={""}
      />
    </form>
  );
}

export default QueryForm;
