/**
 * format number to shorter display
 * 
 * e.g. 1000 -> 1k; 123000 -> 1m;
 * @param num number
 */
function formatNumberShorter(num: number) {
  if (num >= 1000000) {
    return `${Math.floor(num / 1000000)}m`;
  } else if (num >= 1000) {
    return `${Math.floor(num / 1000)}k`;
  }
  return num;
}

export {
  formatNumberShorter
}
