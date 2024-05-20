function queryKeys(keys) {
  if (!Array.isArray(keys) || keys.length === 0) {
    return '';
  }

  const filteredKeys = keys.filter(key => key.trim() !== '').slice(0, 3);
  const quotedKeys = filteredKeys.map(key => key.includes(' ') ? `"${key}"` : key);
  let urlString = quotedKeys.join(' OR ');

  if (quotedKeys.length > 1) {
    urlString = `(${urlString})`;
  }

  return urlString;
}

function queryCountry(country) {
  if (typeof country !== 'string' || country.trim() === '') {
    return '';
  }
  return ` sourcecountry:${country}`;
}

function queryTheme(theme) {
  if (typeof theme !== 'string' || theme.trim() === '') {
    return '';
  }
  return ` theme:${theme}`;
}

function querySourceLang(sourcelang) {
  if (typeof sourcelang !== 'string' || sourcelang.trim() === '') {
    return '';
  }
  return ` sourcelang:${sourcelang}`;
}

export function queryParam(keys = [], country = '', theme = '', sourceLang = '') {
  if (!keys.length && !country && !theme) {
    throw new Error('GDELT queries must have at least one parameter (search keys, source country, or theme)');
  }

  return `query=${queryKeys(keys)}${queryCountry(country)}${queryTheme(theme)}${querySourceLang(sourceLang)}`;
}

export function modeParam(mode) {
  const validModes = ['artlist', 'timelinevolraw', 'timelinesourcecountry'];
  if (!validModes.includes(mode)) {
    throw new Error('Mode must be artlist, timelinevolraw, or timelinesourcecountry');
  }
  return `&mode=${mode}`;
}

export function maxRecordsParam(maxRecords = 20) {
  return `&maxrecords=${maxRecords}`;
}

export function timeParams(start, end) {
  if (end == null) {
    end = 20240507235959;
  }
  if (start == null) {
    start = end - 7000000;
  }
  return `&startdatetime=${start}&enddatetime=${end}`;
}

export function formatParam() {
  return '&format=json';
}

