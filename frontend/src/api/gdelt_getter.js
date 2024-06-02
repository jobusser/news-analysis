import axios from 'axios';
import { queryParam, timeParams, modeParam, maxRecordsParam, formatParam } from './query_builder';

const logging = false;

export async function getArticlesList(keys, country, theme, sourcelang, start, end, maxRecords) {
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${queryParam(keys, country, theme, sourcelang)}${timeParams(start, end)}${modeParam('artlist')}${maxRecordsParam(maxRecords)}${formatParam()}`;
  if (logging) console.log('Get Articles:', url);
  const response = await axios.get(url);
  return response.data;
}

export async function getCountryTimeline(keys, country, theme, sourcelang, start, end) {
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${queryParam(keys, country, theme, sourcelang)}${timeParams(start, end)}${modeParam('timelinevolraw')}${formatParam()}`;
  if (logging) console.log('Get raw volume:', url);
  const response = await axios.get(url);
  return response.data;
}

export async function getWorldTimeline(keys, theme, sourcelang, start, end) {
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${queryParam(keys, null, theme, sourcelang)}${timeParams(start, end)}${modeParam('timelinevolraw')}${formatParam()}`;
  if (logging) console.log('Get raw volume:', url);
  const response = await axios.get(url);
  return response.data;
}

export async function getCountryVolumes(keys, theme, sourcelang, start, end) {
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${queryParam(keys, null, theme, sourcelang)}${timeParams(start, end)}${modeParam('timelinesourcecountry')}${formatParam()}`;
  if (logging) console.log('Get country volume:', url);
  const response = await axios.get(url);

  const data = response.data;
  const formattedData = {};

  if (Object.keys(data).length === 0) return null;

  data.timeline.forEach(country => {
    if (country.series.length === 17) {
      return; // undefined GDELT behavior
    }

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
      case 'South Sudan':
        name = 'S. Sudan';
        break;
    }
    formattedData[name] = country.data;
  });

  return formattedData;
}
