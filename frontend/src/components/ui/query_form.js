import React, { useState, useEffect } from 'react';
import InputFromList from './inputs/inputFromList';
import InputDate from './inputs/inputDate';
import InputText from './inputs/inputText';

import { getLanguageSearch, getThemeSearch } from './utils/fuzzySearchers';

// TODO: add error for each input type, and bigger error for specifying query needs at least one
function QueryForm() {
  const [formData, setFormData] = useState({
    key1: '',
    key2: '',
    key3: '',
    theme: '',
    sourceLang: '',
    dateStart: '',
    dateEnd: ''
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
      <InputText
        label={"Key 1"}
        placeholder={''}
        formKey={"key1"}
        formSubmit={formSubmit}
      />
      <InputText
        label={"Key 2"}
        placeholder={''}
        formKey={"key2"}
        formSubmit={formSubmit}
      />
      <InputText
        label={"Key 3"}
        placeholder={''}
        formKey={"key3"}
        formSubmit={formSubmit}
      />
      <InputFromList
        label={"Theme:"}
        placeholder={"Search theme"}
        fuzzySearcher={getThemeSearch()}
        formKey={'theme'}
        formSubmit={formSubmit}
      />
      <InputFromList
        label={"Language:"}
        placeholder={"Search language"}
        fuzzySearcher={getLanguageSearch()}
        formKey={'sourceLang'}
        formSubmit={formSubmit}
      />
      <InputDate
        label={"From"}
        placeholder={"DD/MM/YYYY"}
        formKey={'dateStart'}
        formSubmit={formSubmit}
      />

      <InputDate
        label={"To"}
        placeholder={"DD/MM/YYYY"}
        formKey={'dateEnd'}
        formSubmit={formSubmit}
      />
    </form>
  );
}

export default QueryForm;
