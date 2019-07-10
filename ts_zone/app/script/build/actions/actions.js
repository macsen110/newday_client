export const INITACTION = 'INITACTION';
export const LISTGOODS = 'LISTGOODS';
export const SHOWGOOD = 'SHOWGOOD';
export const POSTCOMMET = 'POSTCOMMET';
export const DELETECOMMET = 'DELETECOMMET';
export const LISTCOMMETS = 'LISTCOMMETS';
export const DONELOADING = 'DONELOADING';
export function initAction(value) {
	return {
		type: INITACTION,
		value
	}
}
export function listGoodsAction(value) {
	return {
		type: LISTGOODS,
		value		
	}
}
export function showGoodAction(value) {
	return {
		type: SHOWGOOD,
		value
	}
}
export function listCommetsAction(value) {
	return {
		type: LISTCOMMETS,
		value
	}
}
export function postCommetAction (value) {
	return {
		type: POSTCOMMET,
		value
	}
}
export function deleteCommetAction (value) {
	return {
		type: DELETECOMMET,
		value
	}
}

export function doneLoadingAction (value) {
	return {
		type: DONELOADING,
		value: 1
	}
}