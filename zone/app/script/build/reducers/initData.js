import {INITACTION} from '../actions/actions';
export default function initData(state={isLogin: false}, action) {
	switch (action.type) {
		case INITACTION:
			sessionStorage.setItem('isLogin', action.value.isLogin)
			return Object.assign({}, {
				isLogin: action.value.isLogin
			})
		default :
			return state
	}
}