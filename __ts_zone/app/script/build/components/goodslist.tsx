import * as React from 'react';
import { LISTGOODS } from "../actions/";
import reducer from "../reducers/listGoodsTs"
import { Link } from "react-router-dom";
const {
  useReducer,
  useEffect
} = React
function formatDate(now: any) {
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

function filterContent(words: any, num: any) {
  num = num || 100
  return words.length > num ? words.slice(0, num) + '...' : words
}

function List(props: any) {
  return (
    <ul className="app-list-page">
      {props.listGoods.map((item: any, index: number) => (
        <Blog_item key={item.goodsid} item={item} />
      ))}
    </ul>
  );
}

function Goodslist() {
  const [state, dispatch] = useReducer(reducer, [])
  useEffect(() => {
    // @ts-ignore
    fetch(perfixerURL + "/api/goods/list", {
      credentials: "include"
    })
      // @ts-ignore
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => dispatch({ type: LISTGOODS, value: res.data }))
  }, [])
  return (
    <List listGoods={state} />
  );
}
function Blog_Item_Image(props: any) {
  return (
    <div className="wrap-uri">
      <img
        src={"//res.macsen318.com" + props.path}
        width={props.width}
        height={props.height}
      />
    </div>
  )
}
function Blog_Item_Note(props: object) {
  return (<div></div>)
}
function Blog_Item_Video(props: any) {
  return (
    <div className="wrap-uri">
      <video
        src={"//res.macsen318.com" + props.path}
        autoPlay
      />
    </div>
  )
}
function Blog_item(props: any) {
  const item = props.item;
  const category = item.category;
  let RenderItemComponent: any;
  switch (category) {
    case 'image':
      RenderItemComponent = Blog_Item_Image;
      break;
    case "note":
      RenderItemComponent = Blog_Item_Note;
      break;
    case 'video':
      RenderItemComponent = Blog_Item_Video;
      break;
    default:
      break;
  }
  return (
    <li className="item">
      <Link to={"/goods/detail/" + item.goodsid}>
        <h2><span className="avator">{item.user}发布了{item.categoryDesc}</span><em className="time">{formatDate(new Date(item._time))}</em></h2>
        <h3>{item.title}</h3>
        <RenderItemComponent {...item} />
        <p className="content">{filterContent(item.content, '')}</p>
        <p className="more"><i className="i-comment"></i>{item.comment_count}</p>
      </Link>
    </li>
  );

}
export default Goodslist
