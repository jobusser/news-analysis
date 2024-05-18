import axios from 'axios';
import { queryParam, timeParams, modeParam, maxRecordsParam, formatParam } from './query_builder';

export async function getArticlesList(keys, country, theme, sourcelang, start, end, maxRecords) {
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${queryParam(keys, country, theme, sourcelang)}${timeParams(start, end)}${modeParam('artlist')}${maxRecordsParam(maxRecords)}${formatParam()}`;
  console.log('Get Articles:', url);
  const response = await axios.get(url);
  return response.data;
}

export async function getRawVolume(keys, country, theme, sourcelang, start, end) {
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${queryParam(keys, country, theme, sourcelang)}${timeParams(start, end)}${modeParam('timelinevolraw')}${formatParam()}`;
  console.log('Get raw volume:', url);
  const response = await axios.get(url);
  return response.data;
}

export async function getCountryVolumes(keys, theme, sourcelang, start, end) {
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${queryParam(keys, null, theme, sourcelang)}${timeParams(start, end)}${modeParam('timelinesourcecountry')}${formatParam()}`;
  console.log('Get country volume:', url);
  const response = await axios.get(url);

  const data = response.data;
  const formattedData = {};

  data.timeline.forEach(country => {
    let name = country.series.slice(0, -17);
    switch (name) {
      case 'United States':
        name = 'United States of America';
        break;
      case 'Bosnia-Herzegovina':
        name = 'Bosnia and Herzegovina';
        break;
      case 'Czech Republic':
        name = 'Czechia';
        break;
      case 'Slovak Republic':
        name = 'Slovakia';
        break;
      case 'Democratic Republic of the Congo':
        name = 'Dem. Rep. Congo';
        break;
      case 'Ivory Coast':
        name = 'Côte d\'Ivoire';
        break;
    }
    formattedData[name] = country.data;
  });

  return formattedData;
}
