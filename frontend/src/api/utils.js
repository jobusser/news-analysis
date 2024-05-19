function isKeys(keys) {
  if (!Array.isArray(keys)) return false; // Ensure keys is an array
  return keys.some(key => key !== '');
}

export function isQuery(formData) {
  return !!(
    formData.country?.trim() ||
    isKeys(formData.keys) ||
    formData.theme?.trim() ||
    formData.sourcelang?.trim()
  );
}

export function isForm(formData) {
  return !!(
    isKeys(formData.keys) ||
    formData.theme?.trim() ||
    formData.sourcelang?.trim()
  );
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}


export function adjustDates(start, end) {
  const timeDifference = start.getTimezoneOffset();
  console.log(start, end);

  // Convert date objects to UTC format strings
  const dateStartUTC = new Date(start.getTime() - timeDifference * 60000);
  const dateEndUTC = new Date(end.getTime() - timeDifference * 60000);

  const dateStartString = formatDate(dateStartUTC);
  const dateEndString = formatDate(dateEndUTC);

  return {
    timeDifference: timeDifference,
    dateStartUTC: dateStartUTC,
    dateEndUTC, dateEndUTC,
    dateStartString, dateStartString,
    dateEndString: dateEndString,
  };

}



export function findCountryTotals(worldTimeline, volumePerCountry) {
  // Mapping timestamps to total articles

  const totalArticlesByTimestamp = {};
  let bigTotal = 0;
  worldTimeline.timeline[0].data.forEach(entry => {
    bigTotal += entry.value;
    totalArticlesByTimestamp[entry.timestamp] = entry.value;
  });




  // find total per country
  const totalArticlesPerCountry = {};

  Object.keys(volumePerCountry).forEach(country => {
    const countryData = volumePerCountry[country];

    let totalCountryArticles = 0;
    let totalGlobalArticles = 0;

    countryData.forEach(entry => {
      const globalArticleCount = totalArticlesByTimestamp[entry.timestamp] || 0;
      const countryArticleCount = globalArticleCount !== 0 ? (entry.value / 100) * globalArticleCount : 0;

      totalCountryArticles += countryArticleCount;
      totalGlobalArticles += globalArticleCount;
    });

    const percentageOfTotalArticles = (totalCountryArticles / totalGlobalArticles) * 100;

    totalArticlesPerCountry[country] = {
      totalArticles: totalCountryArticles,
      percentageOfTotalArticles: percentageOfTotalArticles,
    };
  });

  return totalArticlesPerCountry;
}
