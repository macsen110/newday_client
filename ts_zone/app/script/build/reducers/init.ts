type StateType = {
  isLogin: boolean
}
type ActionType = {
  type: 'LOGOUT' | 'LOGIN'
}
let initialState = { isLogin: false };
export function getInitState() {
  return initialState
}
export default function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'LOGIN':
      initialState = { isLogin: true}
      break;
    case 'LOGOUT':
      initialState = { isLogin: false};
      break;
    default:
      return initialState;
  }
  return initialState
}
