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

export function isCountry(formData) {
  return !!(formData.country);
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

function calculateAverageTimestampValue(worldVolume) {
  const countries = Object.keys(worldVolume);
  if (countries.length === 0) {
    return [];
  }

  const numEntries = worldVolume[countries[0]].length;
  let sums = new Array(numEntries).fill(0);
  let numCountries = countries.length;

  countries.forEach(country => {
    for (let i = 0; i < numEntries; i++) {
      sums[i] += worldVolume[country][i]['value'];
    }
  });

  let averages = sums.map(sum => sum / numCountries);

  return averages;
}

// TODO: Finish this
// make sure timeline is an array
// add world average coverage from above
// edit timestamps to date objects of local time
export function makeTimeline(countryTimeline, worldVolume, formData) {
  const sourceCountry = formData.country;

  const timeline = countryTimeline.timeline[0].data.map((entry, index) => {
    const { timestamp, value } = entry;
    const newEntry = { timestamp, value };

    if (worldVolume && worldVolume[sourceCountry]) {
      newEntry.countryCoverageMagnitude = worldVolume[sourceCountry][index].value;
    }

    return newEntry;
  });

  return timeline;
}

