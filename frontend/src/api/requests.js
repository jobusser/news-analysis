import { getArticlesList, getCountryTimeline, getCountryVolumes, getWorldTimeline } from "./gdelt_getter";
import { isForm, isCountry, adjustDates, makeTimeline, averageWorldVolume } from "./utils";

export async function fetchData(formData) {
  const { keys, theme, country, sourceLang, start, end, maxRecords, countryLongName } = formData;
  const { dateStartString, dateEndString } = adjustDates(start, end);

  // fetch all data
  const articleList = await getArticlesList(keys, country, theme, sourceLang, dateStartString, dateEndString, maxRecords);
  const countryTimeline = await getCountryTimeline(keys, country, theme, sourceLang, dateStartString, dateEndString);
  const worldTimeline = await getWorldTimeline(keys, theme, sourceLang, dateStartString, dateEndString);
  const worldVolume = isForm(formData) ? await getCountryVolumes(keys, theme, sourceLang, dateStartString, dateEndString) : null;

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
  const timeline = makeTimeline(countryTimeline, worldVolume, formData);

  if (worldVolume) {
    var avgWorldVolume = averageWorldVolume(worldVolume);
  }

  const newsOverview = {};
  newsOverview.relevantInWorld = relevantInWorld;
  newsOverview.totalInWorld = totalInWorld;
  newsOverview.countryTotal = isCountry(formData) ? newsOverview.countryTotal = relevantInCountry : null;
  newsOverview.timeline = timeline;

  const data = {}
  data.articleList = articleList;
  data.newsOverview = newsOverview;
  data.worldVolume = !!(worldVolume) ? avgWorldVolume : null;

  return data;
}

