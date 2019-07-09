import {LISTGOODS, DONELOADING} from '../actions/actions';
export function listGoods(state=[], action) {
	switch(action.type) {
		case LISTGOODS:
			return action.value
		default:
			return state;
	}	
}
export function doneLoading(state=0, action) {
	switch(action.type) {
		case DONELOADING:
			return action.value
		default:
			return state
	} 
}
