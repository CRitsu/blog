import { ContentsType, ListsType } from '../types';


export const lists = (): ListsType => ({
  list: [], loading: true
});

export const contents = (): ContentsType => ({
  title: ''
});
