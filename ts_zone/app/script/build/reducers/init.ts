import { setUser } from '../common'
type StateType = {
  isLogin: boolean
}
interface ActionType {
  type: 'LOGOUT' | 'LOGIN',
  value: string
}
let initialState = { isLogin: false };
export default function reducer(state: StateType, action: ActionType) {
  setUser(action.value)
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
