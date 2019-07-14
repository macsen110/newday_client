import * as React from 'react';
import {
    NavLink
} from 'react-router-dom';
import reducer, {getInitState} from '../reducers/init'
import {LOGIN, LOGOUT} from '../actions'
const {
    useReducer,
    useEffect,
    useCallback
} = React
// such as https://blog.csdn.net/weixin_42461410/article/details/88650304
function LogoutHeader() {
    return (
        <div className="wrap-header-container">
            <header className="header">
                <ul className="app-nav-list">
                    <Tab exact to="/">首页</Tab>
                    <Tab to="/goods/list">发现</Tab>
                    <Tab to="/goods/upload">上传</Tab>
                    <Tab to="/user/login">登录</Tab>
                </ul>
            </header>
        </div>
    )
}
function LoginHeader() {
    return (
        <div className="wrap-header-container">
            <header className="header">
                <ul className="app-nav-list">
                    <Tab to="/">首页</Tab>
                    <Tab to="/goods/list">发现</Tab>
                    <Tab to="/goods/upload">上传</Tab>
                    <Tab to="/user/logout">注销</Tab>
                </ul>
            </header>
        </div>
    )

}
function Tab(props: any) {
    return (
        <li className="item"><NavLink  {...props} activeClassName="active" /></li>
    )
}

//home views
function App() {
    const [state, dispatch] = useReducer(reducer, getInitState(), () => getInitState())
    console.log('init status', state)
    const loginStatus = state.isLogin;
    useEffect(() => {
        // @ts-ignore
        fetch(perfixerURL+"/api/home", {
            credentials: 'include'
        })
        // @ts-ignore
        .then((res) => {
            if (res.ok) return res.json()
        })
        .then((obj:any) => dispatch({ type: obj.isLogin ? LOGIN : LOGOUT }))
        .catch(() => dispatch({ type: LOGOUT }))
    }, [])
    console.log('login status', getInitState())
    if (getInitState().isLogin) return <LoginHeader />
    return <LogoutHeader />
};
export default App;
