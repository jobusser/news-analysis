// NOTE: functions approximate rotations since the summer solstice in the UK ~ 21 June

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const MILLISECONDS_PER_YEAR = MILLISECONDS_PER_DAY * 365;


function previousSolstice(date) {
  const solstice = new Date(date.getFullYear(), 5, 20, 12, 0, 0);

  if (date < solstice) {
    solstice.setFullYear(date.getFullYear() - 1);
  }

  return solstice;
}

export function rotationAroundSun(date) {
  const solstice = previousSolstice(date);

  const degrees = 360 * (date - solstice) / MILLISECONDS_PER_YEAR;
  console.log("!!!", degrees);
  return degrees * Math.PI / 180;
}


export function rotationAroundAxis(date) {
  const solstice = previousSolstice(date);

  // read up on sidereal day
  const degrees = 361 * (date - solstice) / MILLISECONDS_PER_DAY;
  return degrees * Math.PI / 180;

}

