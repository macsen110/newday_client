import * as React from 'react';
import {
    NavLink
} from 'react-router-dom';
import {LOGIN, LOGOUT} from '../actions'
import {FetchesContext} from '../context'
const {
    useEffect,
    useContext
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
                    <Tab exact to="/">首页</Tab>
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
    const {state, dispatch} = useContext(FetchesContext)
    useEffect(() => {
        fetch(perfixerURL+"/api/home", {
            credentials: 'include'
        })
        .then((res:any) => {
            if (res.ok) return res.json()
        })
        .then((obj:any) => dispatch({ type: obj.isLogin ? LOGIN : LOGOUT, value: obj.user }))
        .catch(() => dispatch({ type: LOGOUT }))
    }, [])
    if (state.isLogin) return <LoginHeader />
    return <LogoutHeader />
};
export default App;
