import { Dispatch } from "redux";

// Type definitions for common use

export interface Articles {
  _id: string,
  author: string,
  peek: string,
  reviews: number,
  tags: string[],
  timestamp: number,
  title: string,
  views: number,
  deleted: boolean,
  category: string,
}

export interface State {
  contents: ContentsType,
  lists: ListsType
}

export interface ContentsType {
  title: string
}

export interface ListsType {
  list: Articles[]
}

export interface BaseAction {
  type: string,
  payload: object | any[],
  error?: boolean
}

export interface Translate {
  t: (p: string) => string
}

export interface ReduxDispatch {
  dispatch: Dispatch
}
