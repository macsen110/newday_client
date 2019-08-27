import {LISTGOODS} from '../actions';
type actionType = {
	type: string,
	value: []
}
export default function listGoods(state=[], action: actionType) {
	switch(action.type) {
		case LISTGOODS:
			return action.value
		default:
			return state;
	}	
}

