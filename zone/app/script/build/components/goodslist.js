import React, { Component } from "react";
import xhr from "../utils/xhr";
import { connect } from "react-redux";
import { listGoodsAction, doneLoadingAction } from "../actions/actions";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Map, List, fromJS, OrderedMap, Seq } from "immutable";
function formatDate(now) {
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  return (
    year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second
  );
}

function filterContent(words, num) {
  num = num || 100
  return words.length > num ? words.slice(0, num) + '...' : words
}

function mapStateToProps(state, ownProps) {
  return {
    listGoods: state.listGoods,
    doneLoading: state.doneLoading
  };
}

class goodslist extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var self = this;
    fetch(perfixerURL + "/api/goods/list", {
      credentials: "include"
    })
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(obj => {
        this.props.doneLoadingAction();
        this.props.listGoodsAction(obj.data);
      });
  }
  render() {
    var listGoods = this.props.listGoods;
    if (this.props.doneLoading) {
      if (listGoods.length) {
        return (
          <ul className="app-list-page">
            {listGoods.map((item, index) => (
              <Blog_item key={item.goodsid} item={item} />
            ))}
          </ul>
        );
      }
      return (
        <div style={{ padding: 2 + "rem", color: "#333" }}>暂无数据</div>
      );
    }

    return <div className="app-list-page">loading...</div>;
  }
}
class Blog_item extends React.Component {
  componentDidMount() {}
  render() {
    var item = this.props.item;
    var category = item.category;
    var itemEle;
    var content = item.content ? <div>{item.content}</div> : "";
    
    switch (category) {
      case "image":
        itemEle = (
          <div className="wrap-uri">
            <img
              src={"//res.macsen318.com" + item.path}
              width={item.width / 2}
            />
          </div>
        );
        break;
      case "video":
        itemEle = (
          <div className="wrap-uri">
            <video
              src={"//res.macsen318.com" + item.path}
              controls="controls"
              autoPlay
            />
          </div>
        );
        break;
      case "note":
        itemEle = '';
        break;
      default:
        break;
    }
    return (
      <li className="item">
        <Link to={"/goods/detail/" + item.goodsid}>
          <h2><span className="avator">{item.user}</span><em className="time">{formatDate(new Date(item._time))}</em></h2>
          <h3>{item.title}</h3>
          {itemEle}
          <p className="content">{filterContent(item.content)}</p>
          <p className="more">查看详情</p>
        </Link>
      </li>
    );
  }
}
export default connect(mapStateToProps, { listGoodsAction, doneLoadingAction })(
  goodslist
);
