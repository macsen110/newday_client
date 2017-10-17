import {SHOWGOOD} from '../actions/actions';
export default function showGood(state=0,action) {
	switch(action.type) {
		case SHOWGOOD:
			return action.value;
		default:
			return state 
	}
} 