
import React, {Component} from 'react';
import xhr from '../utils/xhr';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {connect} from 'react-redux'; 
import {showGoodAction, postCommetAction, deleteCommetAction, listCommetsAction} from '../actions/actions';
import { showPrompt } from 'yao-m-ui';
const unLoginCode = '00002';
function mapStateToProps(state, ownProps) {
    return {
        showGood: state.showGood,
        commets: state.commets,
        initData: state.initData
    };
}
class goodsDetail extends Component {
    //static contextTypes = Object.assign({},{history: PropTypes.history});
    constructor(props) {
        super(props)
        this.submitComment = this.submitComment.bind(this);
        this.deleteGoods = this.deleteGoods.bind(this);
    }
    componentDidMount() {
        var self = this;
        
        var promise = new Promise(function(resolve, reject ){
            new xhr({
                url: '/api/goods/detail/' + self.props.match.params.id,
                done: function(callData) {
                    resolve(callData)
                },
                faild: function() {
                    var error = new Error('something wrong')
                    reject(error)
                }

            })

        })
        promise.then(
            (obj) => {
                this.props.showGoodAction(obj.detail);
                this.props.listCommetsAction(obj.commets);              
            }, 
            (error) => console.log(error)
        )

    }

    render() {
        var goodsObj =  this.props.showGood; 
        var commets = this.props.commets;  
        if (goodsObj) {
            var files = goodsObj.files;          
            return (
                <div className="app-detail-page">
                    <p className="page-title">{goodsObj.title}</p>
                    {
                        files.length>0 && (<ul className="uri-list">
                                        {files.map((item,index) => <Blog_item key={index} item={item} category={goodsObj.category} /> )}
                                    </ul>)
                    }
                    {
                        
                           goodsObj.content != '' && (<p className="content">{goodsObj.content}</p>)
                    }
                    {commets.length ? 
                        <div className="comments-container">
                            <p className="comments-title">评论</p>
                            <ul className="list">{commets.map((item, index) => <CommetItem goodsId={goodsObj.id} history={this.props.history} user={this.props.initData.user} author={goodsObj.user} C_user ={item.C_user} deleteCommetAction = {this.props.deleteCommetAction}  key={index} item={item} />)}</ul>
                        </div> 
                        : ''
                    }                 
                    <div ref = 'wrapComment'>
                        <textarea className="ipt" />
                        <p><button onClick={this.submitComment} className="btn">提交评论</button></p>
                    </div>
                    {this.props.initData.user === goodsObj.user && <button onClick={this.deleteGoods} className="icon-delete-page">x</button>}
                </div>
            )
        }
        return(<div>{this.props.match.params.id}</div>)
    }
    deleteGoods() {
        var self = this;
        fetch(perfixerURL+'/api/goods/delete/'+ self.props.match.params.id, {
            method: 'DELETE',
            credentials: "include"
        }).then(function (res) {
            if(res.ok) {
                return res.json()
            }
        }).then((obj) => {
            if (obj.code === unLoginCode) return showPrompt({msg: obj.msg, cb: ()=> this.props.history.push('/user/login')})   
            if (obj.code == 0) {
                self.props.history.push('/goods/list')
            }
        })
    }
    submitComment() {
        var wrap_comment = this.refs.wrapComment;
        var commentEle = wrap_comment.querySelector('textarea');
        var self = this;
        var commentData = JSON.stringify({
           goodsid: self.props.match.params.id,
           comment: commentEle.value.trim()
        });
        fetch(perfixerURL+'/api/comments/',{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: commentData
        }).then(function (res) {
            if (res.ok) {
                return res.json()
            }
        }).then((obj) => {
            if (obj.code === unLoginCode) return showPrompt({msg: obj.msg, cb: () => this.props.history.push('/user/login')})   
            if (obj.code !== 0) return showPrompt({msg: obj.msg}) 
            this.props.postCommetAction({C_content:obj.commet, _id: obj._id, C_user: obj.C_user})
            commentEle.value = '';
        })
    }
}

class Blog_item extends React.Component {
    componentDidMount() {
    }
    render() {
        var item = this.props.item;
        var category = this.props.category;
        var itemEle;
        switch(category) {
            case 'image':
                itemEle = <img src={'//res.macsen318.com'+item.path} width={item.width} />;
                break;
            case 'video':
                itemEle = <video src={'//res.macsen318.com'+item.path} controls="controls" autoPlay></video>;
                break;
            case 'note':
                if(item.url) {
                    itemEle = <div><p>{item.content}</p><p><img src={'//res.macsen318.com'+item.path} width={item.width/2} /></p></div>;
                }
                else {
                    itemEle = <p>{item.content}</p>; 
                }
                break;
            default: 
                break
                
        }
        return (<li className="item">{itemEle}</li>) 
    }
}

class CommetItem extends Component { 
   
    delCommet(e) {
        var self = this;
        var item = e.target.parentNode;
        var C_id = item.dataset.id;
        var content = item.firstElementChild.innerHTML;
        let props = this.props;
        let goodsId = props.goodsId
        new xhr({
            url: '/api/comments/'+goodsId+'/'+C_id,
            method: 'DELETE',
            done: (obj) => {
                if (obj.code === 0) self.props.deleteCommetAction(+C_id) 
                if (obj.code === unLoginCode) return showPrompt({msg: obj.msg, cb: ()=> this.props.history.push('/user/login')})   
                if (obj.code !== 0) return showPrompt({msg: obj.msg}) 
            }
        })
        
    }
    render() {
        let props = this.props;
        var item = props.item;
        let goodsid = props.goodsid
        return (
            <li className="item" data-id={item._id}>
                <span className="con">{props.C_user +'评论: ' + item.C_content}</span>
                { (props.user == props.author || props.C_user == props.user) && <span className="del" onClick={(e)=>this.delCommet(e)}>删除</span>}
            </li>
        )
        
    }
}

export default connect(mapStateToProps, {showGoodAction, listCommetsAction, postCommetAction, deleteCommetAction})(goodsDetail);


