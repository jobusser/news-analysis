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

  function handleFormSubmit() {
    const localForm = {
      key1: '',
      key2: '',
      key3: '',
      theme: '',
      sourcelang: '',
      dateStart: '',
      dateEnd: '',
    };

    let isQuery = false;
    let isError = false;

    console.log("SUBMIT BUTTON");

    if (key1Ref.current) {
      const val = key1Ref.current.getValue();
      console.log('KEY1VAL', val);
      if (val) {
        localForm.key1 = val;
        isQuery = true;
      } else if (val !== '') {
        isError = true;
      }
    }

    console.log("LOCALFORM", localForm);

    if (isQuery && !isError) {
      setFormData(localForm);
    }


  }

  return (
    <div className='content-container'>
      <h1>Query</h1>
      <form className="query-form" onSubmit={(e) => e.preventDefault()}>
        <InputText
          ref={key1Ref}
          label={showMoreOptions ? "Key 1" : 'Key'}
          placeholder={''}
          formSubmit={handleFormSubmit}
        />
        {showMoreOptions && (
          <>
            <InputText
              ref={key2Ref}
              label={"Key 2"}
              placeholder={''}
              formSubmit={handleFormSubmit}
            />
            <InputText
              ref={key3Ref}
              label={"Key 3"}
              placeholder={''}
              formSubmit={handleFormSubmit}
            />
            <InputFromList
              ref={themeRef}
              label={"Theme:"}
              placeholder={"Search theme"}
              fuzzySearcher={getThemeSearch()}
              formSubmit={handleFormSubmit}
            />
            <InputFromList
              ref={languageRef}
              label={"Language:"}
              placeholder={"Search language"}
              fuzzySearcher={getLanguageSearch()}
              formSubmit={handleFormSubmit}
            />
            <h1>Dates</h1>
            <InputDate
              ref={dateStartRef}
              label={"From"}
              placeholder={"DD/MM/YYYY"}
              formSubmit={handleFormSubmit}
            />
            <InputDate
              ref={dateEndRef}
              label={"To"}
              placeholder={"DD/MM/YYYY"}
              formSubmit={handleFormSubmit}
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
