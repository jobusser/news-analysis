export function isQuery(selectedCountry, formData) {
  return selectedCountry || formData.key1 || formData.key2 || formData.key3 || formData.theme || formData.sourcelang
}

export function isDate(formData) {
  return !!(formData.dateStart) || !!(formData.dateEnd);
}

export function isSameDay(dateStart, dateEnd) {
  return (
    dateStart.getFullYear() === dateEnd.getFullYear() &&
    dateStart.getMonth() === dateEnd.getMonth() &&
    dateStart.getDate() === dateEnd.getDate()
  );
}

export function formatRequestData(selectedCountry, formData) {
  let fromDate = formData.dateStart;
  let toDate = formData.dateEnd;

  if (fromDate && toDate) {
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);

  } else if (!fromDate && !toDate) {
    toDate = new Date();
    fromDate = new Date(toDate);
    fromDate.setDate(toDate.getDate() - 7);

  } else if (!fromDate) {
    toDate.setHours(23, 59, 59, 999);
    fromDate = new Date(toDate);
    fromDate.setDate(toDate.getDate() - 1);
  } else if (!toDate) {
    fromDate.setHours(0, 0, 0, 0);
    toDate = new Date();
  }

  return {
    keys: [formData.key1, formData.key2, formData.key3],
    theme: formData.theme,
    country: selectedCountry ? selectedCountry.fips_10 : '',
    sourceLang: formData.sourcelang,
    start: fromDate,
    end: toDate,
    maxRecords: 25,
    countryLongName: selectedCountry ? selectedCountry.name : '',
  };
}
