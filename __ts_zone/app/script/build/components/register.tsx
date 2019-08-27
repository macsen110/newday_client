import * as React from 'react';
import xhr from '../utils/xhr';
import { showPrompt } from 'yao-m-ui';
import {FetchesContext} from '../context'
import {LOGIN} from '../actions'
const {
    useRef,
    useContext
} = React

function Register(props:any) {
    const {state, dispatch} = useContext(FetchesContext)
    let registerForm = useRef<HTMLFormElement>(null);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        var form = registerForm.current;
        if (!form) return;
        if (!form['username'].value) {
            showPrompt('请填写用户名!');
            return false;
        }
        if (!form['password'].value) {
            showPrompt('请填写密码');
            return false;
        }
        var url = '/api/users/saveuser';
        var formdata = 'username=' + form.username.value + '&password=' + form.password.value + "&test=" + null;
        return new Promise(function (resolve, reject) {
            new xhr({
                setHeader: 'application/x-www-form-urlencoded',
                sendData: formdata,
                method: 'POST',
                url: url,
                withCredentials: true,
                done: function (callData) {
                    resolve(callData)
                },
                faild: function () {
                    var error = new Error('something wrong');
                    reject(error)
                }

            })

        }).then(
            (obj:any) => {
                if (obj.code === 0) {
                    showPrompt({
                        msg: obj.msg,
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
            <p className="page-title">注册</p>
            <form method="post" action="/api/users/saveuser" className="form1" ref={registerForm} onSubmit={handleSubmit}>
                <p className="pt20"><input type="text" name="username" className="ipt" placeholder="用户名" /></p>
                <p className="pt20"><input type="password" name="password" className="ipt" placeholder="密码" /></p>
                <p className="pt20"><input type="submit" className="btn" /></p>
            </form>
        </div>
    )
}
export default Register;
