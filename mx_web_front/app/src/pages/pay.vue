<template>
  <div class="container page-pay">
    <h3 class="common-header header">
      <span @click="goBack" class="btn-go-back">取消</span>
    </h3>
    <div class="body">
      <div class="pay-box-header">
        <div v-if="orderInfo.status <= 1" class="unpay-header">
          <div class="left">
            我的订单<span class="num">{{orderInfo.number}}</span>件
          </div>
          <div class="right">
            ¥<em class="price">{{orderInfo.price}}</em>
          </div>
        </div>
        <div v-if="orderInfo.status == 2 || orderInfo.status == 3" class="payed-header">
          <p class="tit">支付成功</p>
          <p class="sub-tit">感谢惠顾，欢迎下次光临</p>
        </div>
      </div>
      <div class="pay-result">
        <div class="unpay-result" v-if="orderInfo.status <= 1">
          <p class="remian">{{loopPayTime}}s</p>
          <p class="result-text">等待支付</p>
          <p class="tip">请打开盒马App的付款码，对准下方扫码口</p>
          <span @click="toPay" class="qrcode" :style="{backgroundImage:'url(./tmp/qrcode.png)'}"></span>
        </div>
        <div v-if="orderInfo.status == 2 || orderInfo.status == 3" class="payed-result">
          <h3 class="result-text">
            {{orderInfo.status == 2 ? '正在出货…' : '已出货'}}
          </h3>
          <p :class="'result-sub-text '+ orderInfo.status == 3 ? 'visibile' : ''">请在屏幕下方的取货口提取您的餐食</p>
          <div v-if="orderInfo.status == 3" class="bg-result-finished"></div>
          <div v-else class="bg-result-payed"></div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import  * as ui from 'yao-m-ui';
export default {
  data: function () {
    /**@augments
     * status 0未支付
     * 1支付中
     * 2已支付未出库
     * 3已出库
     * 4支付超时
     * 5支付失败
     */
    return {
      loopPayTime: 60,
      loopPayTimeId: null,
      loopCloseTime: 5,
      loopCloseTimeId: null,
      mockPayStatus: 1,
      orderInfo: {
        number: 4,
        price: '40.00',
        status: 0, 
      },
      pageUxState: {
        dialog: null
      }
    }
  },
  methods: {
    openDialog(state) {
      this.destoryDialog();
      var msg;
      switch (state) {
        case 4: 
          msg = `支付时间超时，<em id="loopCloseTimeEle">${this.loopCloseTime}</em>秒后将关闭交易`;
          this.loopCloseTimeId = setInterval(()=> this.loopCloseTimeFun(), 1000)
          break
        case 5:
          msg = '支付异常';
          break
        default:
          break
        
      }
      this.pageUxState.dialog = ui.Dialog({
        parentEle: document.body.querySelector('.container'),
        content:msg,
        foot: '<button class="btn-dialog-cancel">立即关闭</button><button class="btn-dialog-ok">重新支付</button>',
        afterOk: () =>  {
          this.destoryDialog()
          this.reflushLoopPay();
        },
        afterClose: () => {
          this.destoryDialog()
          this.goHomePage()
        }
      })
      
    },
    destoryDialog() {
      this.pageUxState.dialog && this.pageUxState.dialog.destory()
    },
    
    reflushLoopPay() {
      this.destroyCloseTimeLoop()
      this.destroyPayTimeLoop()
      this.loopPayTime = 60;
      this.loopCloseTime = 5;
      this.loopPayTimeId = setInterval(this.loopPayTimeFun, 1000)
    },
    loopPayTimeFun() {
      if (this.loopPayTime > 0) this.loopPayTime--
      else this.loopPayTimeEndCb()
    },
    loopPayTimeEndCb() {
      this.destroyPayTimeLoop()
      this.orderInfo.status == 0 ? this.openDialog(4) : null;
    },
    loopCloseTimeFun() {
      if (this.loopCloseTime > 0) {
        var ele = document.getElementById('loopCloseTimeEle');
        ele && (ele.innerText = --this.loopCloseTime)
      }
      else this.loopCloseTimeEndCb()
    },
    loopCloseTimeEndCb() {
      this.destoryDialog();
      this.destroyCloseTimeLoop();
      this.goHomePage()
    },
    destroyPayTimeLoop() {
      this.loopPayTimeId && clearInterval(this.loopPayTimeId);
    },
    destroyCloseTimeLoop() {
      this.loopCloseTimeId && clearInterval(this.loopCloseTimeId);
    },
    toPay() {
      this.orderInfo.status = 1;
      if (this.mockPayStatus) setTimeout(()=> this.payOver(), 3000)
      this.mockPayStatus = null;
    },
    payOver() {
      this.orderInfo.status = 2;
      setTimeout(()=> this.finish(), 3000)
    },
    finish() {
      this.orderInfo.status = 3;
      setTimeout(() => ui.showPrompt({
        msg: '已完成,正在返回首页...',
        cb: () => this.goHomePage()
      }), 3000)
      
    },
    goHomePage() {
      this.$router.push({path: '/'})
    },
    goBack() {
      history.back()      
    }
  },
  created() {
    this.reflushLoopPay()
  },
  beforeDestroy() {
    this.destroyCloseTimeLoop()
    this.destroyPayTimeLoop()
    this.destoryDialog()
  }
}
</script>
<style lang="scss">

@import '~styles/pay.scss';
</style>

