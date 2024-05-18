import { getArticlesList, getRawVolume, getCountryVolumes } from "./gdelt_getter";
import { formatDate } from "./utils";


export async function fetchCountryArticles(formData) {
  const { keys, theme, country, sourceLang, dateStart, dateEnd, maxRecords } = formData;

  const timeDifference = dateStart.getTimezoneOffset();

  // Convert date objects to UTC format strings
  const dateStartUTC = new Date(dateStart.getTime() - timeDifference * 60000);
  const dateEndUTC = new Date(dateEnd.getTime() - timeDifference * 60000);

  const dateStartString = formatDate(dateStartUTC);
  const dateEndString = formatDate(dateEndUTC);

  const articlesData = await getArticlesList(keys, country, theme, sourceLang, dateStartString, dateEndString, maxRecords);
  return articlesData;

}
