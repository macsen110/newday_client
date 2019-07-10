type StateType = {
  isLogin: boolean
}
type ActionType = {
  type: 'LOGOUT' | 'LOGIN'
}
const initialState = { isLogin: false };
export default function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'LOGIN':
      return { isLogin: true}
    case 'LOGOUT':
      return { isLogin: false};
    default:
      return initialState;
  }
}