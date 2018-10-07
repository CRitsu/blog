import reduceReducer from 'reduce-reducers';
import { combineReducers } from 'redux';
import * as act from './actions';
import * as actCreators from './creators';
import * as rootReducers from './rootReducers';

export const actions = act;
export const actionCreators = actCreators;

const reducerRoot = combineReducers(rootReducers);
export const reducers = reduceReducer(reducerRoot);
