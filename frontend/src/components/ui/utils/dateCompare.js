export function comparableDate(date) {
  const [day, month, year] = date.split('/');
  return Number(year + month + day);
}
