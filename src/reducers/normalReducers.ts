import { BaseAction, HiddenState, State as BaseState } from "src/types";
import { LIST_FETCHED } from "./actions";


interface State extends BaseState, HiddenState { }


export const listCollectionReducer = (
  state: State,
  action: BaseAction
): State => {
  switch (action.type) {

    // store list 
    case LIST_FETCHED:
      const category = state.lists.category;
      const listCollection = Object.assign({}, state.listCollection, { [category]: action.payload.list });
      return Object.assign({}, state, { listCollection });

    default:
      return state;
  }
}
