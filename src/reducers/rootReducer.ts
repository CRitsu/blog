import { actions } from '../actions';
import { BaseAction, State } from '../types';


function getInitialState(): State {
  return {
    contents: {
      title: ''
    },
    lists: {
      list: []
    },
  }
}

function initial(state = getInitialState(), action: BaseAction) {
  switch (action.type) {
    case actions.FETCH_LISTS:
      return Object.assign({}, state, { lists: {list: action.payload} });
    default:
      return state;
  }
}

export default initial;
