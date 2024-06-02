function isKeys(keys) {
  if (!Array.isArray(keys)) return false;
  return keys.some(key => key !== '');
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
  // Convert date objects to UTC format strings
  const timeDifference = start.getTimezoneOffset();

  const dateStartUTC = new Date(start.getTime() - timeDifference * 60000);
  const dateEndUTC = new Date(end.getTime() - timeDifference * 60000);

  const dateStartString = formatDate(dateStartUTC);
  const dateEndString = formatDate(dateEndUTC);

  return {
    dateStartString: dateStartString,
    dateEndString: dateEndString,
  };

}

function calculateAverageTimestampValue(worldVolume) {
  // average coverage over countries of a topic at a timestamp
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

function convertDate(dateString) {
  // Convert UTC date string to local time date object
  const year = dateString.substring(0, 4);
  const month = Number(dateString.substring(4, 6)) - 1;
  const day = dateString.substring(6, 8);
  const hour = dateString.substring(9, 11);
  const minute = dateString.substring(11, 13);
  const second = dateString.substring(13, 15);

  const utcDate = new Date(Date.UTC(year, month, day, hour, minute, second));
  const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);

  return localDate;
}

function convertDates(timeline) {
  return timeline.map(entry => {
    return {
      ...entry,
      date: convertDate(entry.date)
    }
  });
}

export function makeTimeline(countryTimeline, worldVolume, formData) {
  // at timestamp, timeline includes: number of articles, countryCoverage and averageCoverage

  const isCountryTimeline = Object.keys(countryTimeline).length !== 0;
  const isWorldVolume = !!(worldVolume);

  if (!isCountryTimeline && !isWorldVolume) return null;

  let timeline = {};

  if (isCountryTimeline) {
    const sourceCountry = formData.countryLongName;

    timeline = countryTimeline.timeline[0].data.map((entry, index) => {
      const { date, value } = entry;
      const newEntry = { date, value };

      if (isWorldVolume && worldVolume[sourceCountry]) {
        newEntry.countryCoverageMagnitude = worldVolume[sourceCountry][index].value;
      }

      return newEntry;
    });
  }

  console.log("WorldVolume", worldVolume);
  console.log("Source country", formData.countryLongName);
  console.log("PRE TIMELINE", timeline);

  //add average world magnitude
  if (isWorldVolume) {
    const averageCoverage = calculateAverageTimestampValue(worldVolume);

    if (isCountryTimeline) {
      for (let i = 0; i < timeline.length; i++) {
        timeline[i].averageCoverageMagnitude = averageCoverage[i];
      }
    } else {
      // timestamps need to be added if not done not above
      const randomCountry = worldVolume[Object.keys(worldVolume)[0]];
      timeline = randomCountry
      timeline = timeline.map((entry, index) => {
        const { date } = entry;
        return {
          date: date,
          averageCoverageMagnitude: averageCoverage[index]
        };
      });
    }
  }

  // convert dates to local time
  timeline = convertDates(timeline);

  return timeline;
}


export function averageWorldVolume(worldVolume) {
  // average coverage of all countries
  const averageVolume = {};

  Object.keys(worldVolume).forEach(country => {
    const countryData = worldVolume[country];
    if (countryData.length === 0) {
      averageVolume[country] = 0;
    } else {
      const totalValue = countryData.reduce((sum, entry) => sum + entry.value, 0);
      const averageValue = totalValue / countryData.length;
      averageVolume[country] = averageValue;
    }
  });

  return averageVolume;
}


