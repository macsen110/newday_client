import {DONELOADING} from '../actions/actions';

export default function doneLoading(state=0, action) {
	switch(action.type) {
		case DONELOADING:
			return action.value
		default:
			return state
	} 
}

