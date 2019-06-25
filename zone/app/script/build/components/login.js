import React, { useState }  from 'react';
import xhr from '../utils/xhr';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { initAction } from '../actions/actions';
import { showPrompt } from 'yao-m-ui';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory();
//Login views
/**
 * 
 */
function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
        </button>
        </div>
    );
}
class Login extends React.Component {
    //static contextTypes = Object.assign({},{history: PropTypes.history});

    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = this.refs.registerForm;
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

        var url = form.action;
        var promise = new Promise(function (resolve, reject) {
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
        promise.then(
            obj => {
                if (obj.code == 0) {
                    showPrompt({
                        msg: obj.msg,
                        cb: () => {
                            this.props.initAction({
                                isLogin: obj.isLogin,
                                user: obj.user
                            })
                            this.props.history.push({ pathname: '/goods/upload' })
                        }
                    });
                }
                else showPrompt(obj.msg)
            },
            error => console.log(error)
        )
    }
    render() {
        return (
            <div id="register_page" className="app-register-page">
                <p className="page-title">登录</p>
                <form method="post" action="/api/users/validuser" className="form1" ref="registerForm" onSubmit={this.handleSubmit}>
                    <p className="pt20"><input type="text" name="username" className="ipt" placeholder="用户名" /></p>
                    <p className="pt20"><input type="password" name="password" className="ipt" placeholder="密码" /></p>
                    <p className="pt20"><input type="submit" className="btn" /></p>
                    <p className="pt10"><Link to="/user/register">注册</Link></p>
                </form>
                <Example />
            </div>
        )
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            // navigated!
        }
    }
}
export default connect(null, { initAction })(Login);