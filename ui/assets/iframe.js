var ui = window.YAO_M_UI || {}
;(function () {
  var codeTagList = document.querySelectorAll('.code');
  if (codeTagList.length) {
    [].forEach.call(codeTagList, formatCodeTag.bind(null))
  }

}())

function formatCodeTag(codeTag) {
  var html = codeTag.innerHTML
  var pattern = html.match(/\s*\n[\t\s]*/);
  codeTag.innerHTML = html.replace(new RegExp(pattern, "g"),'\n');
}

/**
 * Tab 组件Demo
 */
;(function () {
  var tabDemoDom = document.getElementById('tab_Widget_demo')
  var addTabBtn = document.getElementById('add_tab_btn')
  if (tabDemoDom) {
    var lastIndex = 3;
    var tab = demoTab()
    addTabBtn.addEventListener('click', function () {
      tab.tabNavContainer.insertAdjacentHTML('beforeend', "<li class='item'>nav-"+lastIndex+"</li>")
      tab.tabConContainer.insertAdjacentHTML('beforeend', "<li class='item'>content-"+lastIndex+"</li>")
      lastIndex++
    })
    
  }
  function demoTab() {
    return ui.TabWidget({
      curIdex: 1,
      callback: function (idx) {
        console.log(idx)
      }
    });
  }
}())

/***
 * totast插件
 */
;(function () {
  var totastDemo = document.getElementById('totast_demo');
  var totastDemoBtn1 = document.getElementById('totast_demo_btn1')
  var totastDemoBtn2 = document.getElementById('totast_demo_btn2')
  if (totastDemo) {
    totastDemoBtn1.addEventListener('click', function () {
      ui.showPrompt('我是简单totast弹层,3秒消失')
    })
    totastDemoBtn2.addEventListener('click', function () {
      ui.showPrompt({
        msg: '<span style="color: red">我是</span>html代码',
        cb: function (idx) {
          alert('5秒完毕,我消失了')
        },
        className: 'some-class-name',
        duration: 5000
      })
    })
  }
} ())

/**
 * dialog 插件
 */

 ;(function () {
   var dialogDemo = document.getElementById('dialog_demo');
   var dialogDemoBtn = document.getElementById('dialog_demo_btn');
   if (dialogDemo) {
    dialogDemoBtn.addEventListener('click', function () {
      ui.Dialog({
        title: '我是标题',
        content: '我是内容',
        afterClose: function() {
          console.log('我是点击关闭按钮以后调用的')
        },
        afterOpen: function () {
          console.log('我是弹框触渲染到页面发以后弹的')
        },
        afterOk: function () {
          console.log('我是点击确定按钮触发的')
          this.destory()
        },
        foot: '<button class="btn-dialog-ok">确定</button><button class="btn-dialog-cancel">取消</button>'
      })
    })
   }
 }())

 /**
  * easy Move滚动Demo
  */
  ;(function () {
    var swiperDemo = document.getElementById('easyMove_swiper_demo')
    var easyMoveDemo = document.getElementById('easy_move_demo')
    var fullpage = document.getElementById('easy_move_fullpage')
    if (swiperDemo) {
      ui.easyMove(document.querySelector('.easy-move-swiper'), {
        autoPlay: true,
        paginationList: document.querySelector('.pagination-list')
      })
    }
    if (easyMoveDemo) {
      function easyCallback (index) {
        [].forEach.call(this.element.children, function (item, idx) {
          if (index !== idx) item.classList.remove('on')
          else item.classList.add('on')
        })
      }
      var touchMoveCb = function (index) {
        [].forEach.call(this.element.children, function (item, idx) {
          item.classList.remove('on')
        })
      }
      
      var easyMove = ui.easyMove(document.getElementById('easy_move_list'), {
				index: 2,
				focusIndex: 1,
				showNum:4,
				limitBorder: true,
				touchMoveCb: function () {
          touchMoveCb.bind(easyMove)(easyMove.index)
        },
				callback: function (params) {
          easyCallback.bind(easyMove)(easyMove.index)
        }
      });
      
    }
    if (fullpage) {
      ui.easyMove(fullpage, {
        index: 0,
        showNum: 1,
        limitBorder: true,
        orientation: 2,
        distance: 30,
        childHeight: 200
      });
    }
  }())

/***
 * loading
 */

  ;(function () {
    var loadingDemo = document.getElementById('loading_demo');
    if(loadingDemo) {
      var startLoadingBtn = document.getElementById('start_loading_btn')
      var loading;
      startLoadingBtn.addEventListener('click', function () {
        loading = ui.Loading().start()
        setTimeout(function () {loading.end()}, 5000)
      })
      
    }
  }())
