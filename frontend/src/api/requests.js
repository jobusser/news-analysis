import { getArticlesList, getCountryTimeline, getCountryVolumes, getWorldTimeline } from "./gdelt_getter";
import { isForm, isCountry, adjustDates, makeTimeline, averageWorldVolume } from "./utils";

export async function fetchData(formData) {
  const { keys, theme, country, sourceLang, start, end, maxRecords, countryLongName } = formData;
  const { dateStartString, dateEndString } = adjustDates(start, end);

  // fetch all data
  const articleList = await getArticlesList(keys, country, theme, sourceLang, dateStartString, dateEndString, maxRecords);
  const countryTimeline = await getCountryTimeline(keys, country, theme, sourceLang, dateStartString, dateEndString);
  const worldTimeline = isForm(formData) ? await getWorldTimeline(keys, theme, sourceLang, dateStartString, dateEndString) : null;
  const worldVolume = isForm(formData) ? await getCountryVolumes(keys, theme, sourceLang, dateStartString, dateEndString) : null;

  console.log("RAW REQUEST DATA");
  console.log("ArticleList", articleList);
  console.log("countryTimeline", countryTimeline);
  console.log("worldTimeline", worldTimeline);
  console.log("WorldVolume", worldVolume);

  // work out totals
  let relevantInCountry = 0;
  let relevantInWorld = 0;
  let totalInWorld = 0;

  if (worldTimeline && Object.keys(worldTimeline).length !== 0) {
    for (let i = 0; i < worldTimeline.timeline[0].data.length; i++) {
      relevantInWorld += worldTimeline.timeline[0].data[i].value;
      totalInWorld += worldTimeline.timeline[0].data[i].norm;
    }

  }

  if (Object.keys(countryTimeline).length !== 0) {
    for (let i = 0; i < countryTimeline.timeline[0].data.length; i++) {
      relevantInCountry += countryTimeline.timeline[0].data[i].value;
    }
  }


  // make timeline
  const timeline = makeTimeline(countryTimeline, worldVolume, formData);

  if (worldVolume) {
    var avgWorldVolume = averageWorldVolume(worldVolume);
  }

  const newsOverview = {};
  newsOverview.relevantInWorld = relevantInWorld;
  newsOverview.totalInWorld = totalInWorld;
  newsOverview.countryTotal = relevantInCountry;
  newsOverview.timeline = timeline;


  const data = {}
  data.articleList = Object.keys(articleList).length !== 0 ? articleList : null;
  data.newsOverview = newsOverview;
  data.worldVolume = !!(worldVolume) ? avgWorldVolume : null;

  return data;
}

