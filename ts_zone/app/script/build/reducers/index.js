import { combineReducers } from 'redux';
import showGood from './showGood';
import commets from './commets';

const rootReducer = combineReducers({
	showGood,
	commets,
});

export default rootReducer;