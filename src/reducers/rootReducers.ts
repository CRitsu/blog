import { ContentsType, ListsType } from '../types';


export const lists = (): ListsType => ({
  isError: false,
  list: [], 
  loading: true, 
});

export const contents = (): ContentsType => ({
  title: '',
});
