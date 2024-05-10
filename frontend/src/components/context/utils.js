export function transformDate(date) {
  // DD/MM/YYYY string to YYYYMMDD number
  if (date.length !== 10) return null;

  const formatString = date.substring(6) + date.substring(3, 5) + date.substring(0, 2);
  return parseInt(formatString);
}

export function isQuery(selectedCountry, formData) {
  return selectedCountry || formData.key1 || formData.key2 || formData.key3 || formData.theme || formData.sourcelang
}

export function isDate(formData) {
  return formData.dateStart || formData.dateEnd;
}

export function getErrorMessage(selectedCountry, formData) {
  if (!isQuery(selectedCountry, formData) && isDate(formData)) {
    return 'Enter more than dates to start';
  }

  if (formData.dateStart && formData.dateEnd) {
    const firstDate = transformDate(formData.dateStart);
    const secondDate = transformDate(formData.dateEnd);

    console.log("DATES", firstDate, secondDate)

    if (firstDate > secondDate) {
      return "From cannot be before To"
    }
  }

  return "";
}
