import React, { useState, useRef } from 'react';
import { IoSearch, IoArrowBack, IoSendSharp } from "react-icons/io5";

import InputFromList from './inputs/inputFromList';
import InputDate from './inputs/inputDate';
import InputText from './inputs/inputText';
import ExpandButton from './inputs/expandButton';

import { useCountry } from '../context/countryProvider';

import { getLanguageSearch, getThemeSearch } from './utils/fuzzySearchers';

function QueryForm() {
  const { formData, setFormData, awaitingData } = useCountry();
  const [showForm, setShowForm] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [dateError, setDateError] = useState('');
  const [searchNote, setSearchNote] = useState('');

  const key1Ref = useRef();
  const key2Ref = useRef();
  const key3Ref = useRef();
  const themeRef = useRef();
  const languageRef = useRef();
  const dateStartRef = useRef();
  const dateEndRef = useRef();

  function toggleFormVisibility() {
    setShowForm(!showForm);
  }

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
      dateStart: null,
      dateEnd: null,
    };

    let isQuery = false;
    let isError = false;


    if (key1Ref.current) {
      const val = key1Ref.current.getValue();
      if (val) {
        localForm.key1 = val;
        isQuery = true;
      } else if (val !== '') {
        isError = true;
      }
    }

    if (key2Ref.current) {
      const val = key2Ref.current.getValue();
      if (val) {
        localForm.key2 = val;
        isQuery = true;
      } else if (val !== '') {
        isError = true;
      }
    }

    if (key3Ref.current) {
      const val = key3Ref.current.getValue();
      if (val) {
        localForm.key3 = val;
        isQuery = true;
      } else if (val !== '') {
        isError = true;
      }
    }

    if (themeRef.current) {
      const val = themeRef.current.getValue();
      if (val) {
        localForm.theme = val;
        isQuery = true;
      } else if (val !== '') {
        isError = true;
      }
    }

    if (languageRef.current) {
      const val = languageRef.current.getValue();
      if (val) {
        localForm.sourcelang = val;
        isQuery = true;
      } else if (val !== '') {
        isError = true;
      }
    }

    if (dateStartRef.current) {
      const val = dateStartRef.current.getValue();
      if (val) {
        localForm.dateStart = val;
      } else if (val !== '') {
        isError = true;
      }
    }

    if (dateEndRef.current) {
      const val = dateEndRef.current.getValue();
      if (val) {
        localForm.dateEnd = val;
      } else if (val !== '') {
        isError = true;
      }
    }

    //check for form errors before submitting to provider
    const bothDates = localForm.dateStart && localForm.dateEnd;

    if (bothDates && (localForm.dateStart > localForm.dateEnd)) {
      setDateError('Date "From" must be before date "To".');
      setSearchNote('');
    } else {
      if (!isQuery && (localForm.dateStart !== '' || localForm.dateEnd !== '')) {
        setSearchNote('Note that a search cannot only contain dates. Either a country must be selected or a query box must be filled in.')
      } else {
        setSearchNote('');
      }

      setDateError('');
      setFormData(localForm);
    }
  }

  return (
    <div className='content-container'>
      <div id='search-hider-container' >
        <button onClick={toggleFormVisibility} id={'search-hider'}>
          {showForm ? (
            <IoArrowBack size={20} />
          ) : (
            <IoSearch size={20} />
          )}
        </button>
      </div>

      {showForm && (
        <>
          <h1> {showMoreOptions ? "Query" : "Search"}</h1>
          <form className="query-form" onSubmit={(e) => e.preventDefault()}>
            <InputText
              ref={key1Ref}
              label={showMoreOptions ? "Key 1:" : 'Keyword:'}
              placeholder={'cyber'}
              formSubmit={handleFormSubmit}
            />
            {showMoreOptions && (
              <>
                <InputText
                  ref={key2Ref}
                  label={"Key 2:"}
                  placeholder={'hacker'}
                  formSubmit={handleFormSubmit}
                />
                <InputText
                  ref={key3Ref}
                  label={"Key 3:"}
                  placeholder={'security'}
                  formSubmit={handleFormSubmit}
                />
                <InputFromList
                  ref={themeRef}
                  label={"Theme:"}
                  placeholder={"cyber attack"}
                  fuzzySearcher={getThemeSearch()}
                  formSubmit={handleFormSubmit}
                />
                <InputFromList
                  ref={languageRef}
                  label={"Language:"}
                  placeholder={"spanish"}
                  fuzzySearcher={getLanguageSearch()}
                  formSubmit={handleFormSubmit}
                />

                <hr className="separator" />

                <h1>Dates</h1>
                <InputDate
                  ref={dateStartRef}
                  label={"From:"}
                  placeholder={"DD/MM/YYYY"}
                  formSubmit={handleFormSubmit}
                />
                <InputDate
                  ref={dateEndRef}
                  label={"To:"}
                  placeholder={"DD/MM/YYYY"}
                  formSubmit={handleFormSubmit}
                />
                {dateError && (
                  <div className='date-error'>
                    {dateError}
                  </div>

                )}
              </>
            )}
            {searchNote && (
              <div className='search-note'>
                {searchNote}
              </div>
            )}

            <div className="button-container">
              <ExpandButton
                id={'options-button'}
                toggleCallback={toggleOptions}
                size={20}
              />
              <button
                id="submit-button"
                type="button"
                onClick={handleFormSubmit}
                disabled={awaitingData ? true : false}
              >
                <IoSendSharp size={20} />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default QueryForm;
