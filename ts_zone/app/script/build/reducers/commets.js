import {POSTCOMMET, DELETECOMMET, LISTCOMMETS} from '../actions/actions';
export default function commets(state=[],action) {
	switch(action.type) {
		case POSTCOMMET:
			state.push(action.value);
			return [...state];
		case LISTCOMMETS:
			return action.value
		case DELETECOMMET:
			let index;
			for (let i =0; i <state.length; i++) {
				if (state[i]._id === action.value) {
					index = i;
					state.splice(index, 1)
					break;
				}
				
			}
			return [...state]
		default:
			return [...state];
	}
}