
/**
 * transform given milliseconds to time format
 * 
 * e.g. 2018-08-26 19:32:09
 * @param time time in millisecond
 */
function formatDate(time: number) {
  // fill 0 if number less then 10
  const fillZero = (t: number) => String(t).length > 1 ? t : `0${t}`;

  const date = new Date(time);
  const year = date.getFullYear();
  const month = fillZero(date.getMonth() + 1); // months are zero-based
  const day = fillZero(date.getDate());
  const hours = fillZero(date.getHours());
  const minutes = fillZero(date.getMinutes());
  const seconds = fillZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

}


export {
  formatDate
}
