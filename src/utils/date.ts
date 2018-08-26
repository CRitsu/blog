// abridge of months
const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

/**
 * transform given milliseconds to date format
 * 
 * e.g. JUL 9, 2018
 * @param time time in millisecond
 */
function formatDate(time: number) {

  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  // fill 0 if number less then 10
  const fillZero = (t: number) => String(t).length > 1 ? t : `0${t}`;
  const day = fillZero(date.getDate());

  return `${MONTHS[month]} ${day}, ${year}`;

}


export {
  formatDate
}
