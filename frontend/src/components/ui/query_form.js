import React, { useState, useEffect } from 'react';
import InputFromList from './inputs/inputFromList';
import InputDate from './inputs/inputDate';
import InputText from './inputs/inputText';
import ToggleButton from './inputs/toggleButton';

import { useCountry } from '../context/countryProvider';

import { getLanguageSearch, getThemeSearch } from './utils/fuzzySearchers';

// TODO: add error for each input type, and bigger error for specifying query needs at least one
function QueryForm() {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { formData, setFormData } = useCountry();

  function toggleOptions() {
    setShowMoreOptions(!showMoreOptions)
  }


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


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('e:', e);
    console.log('formData:', formData);
    // Here you can add code to handle the submission of the form data
  };

  return (
    <>
      <ToggleButton
        id={'options-button'}
        textOff={'Show more options'}
        textOn={'Show less options'}
        toggleCallback={toggleOptions}
      />

      <h1>
        Query
      </h1>

      <form className="query-form" onSubmit={handleSubmit}>
        <InputText
          label={showMoreOptions ? "Key 1" : 'Key'}
          placeholder={''}
          formKey={"key1"}
          formSubmit={formSubmit}
        />

        {showMoreOptions && (
          <>
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

            <h1>
              Dates
            </h1>

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
          </>
        )}
      </form>
    </>
  );
}

export default QueryForm;
