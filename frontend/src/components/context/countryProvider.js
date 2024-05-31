import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchData } from '../../api/requests';

import { isQuery, isDate, isSameDay, formatRequestData } from './utils';

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [formData, setFormData] = useState({
    key1: '',
    key2: '',
    key3: '',
    theme: '',
    sourcelang: '',
    dateStart: null,
    dateEnd: null,
  });

  // data from api
  const [articleList, setArticleList] = useState(null);
  const [newsOverview, setNewsOverview] = useState(null);
  const [worldVolume, setWorldVolume] = useState(null);

  const [awaitingData, setAwaitingData] = useState(false);
  const [isData, setIsData] = useState(false);

  //fetch data
  useEffect(() => {
    const formattedFormData = formatRequestData(selectedCountry, formData);

    (async function() {
      if (isQuery(selectedCountry, formData)) {
        setAwaitingData(true);

        try {
          const data = await fetchData(formattedFormData);

          const dateInfo = {};
          dateInfo.startDate = formattedFormData.start;
          dateInfo.endDate = formattedFormData.end;
          if (isDate(formData)) {
            dateInfo.isDefault = false;
            dateInfo.isOneDay = isSameDay(formattedFormData.start, formattedFormData.end);
          } else {
            dateInfo.isDefault = true;
            dateInfo.isOneDay = false;
          }

          data.newsOverview.dateInfo = dateInfo;
          console.log("Received all data", data);
          setArticleList(data.articleList);
          setNewsOverview(data.newsOverview);
          setWorldVolume(data.worldVolume);
          setIsData(true);

        } catch (error) {
          console.error("Error fetching data", error);
        } finally {
          setAwaitingData(false);
        }
      } else {
        setIsData(false);
        setArticleList(null);
        setNewsOverview(null);
        setWorldVolume(null);
      }
    })();
  }, [selectedCountry, formData]);

  function clearData() {
    setAwaitingData(true);
    setArticleList(null);
    setNewsOverview(null);
    setWorldVolume(null);
    setSelectedCountry(null);
    setIsData(false);
    setAwaitingData(false);
  }

  return (
    <CountryContext.Provider value={{
      selectedCountry,
      setSelectedCountry,
      hoveredCountry,
      setHoveredCountry,
      formData,
      isData,
      clearData,
      setFormData,
      awaitingData,
      articleList,
      newsOverview,
      worldVolume,
    }}>
      {children}
    </CountryContext.Provider >
  );
};

export const useCountry = () => useContext(CountryContext);
