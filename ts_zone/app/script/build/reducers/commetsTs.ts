import {POSTCOMMET, DELETECOMMET, LISTCOMMETS} from '../actions';
type actionType = {
	type: string,
	value: any
}
export default function commets(state:any,action:actionType) {
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