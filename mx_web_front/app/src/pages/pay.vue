<template>
  <div class="page-pay">
    <h3 class="header">
      <span @click="goBack" class="btn-go-back">取消</span>
    </h3>
    <div class="body" @click="openDialog">
      <div class="pay-box-header">
        <div class="unpay">
          <div class="left">
            我的订单<span class="num">2</span>件
          </div>
          <div class="right">
            ¥<em class="price">20.00</em>
          </div>
        </div>
      </div>
      <div class="pay-result">
        <div class="unpay-result">
          <p class="remian">120s</p>
          <p class="desc">等待支付</p>
          <p class="tip">请打开盒马App的付款码，对准下方扫码口</p>
          <img class="qrcode" alt="" src="/tmp/qrcode.png">
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
// import  ui from '../utils/ui.js';

export default {
  data: function () {
    return {
      stagnationTime: 10,
      stagnationEndCb: null
    }
  },
  methods: {
    openDialog() {
      
    },
    reflushStagnation() {
      this.destroyStagnation()
      this.stagnationEndCb = setInterval(this.loopStagnation, 1000)
    },
    loopStagnation() {
      if (this.stagnationTime > 0) --this.stagnationTime
      else {}
    },
    destroyStagnation() {
      this.stagnationEndCb && clearTimeout(this.stagnationEndCb);
    },
    
  },
  created() {
    this.reflushStagnation()
  },
  beforeDestroy() {
    //this.destroyStagnation()
  }
}
</script>
<style lang="scss">
@import '~styles/tools.scss';
@import '~styles/pay.scss';
</style>


