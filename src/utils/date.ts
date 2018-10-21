// abridge of months
const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

/**
 * transform given milliseconds to date format
 * 
 * e.g. 18/06/02
 * @param time time in millisecond
 * @param format optional, default is 'YY/MM/DD'
 */
export function formatDate(time: number, format?: string) {

  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  // fill 0 if number less then 10
  const fillZero = (t: number) => String(t).length > 1 ? t : `0${t}`;
  
  if (format === 'MMM DD, YYYY') {
    return `${MONTHS[month]} ${fillZero(day)}, ${year}`;
  }

  // default format
  // const shortYear = String(year).slice(2,4);
  return `${fillZero(month)}/${fillZero(day)}\n${year}`;

}

