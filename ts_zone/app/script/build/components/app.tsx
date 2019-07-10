import * as React from 'react';
import {
    NavLink
} from 'react-router-dom';
import reducer from '../reducers/init'
import {LOGIN, LOGOUT} from '../actions'
const {
    useReducer,
    useEffect
} = React
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
                    <Tab to="/communicate">我</Tab>
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
    const [state, dispatch] = useReducer(reducer, { isLogin: false })
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
        .then(() => dispatch({ type: LOGIN }))
        .catch(() => dispatch({ type: LOGOUT }))
    }, [])
    if (!loginStatus) return <LogoutHeader />
    return <LoginHeader />
};
export default App;
