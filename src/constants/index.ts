import * as icons from './iconIdentifiers';
import * as size from './size';

export { icons, size };

export const LATEST = 'LATEST';
export const CATEGORIES = 'CATEGORIES';
export const TECH = 'TECH';
export const MEMO = 'MEMO';
export const PHOTO = 'PHOTO';
export const TALK = 'TALK';
export const TAGS = 'TAGS';

export const NORMAL_TIME_FORMAT = 'YYYY/MM/DD HH:MM:SS';
export const SHORT_TIME_FORMAT = 'YYYY/MM/DD';

/**
 * For mapping categories to path.
 */
export const CATEGORIES_MAPPING = {
  '/': LATEST,
  '/list/memo': MEMO,
  '/list/photo': PHOTO,
  '/list/tags': TAGS,
  '/list/talk': TALK,
  '/list/tech': TECH,
}
