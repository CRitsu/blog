import data from '../data/lists';
import { State } from '../type';




const initialState: State = {
  lists: data
}


function initial(state = initialState) {
  return state;
}


export default initial;
