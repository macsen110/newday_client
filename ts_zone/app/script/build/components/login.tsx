import * as React from 'react';
import xhr from '../utils/xhr';
import {
    Link
} from 'react-router-dom';
import { showPrompt } from 'yao-m-ui';
import {FetchesContext} from '../context'
import {LOGIN} from '../actions'
const {
    useRef,
    useContext
} = React
function Login(props) {
    const {state, dispatch} = useContext(FetchesContext)
    let loginForm = useRef<HTMLFormElement>(null);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        var form = loginForm.current;
        if (!form) return;
        if (!form['username'].value) {
            showPrompt('请填写用户名!');
            return false;
        }
        if (!form['password'].value) {
            showPrompt('请填写密码');
            return false;
        }
        var senddata = JSON.stringify({
            username: form['username'].value,
            password: form['password'].value,
            test: null
        });
        return new Promise(function (resolve, reject) {
            new xhr({
                setHeader: 'application/json',
                sendData: senddata,
                method: 'POST',
                url: '/api/users/validuser',
                done: function (callData) {
                    resolve(callData)
                },
                faild: function () {
                    var error = new Error('something wrong')
                    reject(error)
                }

            })

        })
            .then(
                (obj: any) => {
                    if (obj.code == 0) {
                        showPrompt({
                            msg: "登陆成功",
                            cb: () => {
                                dispatch({ type: LOGIN, value: obj.user })
                                props.history.push({ pathname: '/goods/upload' })
                            }
                        });
                    }
                    else showPrompt(obj.msg)
                },
                error => console.log(error)
            )
    }

    return (
        <div id="register_page" className="app-register-page">
            <p className="page-title">登录</p>
            <form method="post" action="/api/users/validuser" className="form1" ref={loginForm} onSubmit={handleSubmit}>
                <p className="pt20"><input type="text" name="username" className="ipt" placeholder="用户名" /></p>
                <p className="pt20"><input type="password" name="password" className="ipt" placeholder="密码" /></p>
                <p className="pt20"><input type="submit" className="btn" /></p>
                <p className="pt10"><Link to="/user/register">注册</Link></p>
            </form>
        </div>
    )

}
export default Login;