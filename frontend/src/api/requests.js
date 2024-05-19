import { getArticlesList, getCountryTimeline, getCountryVolumes, getWorldTimeline } from "./gdelt_getter";
import { isQuery, isForm, adjustDates, findCountryTotals } from "./utils";


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


  let countryTotal = 0;
  countryTimelineData.timeline[0].data.forEach(entry => {
    countryTotal += entry.value;
  });


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

  const data = {
    articleList: null,
    countryTimeline: null,
    worldVolume: null,
  }

  if (isQuery(formData)) {
    data.articleList = await fetchCountryArticles(formData);
    var timelineData = await fetchTimeline(formData);
    data.countryTimeline = timelineData.countryTimelineData;
  }



  if (isForm(formData)) {
    var volumePerCountry = await fetchWorldVolume(formData);
    var worldTimeline = timelineData.worldTimelineData;
    // data.worldVolume = findCountryTotals(worldTimeline, volumePerCountry);
  }

  console.log('Article list', data.articleList);
  console.log('country timeline', data.countryTimeline);
  console.log('world timeline', worldTimeline);
  console.log('volumepercountry', volumePerCountry);

  return data;


}


