
import React, {Component} from 'react';
import xhr from '../utils/xhr';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {connect} from 'react-redux'; 
import {showGoodAction, postCommetAction, deleteCommetAction, listCommetsAction} from '../actions/actions';

function mapStateToProps(state, ownProps) {
    return {
        showGood: state.showGood,
        commets: state.commets
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
        console.log(this)
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
                            <ul className="list">{commets.map((item, index) => <CommetItem deleteCommetAction = {this.props.deleteCommetAction} key={index} item={item} />)}</ul>
                        </div> 
                        : ''
                    }                 
                    <div ref = 'wrapComment'>
                        <textarea className="ipt" />
                        <p><button onClick={this.submitComment} className="btn">提交评论</button></p>
                    </div>
                    <button onClick={this.deleteGoods} className="icon-delete-page">x</button>
                </div>
            )
        }
        return(<div>{this.props.match.params.id}</div>)
    }
    deleteGoods() {
        var self = this;
        fetch('/api/goods/delete/'+ self.props.match.params.id, {
            method: 'DELETE'
        }).then(function (res) {
            if(res.ok) {
                return res.json()
            }
        }).then((obj) => {
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
        fetch('/api/comments/',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: commentData
        }).then(function (res) {
            if (res.ok) {
                return res.json()
            }
        }).then((obj) => {
            commentEle.value = '';
            this.props.postCommetAction({C_content:obj.commet, _id: obj._id}
        )})
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
                itemEle = <img src={item.path} width={item.width} />;
                break;
            case 'video':
                itemEle = <video src={item.path} controls="controls" autoPlay></video>;
                break;
            case 'note':
                if(item.url) {
                    itemEle = <div><p>{item.content}</p><p><img src={item.path} width={item.width/2} /></p></div>;
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
        var goodid = item.dataset.id;
        var content = item.firstElementChild.innerHTML;
        new xhr({
            url: '/api/comments/' + goodid,
            method: 'delete',
            done: function(obj) {
                if (obj.code ===0) {
                    self.props.deleteCommetAction(+goodid) 
                }
            }
        })
        
    }
    render() {
        var item = this.props.item;
        return (
            <li className="item" data-id={item._id}><span className="con">{item.C_content}</span><span className="del" onClick={(e)=>this.delCommet(e)}>删除</span></li>
        )
        
    }
}

export default connect(mapStateToProps, {showGoodAction, listCommetsAction, postCommetAction, deleteCommetAction})(goodsDetail);


