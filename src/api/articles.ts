import { creators } from '../actions';
import { BaseAction } from '../type';
import { checkStatus, ErrorWithResponse, parseJson } from './utils';


export function fetchLists(dispatch: (action: BaseAction) => void) {

  const catchError = (error: ErrorWithResponse) => error.response.status;

  fetch('/test/lists.json')
    .then(checkStatus)
    .then(parseJson)
    .then(data => dispatch(creators.listsFetched(data)))
    .catch(catchError);
}
