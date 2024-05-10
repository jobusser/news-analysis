export function transformDate(date) {
  // DD/MM/YYYY string to YYYYMMDD number
  if (date.length !== 10) return null;

  const formatString = date.substring(6) + date.substring(3, 5) + date.substring(0, 2);
  return parseInt(formatString);
}

export function getErrorMessage(selectedCountry, formData) {
  if (!selectedCountry && !formData.key1 && !formData.key2 && !formData.key3 && !formData.theme && !formData.sourcelang) {
    return "Enter a query or select a country";
  }

  const firstDate = transformDate(formData.dateStart);
  const secondDate = transformDate(formData.dateEnd);

  if (firstDate > secondDate) {
    return "From cannot be before To"
  }

  return "";
}
