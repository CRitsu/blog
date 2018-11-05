import { Dispatch } from "redux";
import { LATEST, MEMO, PHOTO, TAGS, TALK, TECH } from "src/constants";
import { Articles, BaseAction, HiddenState, State as BaseState } from "src/types";
import { checkStatus, parseJson } from "src/utils";
import { setTimeout } from "timers";
import { ARTICLE_FETCHED, ARTICLE_FETCHING, ARTICLE_FETCHING_FAILED, CATEGORY_CHANGE, LIST_FETCHED, LIST_FETCHING, LIST_FETCHING_FAILED, STORE_LIST_TOP_POINT } from "./actions";

interface State extends BaseState, HiddenState {}

export const listFetchStart = (category: string): BaseAction => ({
  payload: { category },
  type: LIST_FETCHING,
});

export const listFetchEnd = (list: Articles[]) => ({
  payload: { list },
  type: LIST_FETCHED,
});

export const listFetchFailed = () => ({
  payload: null,
  type: LIST_FETCHING_FAILED,
});

export const fetchList = () => {

  return (dispatch: Dispatch, getState: () => State) => {

    const state = getState();
    const category = state.lists.category;

    // TODO
    console.log(category)

    dispatch(listFetchStart(category));

    let fetchUrl;

    switch (category) {
      case LATEST:
        fetchUrl = '/test/lists.json';
        break;
      case TECH:
        fetchUrl = '/test/lists.json';
        break;
      case MEMO:
        fetchUrl = '/test/lists.json';
        break;
      case PHOTO:
        fetchUrl = '/test/lists.json';
        break;
      case TALK:
        fetchUrl = '/test/lists.json';
        break;
      case TAGS:
        fetchUrl = '/test/lists.json';
        break;
      default:
        fetchUrl = '/test/lists.json';
    }

    return fetch(fetchUrl)
      .then(checkStatus)
      .then(parseJson)
      .then(data => dispatch(listFetchEnd(data)))
      .catch(() => dispatch(listFetchFailed()));
  }
}

export const storeListTopPoint = (p: number): BaseAction => ({
  payload: { p },
  type: STORE_LIST_TOP_POINT,
})

export const articleFetched = (article: object): BaseAction => ({
  payload: { article },
  type: ARTICLE_FETCHED,
})

export const articleFetchFailed = (): BaseAction => ({
  payload: null,
  type: ARTICLE_FETCHING_FAILED,
})

export const articleFetching = (): BaseAction => ({
  payload: null,
  type: ARTICLE_FETCHING,
})

export const fetchArticle = (aid: string) => {

  return (dispatch: Dispatch) => {

    // start fetching article
    dispatch(articleFetching());


    const fetchUrl = `/test/article.json?aid=${aid}`;

    return fetch(fetchUrl)
      .then(checkStatus)
      .then(parseJson)
      .then(data => dispatch(articleFetched(data)))
      .catch(() => dispatch(articleFetchFailed()));
  }
}

export const categoryChanging = (c: string) => ({
  payload: { category: c },
  type: CATEGORY_CHANGE,
})

export const categoryChange = (c: string) => {
  return (dispatch: (a: any) => void, getState: () => State) => {

    const state = getState();

    if (c !== state.lists.category) {
      dispatch(categoryChanging(c));
    }

    const listCollection = state.listCollection;
    if (!listCollection[c]) {
      // wait 300ms for nav animation
      setTimeout(() => dispatch(fetchList()), 300);
    }

  }
}
