import { LATEST } from 'src/constants';
import { BaseAction, CommonType, ContentsType, ListCollection, ListsType } from '../types';
import { ARTICLE_FETCHED, ARTICLE_FETCHING_FAILED, CATEGORY_CHANGE, LIST_FETCHED, LIST_FETCHING, LIST_FETCHING_FAILED, LIST_INITIALIZED, STORE_LIST_TOP_POINT } from './actions';

export const lists = (
  state: ListsType = {
    category: LATEST,
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
      return Object.assign({}, state, { loading: true, isError: false, category: action.payload.category });

    // end fetching action
    case LIST_FETCHED:
      return Object.assign({}, state, { loading: false });

    // fetching failed action
    case LIST_FETCHING_FAILED:
      return Object.assign({}, state, { loading: false, isError: true });

    case CATEGORY_CHANGE:
      return Object.assign({}, state, { category: action.payload.category });

    default:
      return state;
  }

};

export const contents = (
  state: ContentsType = {
    article: null,
    isError: false,
    loading: true,
  }, action: BaseAction
): ContentsType => {

  switch (action.type) {

    // for article fetching failed
    case ARTICLE_FETCHING_FAILED:
      return Object.assign({}, state, { isError: true, loading: false });

    // for article fetched
    case ARTICLE_FETCHED:
      return Object.assign({}, state, { article: action.payload.article, loading: false });

    default:
      return state;
  }
}

export const common = (
  state: CommonType = {
    listTopPoint: 0
  }, action: BaseAction
): CommonType => {

  switch (action.type) {

    // for store list top point, for click to scroll to
    case STORE_LIST_TOP_POINT:
      return Object.assign({}, state, { listTopPoint: action.payload.p });

    default:
      return state;
  }
}

export const listCollection = (
  state: ListCollection = {},
  action: BaseAction
): ListCollection => state;
