import { Articles, BaseAction } from '../types';
import { FETCH_LISTS } from './actions';


export function listsFetched(data:Articles[]):BaseAction {
  return {
    payload: data,
    type: FETCH_LISTS,
  }
}
