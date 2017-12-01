/**
* list.vue
* 菜单列表
* Created by zhuyi on 17/7/21.
*/
<template>
<div id="template">
<!-- S:browser-tip -->
<div class="browser-tip">
    <p>您的浏览器版本过低，页面可能无法正常显示。请立即<a href="http://browsehappy.com" target="_blank">升级浏览器</a>。</p>
    <span class="close-browser">【点击关闭】</span>
</div>
<!-- E:browser -->

<!-- S:header -->
<header class="header clearfix">
    <!-- logo -->
    <div class="logo fl">
        <h1 class="org-name org fl"></h1>
    </div>
    <!-- login-info -->
    <div class="login-info fr">
        <div class="message" id="message">
            <span class="msg-icon" @click="showMsgBox"><strong class="msg-number">{{msgTotal}}</strong></span>
            <div class="msg-box">
                <ul class="msg-list" v-if="msgList.length > 0">
                    <li v-for="item in msgList">
                        <a href="javascript:;">新消息：{{item.content}}。<span @click="delMessage(item)" class="blue">删除</span></a>
                    </li>
                </ul>
                <p v-else>暂无消息</p>
            </div>
        </div>
        <span class="user-role"></span> [<a href="javascript:;" class="logOut">退出</a>] | <a href="http://www.rltx.com" target="_blank">融链官网</a>
    </div>
    <!-- nav -->
    <nav class="top-nav">
        <ul class="top-nav-list" id="J_topNavList">
        </ul>
    </nav>
</header>
<!-- E:header -->

<!-- S:content -->
<div class="content">
    <!-- nav -->
    <nav class="nav" id="sideList">
        <h2 class="nav-title" id="navTitleName">业务管理</h2>
        <div id='J_template'>
        </div>
    </nav>
    <!-- fold -->
    <div class="fold" id="hideSide">
    </div>
    <!-- main -->
    <main class="main">
        <!-- page-tab -->
        <div class="page-tab">
            <div class="page-opr fr">
                <span class="full-screen" id="fullScreen">全屏</span>
            </div>
            <div class="tab-wrap">
                <span class="preview">&lt;</span>
                <span class="next">&gt;</span>
                <div class="tab-scroll">
                    <ul class="page-tab-list" id="tabList">
                        <li data-url="/menu/index.html" class="page-tab-item active" title="首页">
                            <span class="ellipsis page-tab-ellipsis-name">首页</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- page-wrapper -->
        <div class="page-wrapper" id="iframeContent">
            <!-- page iframe -->
            <iframe src="/menu/index.html" data-url='/menu/index.html' allowtransparency="true" frameborder="0" name="" class="iframe"></iframe>
        </div>
    </main>
</div>
<!-- E:content -->
</div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { list, deleted } from '../../api/MessageService';
import { toggleClass, hasClass, removeClass } from '../../api/classUtil';

export default {
  data() {
    return {
      paramObj: {
        sendStatus: 1,
        currentPage: 1,
        pageSize: 10
      },
      msgTotal: 0,
      msgList: []
    };
  },
  methods: {
    showMsgBox() {
      if (this.msgTotal === 0) {
        this.$message({
          type: 'warning',
          message: '暂无消息',
          duration: 1000
        });
      } else {
        toggleClass(document.querySelector('#message'), 'opened');
      }
    },
    getMsg() {
      this.msgList = [];
      list(this.paramObj, (success) => {
        this.msgTotal = success.total;
        success.content.forEach((val) => {
          const message = {};
          message.id = val.messageId;
          message.content = JSON.parse(val.messageBody).data;
          this.msgList.push(message);
        });
        // this.msgList = success.list;
      });
    },
    delMessage(item) {
      const paramObj = {
        id: item.id
      };
      deleted(paramObj, (success, error) => {
        if (success) {
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 1000
          });
          // this.msgTotal -= 1;
          this.getMsg();
        }
        if (error) {
          this.$message({
            type: 'warning',
            message: `${error}`,
            duration: 1000
          });
        }
      });
    }
  },
  created() {
    this.getMsg();
    document.addEventListener('click', (event) => {
      const target = event.target,
        message = document.querySelector('#message'),
        isOpened = hasClass(message, 'opened'),
        parents = [];
      let parent = target;
      if (parent) {
        // console.log('parent is', parent);
        while (parent && parent.nodeName !== 'BODY') {
          parent = parent.parentNode;
          // console.log(' new parent is', parent);
          parents.push(parent.className);
        }
        // console.log('parents is', parents);
      }
      // console.log(parents.indexOf('message opened'));
      if (parents.indexOf('message opened') <= -1 && isOpened) {
        // console.log('其他空白处');
        removeClass(message, 'opened');
      }
    });
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './menu.css';
  .header {
    z-index: 200;
  }
  .login-info {
    margin-top: 24px;
  }
  .nav-list li a {
    display: inline-block; 
    width: 126px;
    color: #000;
    &:hover {
        color: #f48400;
        text-decoration: none;
    }
  }
  .message {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    .msg-icon {
        position: relative;
        display: inline-block;
        width: 12px;
        height: 10px;
        margin-right: 5px;
        border: solid 1px #515356;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        opacity: .8;
        cursor:pointer;
        &:before, &:after {
            content: '';
            position: absolute;
            top: 2px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 6px 6px 0;
            border-color: #515356 transparent;
        }
        &:after {
            top: 1px;
            border-width: 6px 6px 0;
            border-color: #f9fafc transparent;
        }
        .msg-number {
            position: absolute;
            z-index: 20;
            top: -12px;
            right: -6px;
            padding: 2px 3px;
            border-radius: 4px;
            font-weight: 700;
            color: #fff;
            background-color: #00a65a;
        }
        &:hover {
            opacity: 1;
        }
    }
  }
  .msg-box {
    display: none;
    position: absolute;
    z-index: 10;
    top: 20px;
    right: 0;
    width: 300px;
    max-height: 300px;
    overflow: auto;
    border: solid 1px #ddd;
    border-radius: 4px;
    background-color: #fff;
    p {
        padding: 20px;
        text-align: center;
    }
  }
  .opened {
    .msg-box {
        display: block;
    }
  }
  .msg-list li {
    a {
        display: block;
        padding: 8px;
        margin: 8px;
        line-height: 1.2;
        background-color: #f9fafc;
        word-wrap: break-word;
        word-break: break-all;
        .blue {
          color: #0178be;
        }
        &:hover {
            background-color: #f1efe4;
            text-decoration: none;
        }
    }
  }
</style>

