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
  lists: Articles[]
}

export interface BaseAction {
  type: string,
  payload: object | any[],
  error?: boolean
}

export interface Translate {
  t: (p: string) => string
}
