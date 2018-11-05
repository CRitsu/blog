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
  content?: string,
  comments?: Comments[],
}

export interface Comments {
  aid: string,
  body: string,
  cid: string,
  deleted: boolean,
  from: string,
  timestamp: number,
  // reply flag for trigger reply box display
  replyFlg?: boolean,
  reply?: ReplyType[],
}

export interface ReplyType {
  rid: string,
  timestamp: number,
  from: string,
  body: string,
}

export interface State {
  common: CommonType,
  contents: ContentsType,
  lists: ListsType,
}

export interface HiddenState {
  listCollection: ListCollection,
}

export interface ListCollection {
  [name: string]: Articles[],
}

export interface CommonType {
  listTopPoint: number,
}

export interface ContentsType {
  article: Articles | null,
  isError: boolean,
  loading: boolean,
}

export interface ListsType extends ReduxDispatch {
  list: Articles[],
  isError: boolean,
  category: string,
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
