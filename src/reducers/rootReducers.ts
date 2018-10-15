import { BaseAction, CommonType, ContentsType, ListsType } from '../types';
import { LIST_FETCHED, LIST_FETCHING, LIST_FETCHING_FAILED, LIST_INITIALIZED, STORE_LIST_TOP_POINT } from './actions';


export const lists = (
  state: ListsType = {
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
    case LIST_FETCHING_FAILED:
      return Object.assign({}, state, { loading: false, isError: true });

    default:
      return state;
  }

};

export const contents = (
  state: ContentsType = {
    title: '',
  }, action: BaseAction
): ContentsType => {
  return state;
}

export const common = (
  state: CommonType = {
    listTopPoint: 0
  }, action: BaseAction
): CommonType => {

  switch (action.type) {
    case STORE_LIST_TOP_POINT:
      return Object.assign({}, state, { listTopPoint: action.payload.p });
    default:
      return state;
  }
}
