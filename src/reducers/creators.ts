import { Dispatch } from "redux";
import { LATEST, MEMO, PHOTO, TAGS, TALK, TECH } from "src/constants";
import { Articles, BaseAction } from "src/types";
import { checkStatus, parseJson } from "src/utils";
import { ARTICLE_FETCHED, ARTICLE_FETCHING, ARTICLE_FETCHING_FAILED, LIST_FETCHED, LIST_FETCHING, LIST_FETCHING_FAILED, LIST_INITIALIZED, STORE_LIST_TOP_POINT } from "./actions";


export const listFetchStart = (): BaseAction => ({
  payload: null,
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

export const listInitialized = () => ({
  payload: null,
  type: LIST_INITIALIZED,
});

export const fetchList = (fetchType: number) => {

  return (dispatch: Dispatch) => {

    dispatch(listFetchStart());

    let fetchUrl;

    switch (fetchType) {
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
