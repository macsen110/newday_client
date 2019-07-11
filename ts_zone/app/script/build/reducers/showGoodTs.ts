import {SHOWGOOD} from '../actions';
type actionType = {
	type: string,
	value: {}
}
export default function showGood(state:any,action:actionType) {
	switch(action.type) {
		case SHOWGOOD:
			return action.value;
		default:
			return state 
	}
} 