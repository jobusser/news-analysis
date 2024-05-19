import { getArticlesList, getCountryTimeline, getCountryVolumes } from "./gdelt_getter";
import { isQuery, isForm, adjustDates, findCountryTotals } from "./utils";


// TODO: error checking
export async function fetchCountryArticles(formData) {
  const { keys, theme, country, sourceLang, start, end, maxRecords } = formData;
  const { timeDifference, dateStartUTC, dateEndUTC, dateStartString, dateEndString } = adjustDates(start, end);

  const articlesData = await getArticlesList(keys, country, theme, sourceLang, dateStartString, dateEndString, maxRecords);
  return articlesData;

}

export async function fetchCountryTimeline(formData) {
  const { keys, theme, country, sourceLang, start, end, maxRecords } = formData;
  const { timeDifference, dateStartUTC, dateEndUTC, dateStartString, dateEndString } = adjustDates(start, end);

  const timelineData = await getCountryTimeline(keys, country, theme, sourceLang, dateStartString, dateEndString);

  let totalArticles = 0;
  let relevantArticles = 0;

  timelineData.timeline[0].data.forEach(entry => {
    totalArticles += entry.norm;
    relevantArticles += entry.value;
  });

  timelineData.total = totalArticles;
  timelineData.relevant = relevantArticles;

  return timelineData;

}

export async function fetchWorldVolume(formData) {
  const { keys, theme, country, sourceLang, start, end, maxRecords } = formData;
  const { timeDifference, dateStartUTC, dateEndUTC, dateStartString, dateEndString } = adjustDates(start, end);

  const countryVolumes = getCountryVolumes(keys, theme, sourceLang, dateStartString, dateEndString);

  return countryVolumes;


}


export async function fetchData(formData) {
  console.log('Form data in api:', formData);

  const data = {
    articleList: null,
    countryTimeline: null,
    worldVolume: null,
  }

  console.log("ISes", isQuery(formData), isForm(formData));

  if (isQuery(formData)) {
    data.articleList = await fetchCountryArticles(formData);
    data.countryTimeline = await fetchCountryTimeline(formData);
  }

  let volume = null
  if (isForm(formData)) {
    volume = await fetchWorldVolume(formData);
    data.worldVolume = findCountryTotals(data.countryTimeline.timeline[0].data, volume);
  }

  return data;


}


