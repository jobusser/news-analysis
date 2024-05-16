import React, { useState, useEffect, useRef } from 'react';
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

  const key1Ref = useRef();
  const key2Ref = useRef();
  const key3Ref = useRef();
  const themeRef = useRef();
  const languageRef = useRef();
  const dateStartRef = useRef();
  const dateEndRef = useRef();


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

  function handleFormSubmit() {
    console.log("SUBMIT BUTTON");
  }

  return (
    <div className='content-container'>
      <h1>Query</h1>
      <form className="query-form" onSubmit={(e) => e.preventDefault()}>
        <InputText
          ref={key1Ref}
          label={showMoreOptions ? "Key 1" : 'Key'}
          placeholder={''}
          formKey={"key1"}
          formSubmit={formSubmit}
        />
        {showMoreOptions && (
          <>
            <InputText
              ref={key2Ref}
              label={"Key 2"}
              placeholder={''}
              formKey={"key2"}
              formSubmit={formSubmit}
            />
            <InputText
              ref={key3Ref}
              label={"Key 3"}
              placeholder={''}
              formKey={"key3"}
              formSubmit={formSubmit}
            />
            <InputFromList
              ref={themeRef}
              label={"Theme:"}
              placeholder={"Search theme"}
              fuzzySearcher={getThemeSearch()}
              formKey={'theme'}
              formSubmit={formSubmit}
            />
            <InputFromList
              ref={languageRef}
              label={"Language:"}
              placeholder={"Search language"}
              fuzzySearcher={getLanguageSearch()}
              formKey={'sourceLang'}
              formSubmit={formSubmit}
            />
            <h1>Dates</h1>
            <InputDate
              ref={dateStartRef}
              label={"From"}
              placeholder={"DD/MM/YYYY"}
              formKey={'dateStart'}
              formSubmit={formSubmit}
            />
            <InputDate
              ref={dateEndRef}
              label={"To"}
              placeholder={"DD/MM/YYYY"}
              formKey={'dateEnd'}
              formSubmit={formSubmit}
            />
          </>
        )}
        <div className="button-container">
          <ToggleButton
            id={'options-button'}
            textOff={'Show more options'}
            textOn={'Show less options'}
            toggleCallback={toggleOptions}
          />
          <button
            id="submit-button"
            type="button"
            onClick={handleFormSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );


} export default QueryForm;
