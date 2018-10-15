import { DispatchProp } from "react-redux";

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
  common: CommonType,
  contents: ContentsType,
  lists: ListsType
}

export interface CommonType {
  listTopPoint: number,
}

export interface ContentsType {
  title: string
}

export interface ListsType extends ReduxDispatch {
  list: Articles[],
  loading: boolean,
  isError: boolean,
  initialFlag: boolean,
}

export interface BaseAction {
  type: string,
  payload: any,
  error?: boolean
}

export interface Translate {
  t: (p: string) => string
}

export interface ReduxDispatch {
  dispatch?: (action: any) => DispatchProp
}
