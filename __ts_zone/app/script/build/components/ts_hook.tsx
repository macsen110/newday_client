import * as React from "react";
const {useReducer, useEffect, useContext, useRef} = React 
const initialState = { count: 0 };
const LanguageContext = React.createContext({ lang: 'en' });
type StateType = {
  count: number
}
type ActionType = {
  type: 'reset' | 'decrement' | 'increment'
}
function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [count, setCount] = React.useState(0)
  const [state, dispatch] = useReducer(reducer, {count});
  const { lang } = useContext(LanguageContext);
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if(inputEl && inputEl.current) {
      inputEl.current.focus();
    } 
  }
  useEffect(() => {
    console.log(`hello, ${count}`) 
  })
  return (
    <>
      <div>{lang}</div>
      <div>Count: {state.count}</div>
      <div><button onClick={() => dispatch({ type: 'reset' })}>Reset</button></div>
      <div><button onClick={() => dispatch({ type: 'increment' })}>+</button></div>
      <div><button onClick={() => dispatch({ type: 'decrement' })}>-</button></div>
      <div><input ref={inputEl} type="text" /><button onClick={onButtonClick}>Focus the input</button></div>
    </>
  );
}
export interface HelloProps { compiler: string; framework: string; }
export default Counter