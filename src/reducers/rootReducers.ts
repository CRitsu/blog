import { BaseAction, ContentsType, ListsType } from '../types';
import { LIST_FETCH_FAILED, LIST_FETCHED, LIST_FETCHING } from './actions';


export const lists = (
  state: ListsType = {
    isError: false,
    list: [],
    loading: true,
  }, action: BaseAction
): ListsType => {

  switch (action.type) {
    // start fetching action
    case LIST_FETCHING:
      return Object.assign({}, state, { loading: true, isError: false });

    // end fetching action
    case LIST_FETCHED:
      return Object.assign({}, state, { list: action.payload.list });

    // fetching failed action
    case LIST_FETCH_FAILED:
      return Object.assign({}, state, { loading: false, isError: true });

    default:
      return state;
  }

};

export const contents = (
  state: ContentsType = {
    title: '',
  },
  action: BaseAction
): ContentsType => {
  return state;
}
