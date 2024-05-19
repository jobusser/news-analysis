import { getArticlesList, getCountryTimeline, getCountryVolumes, getWorldTimeline } from "./gdelt_getter";
import { isQuery, isForm, isCountry, adjustDates, makeTimeline } from "./utils";


// TODO: error checking
export async function fetchCountryArticles(formData) {
  const { keys, theme, country, sourceLang, start, end, maxRecords, countryLongName } = formData;
  const { timeDifference, dateStartUTC, dateEndUTC, dateStartString, dateEndString } = adjustDates(start, end);

  const articlesData = await getArticlesList(keys, country, theme, sourceLang, dateStartString, dateEndString, maxRecords);
  return articlesData;

}

export async function fetchTimeline(formData) {
  const { keys, theme, country, sourceLang, start, end, maxRecords, countryLongName } = formData;
  const { timeDifference, dateStartUTC, dateEndUTC, dateStartString, dateEndString } = adjustDates(start, end);

  const countryTimelineData = await getCountryTimeline(keys, country, theme, sourceLang, dateStartString, dateEndString);
  const worldTimelineData = await getWorldTimeline(keys, theme, sourceLang, dateStartString, dateEndString);

  let totalArticles = 0;
  let relevantArticles = 0;

  const timelineData = {
    countryTimelineData: countryTimelineData,
    worldTimelineData: worldTimelineData,
  }

  return timelineData;

}

export async function fetchWorldVolume(formData) {
  const { keys, theme, country, sourceLang, start, end, maxRecords, countryLongName } = formData;
  const { timeDifference, dateStartUTC, dateEndUTC, dateStartString, dateEndString } = adjustDates(start, end);

  const countryVolumes = getCountryVolumes(keys, theme, sourceLang, dateStartString, dateEndString);

  return countryVolumes;


}


export async function fetchData(formData) {
  const { keys, theme, country, sourceLang, start, end, maxRecords, countryLongName } = formData;
  const { timeDifference, dateStartUTC, dateEndUTC, dateStartString, dateEndString } = adjustDates(start, end);

  const data = {
    articleList: null,
    newsOverview: null,
    worldVolume: null,
  }

  // fetch all data
  const articleList = await getArticlesList(keys, country, theme, sourceLang, dateStartString, dateEndString, maxRecords);
  const countryTimeline = await getCountryTimeline(keys, country, theme, sourceLang, dateStartString, dateEndString);
  const worldTimeline = await getWorldTimeline(keys, theme, sourceLang, dateStartString, dateEndString);
  const worldVolume = isForm(formData) ? await fetchWorldVolume(formData) : null;


  // work out totals
  let relevantInCountry = 0;
  let relevantInWorld = 0;
  let totalInWorld = 0;

  for (let i = 0; i < countryTimeline.timeline[0].data.length; i++) {
    relevantInCountry += countryTimeline.timeline[0].data[i].value;
    relevantInWorld += worldTimeline.timeline[0].data[i].value;
    totalInWorld += worldTimeline.timeline[0].data[i].norm;
  }


  // make timeline


  const newsOverview = {};

  newsOverview.relevantInWorld = relevantInWorld;
  newsOverview.totalInWorld = totalInWorld;
  if (isCountry(formData)) {
    newsOverview.countryTotal = relevantInCountry;
  }

  const timeline = makeTimeline(countryTimeline, worldVolume, formData);








  if (isForm(formData)) {
    var volumePerCountry = await fetchWorldVolume(formData);
    // data.worldVolume = findCountryTotals(worldTimeline, volumePerCountry);
  }

  return data;


}


