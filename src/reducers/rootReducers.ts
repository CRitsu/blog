import { LATEST } from 'src/constants';
import { BaseAction, ContentsType, ListsType } from '../types';
import { LIST_FETCH_FAILED, LIST_FETCHED, LIST_FETCHING, LIST_INITIALIZED, SWITCH_ACTIVE_TAB } from './actions';


export const lists = (
  state: ListsType = {
    activeTab: LATEST,
    initialFlag: false,
    isError: false,
    list: [],
    loading: false,
  }, action: BaseAction
): ListsType => {

  switch (action.type) {
    // initialize
    case LIST_INITIALIZED:
      return Object.assign({}, state, { initialFlag: true });

    // start fetching action
    case LIST_FETCHING:
      return Object.assign({}, state, { loading: true, isError: false });

    // end fetching action
    case LIST_FETCHED:
      return Object.assign({}, state, { list: action.payload.list, loading: false });

    // fetching failed action
    case LIST_FETCH_FAILED:
      return Object.assign({}, state, { loading: false, isError: true });

    // switch active tab
    case SWITCH_ACTIVE_TAB:
      return Object.assign({}, state, { activeTab: action.payload.tab });

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
