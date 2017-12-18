import React, { Component } from 'react';
import * as UI from 'yao-m-ui';
import {
    Link
  } from 'react-router-dom';
export default class Communicate extends Component {
	constructor(props, context) {  
        super(props, context);
        this.state = {
            chatList: [],
            socket: null
        }
    }
	componentDidMount() {
        var _self = this;
        try {
            var Manager = require('socket.io-client');
            var socket = new Manager("http://dev.macsen318.com");           
            socket.on('connect', () => _self.setState({socket: socket}))
            socket.on('chat', (obj) => _self.setChatList.bind(_self)(obj))
         }
         catch (e) {
             console.log(e)
         }
	}
    sendChat(data) {
        //loading.start()
        var _self = this;
        var ipt = _self.refs.chat_content;
        _self.setChatList.bind(_self)({data: ipt.value})
        _self.state.socket && _self.state.socket.emit('chat', {data: ipt.value})
    }
    setChatList(obj) {
        var _self = this;
        var chatList = _self.state.chatList;
        chatList.push(obj)
        _self.setState({
            chatList: chatList
        })
    }
    render() {
        var state = this.state; 
        var isLogin = null;
        return (
            <div className="app-home-page">
                <div className="chat-container">
                    {(()=>{
                        if(state.chatList.length) {
                            return (
                                <ul className="chat-list">
                                    {state.chatList.map((item, index) => {
                                        return (<li key={index} className="item">{item.data}</li>)
                                    })}
                                </ul>
                            )
                        }
                    })()}
                    <div className="chat-box" ref="chat_box"></div>
                    <input type="text" ref="chat_content" className="ipt"/>
                    <botton className="btn" onClick={() => this.sendChat()} ref="send_chat_btn">submit</botton>
                    {JSON.parse(isLogin) ? <Link to="/user/logout">注销账号</Link> : ''}
                </div>
            </div>
        )
    }
    
};
