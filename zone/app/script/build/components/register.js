import React, {Component} from 'react';
import xhr from '../utils/xhr';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {connect} from 'react-redux'; 
import {initAction} from '../actions/actions';
import {showPrompt} from 'yao-m-ui';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory();
//register views
class register extends Component {
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
        var url = form.action;
        var formdata = 'username=' + form.username.value + '&password=' + form.password.value+"&test="+null;
        var promise = new Promise(function(resolve, reject ){
            new xhr({
                setHeader:  'application/x-www-form-urlencoded',
                sendData: formdata,
                method: 'POST',
                url: url,
                withCredentials: true,
                done: function(callData) {
                    resolve(callData)
                },
                faild: function() {
                    var error = new Error('something wrong');
                    reject(error)
                }

            })

        })        
        promise.then(
            obj => {
                showPrompt(obj.msg)
                if(obj.code == 0) {
                    this.props.initAction({isLogin: obj.isLogin})
                    this.props.history.push({pathname: '/'});
                }
            }, 
            error => console.log(error)
        )
    }
    render() {
        return (
            <div id="register_page" className="app-register-page">
                <p className="page-title">register</p>
                <form method="post" action="/api/users/saveuser" className="form1" ref = "registerForm" onSubmit={this.handleSubmit}>
                    <p className="pt20"><input type="text" name="username" className="ipt" placeholder="username" /></p>
                    <p className="pt20"><input type="password" name="password" className="ipt" placeholder="password" /></p>
                    <p className="pt20"><input type="submit" className="btn" /></p>
                </form>
            </div>
        )
    }
}
export default connect(null, {initAction})(register);
