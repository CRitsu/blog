import { actions } from '../actions';
import { BaseAction } from '../type';


function getInitialState() {
  return {
    lists: []
  }
}

function initial(state = getInitialState(), action: BaseAction) {
  switch (action.type) {
    case actions.FETCH_LISTS:
      return Object.assign({}, state, {lists: action.payload});
    default:
      return state;
  }
}

export default initial;
