import React,{Component} from 'react';
import xhr from '../utils/xhr';
import {connect} from 'react-redux'; 
import {listGoodsAction, doneLoadingAction} from '../actions/actions';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { 
  Map, 
  List, 
  fromJS, 
  OrderedMap,
  Seq 
  } from 'immutable';

function mapStateToProps(state, ownProps) {
    return {
        listGoods: state.listGoods,
        doneLoading: state.doneLoading
    };
}

class goodslist extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        var self = this;
        fetch(perfixerURL+"/api/goods/list")
            .then(function(res){
                if (res.ok) {
                    return res.json()
                }
            })
            .then((obj) => {
                this.props.doneLoadingAction();
                this.props.listGoodsAction(obj.data)
            })
    }
    render() {
        var listGoods = this.props.listGoods;
        if (this.props.doneLoading) {
            if (listGoods.length) {
                return (<ul className="app-list-page">{listGoods.map((item, index) => <Blog_item key={item.goodsid} item={item} />)}</ul>)  
            }
            return <div style={{padding: .8+'rem', color: '#333'}}>暂无数据</div>
        }

        return(<div className="app-list-page">loading22222...</div>)
    }
}
class Blog_item extends React.Component {
    componentDidMount() {
    }
    render() {
        var item = this.props.item;
        var category = item.category;
        var itemEle;
        var content = item.content ? <div>{item.content}</div> : '';
        switch(category) {
            case 'image':
                itemEle = <div className="wrap-uri"><img src={'//res.macsen318.com'+item.path} width={item.width/2} /></div>;
                break;
            case 'video':
                itemEle = <div className="wrap-uri"><video src={'//res.macsen318.com'+item.path} controls="controls" autoPlay></video></div>;
                break;
            case 'note':             
                itemEle = <p className="content">{item.content}</p>; 
                break;
            default: 
                break
                
        }
        return (
            <li className="item">
                <Link to={'/goods/detail/' + item.goodsid}>
                    <h2>{item.user}</h2>
                    <h3>{item.title}</h3>
                    {itemEle}
                    <p className="more">查看详情</p>
                </Link>
            </li>
        ) 
    }
}
export default connect(mapStateToProps, {listGoodsAction, doneLoadingAction})(goodslist);


