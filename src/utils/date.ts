// abridge of months
const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

/**
 * Transform given milliseconds to date format
 * 
 * Default format:
 * 
 * MM/DD  
 * YYYY
 * 
 * Available format:
 * - MMM DD, YYYY (eg. Jul 09, 2018)
 * - YYYY/MM/DD HH:MM:SS (eg. 2018/09/28 12:22:12)
 * - YYYY/MM/DD(eg. 2018/09/28)
 * @param time time in millisecond
 * @param format optional
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

  if (format === 'YYYY/MM/DD HH:MM:SS') {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds()
    return `${year}/${fillZero(month)}/${fillZero(day)} ${hours}:${minutes}:${seconds}`;
  }

  if (format === 'YYYY/MM/DD') {
    return `${year}/${fillZero(month)}/${fillZero(day)}`;
  }

  // default format
  // const shortYear = String(year).slice(2,4);
  return `${fillZero(month)}/${fillZero(day)}\n${year}`;

}

