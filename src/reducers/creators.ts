import { Dispatch } from "redux";
import { LATEST } from "src/constants";
import { Articles, BaseAction } from "src/types";
import { checkStatus, parseJson } from "src/utils";
import { LIST_FETCHED, LIST_FETCHING, LIST_FETCHING_FAILED, LIST_INITIALIZED, STORE_LIST_TOP_POINT } from "./actions";


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

    let fetchURL;

    if (fetchType === LATEST) {
      fetchURL = '/test/lists.json';
    } else {
      return;
    }

    return fetch(fetchURL)
      .then(checkStatus)
      .then(parseJson)
      .then(data => dispatch(listFetchEnd(data)))
      .catch(() => dispatch(listFetchFailed()));
  }
}

export const storeListTopPoint = (p: number): BaseAction => ({
  payload: {p},
  type: STORE_LIST_TOP_POINT,
})
