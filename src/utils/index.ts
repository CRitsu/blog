import { Articles } from 'src/types';
import { formatDate } from './date';
import { catchError, checkStatus, ErrorWithResponse, parseJson } from './fetchUtils';


export { formatDate, checkStatus, parseJson, ErrorWithResponse, catchError };


/**
 * Check if the object is an instance of `DOMRect` or not.
 * @param rect the result of `getBoundingClientRect` function
 */
export function isDOMRect(rect: ClientRect | DOMRect): rect is DOMRect {
  return 'x' in rect && 'y' in rect
    && 'width' in rect && 'height' in rect;
}


/**
 * format number to shorter display
 * 
 * e.g. 1000 -> 1k; 123000 -> 1m;
 * @param num number
 */
export function formatNumberShorter(num: number) {
  if (num >= 1000000) {
    return `${Math.floor(num / 1000000)}m`;
  } else if (num >= 1000) {
    return `${Math.floor(num / 1000)}k`;
  }
  return num;
}


/**
 * Make a empty article object.
 */
export function getEmptyArticle(): Articles {
  return {
    _id: '',
    author: '',
    category: '',
    deleted: false,
    peek: '',
    reviews: 0,
    tags: [''],
    timestamp: 0,
    title: '',
    views: 0,
  }
}

