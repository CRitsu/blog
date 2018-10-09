import { BaseAction, ListsType } from "../types";
import { FETCHING_LIST } from "./actions";

// for fetch api relevant reducers

export const lists = (
    state: ListsType,
    action: BaseAction
  ): ListsType => {
    
    switch (action.type) {
      // start fetching action
      case FETCHING_LIST:
        return Object.assign({}, state, {loading: true});

      default:
        return state;
    }

}
