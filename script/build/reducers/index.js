import { combineReducers } from 'redux';
import initData from './initData';
import {listGoods,doneLoading} from './listGoods';
import showGood from './showGood';
import commets from './commets';

const rootReducer = combineReducers({
	initData,
	listGoods,
	showGood,
	commets,
	doneLoading
});

export default rootReducer;