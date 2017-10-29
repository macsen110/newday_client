<template>
  <div class="page-list container">
    <h3 class="header">
      <span @click="goBack" class="btn-go-back">取消</span>
    </h3>
    <div class="body">
      <ul class="nav">
        <li class="item cur" @click="filterList('sd')">套餐</li>
        <li class="item" @click="filterList('ds')">食品</li>
        <li class="item" @click="filterList('ds')">饮品</li>

      </ul>
      <div class="list-container">
        <h4 class="tit">套餐</h4>
        <ul class="list clear">
          <li class="item" v-for="(item, index) in goods" :key="index">
            <div class="wrap-img">
              <img :src="item.url" alt="">
            </div>
            <h5 class="price">10.00</h5>
            <div class="wrap-item-info">
              <p class="name">{{item.name}}</p>
              <div class="wrap-sku">
                <i class="sign hot">暖</i>
                <div class="wrap-actions">
                  <i class="icon icon-reduce"></i>
                  <em class="numbers">2</em>
                  <i class="icon icon-plus"></i>
                </div>
              </div>
            </div>
          </li>          
        </ul>
      </div>
    </div>
    <div class="footer">
      <div class="wrap-cart-info">
        <div class="cart-info">
          <i class="icon-cart" @click="toggleCartBox(true)">
            <em class="cart-number">5</em>
          </i>
          <p>共计:<strong class="total-price">0.00</strong></p>
        </div>
        <button :disabled='pageUxState.buyBtnDisabled'  @click="goPay" class="btn">去结算</button>
      </div>
      <div class="cart-items-box" v-show="pageUxState.showCartBox">
        <h4 class="head"><i class="icon close" @click="toggleCartBox(false)"></i></h4>
        <ul class="item-list">
          <li class="item">
            <span class="name">100ml豆浆加1个水煮蛋</span>
            <strong class="price">¥10.00</strong>
            <div class="wrap-actions">
              <i class="icon icon-reduce"></i>
              <em class="numbers">2</em>
              <i class="icon icon-plus"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="widget-mask" v-show="pageUxState.showCartBox"></div>
  </div>
</template>
<script>
import  ui from '../utils/ui.js';
export default {
  data: function () {
    return {
      goods: [
        {
          url: '/tmp/tmp_item_0.png',
          name: '100ml豆浆加1个水煮鸡蛋',

        },
        {
          url: '/tmp/tmp_item_0.png',
          name: '100ml豆浆加1个水煮鸡蛋',

        },
        {
          url: '/tmp/tmp_item_0.png',
          name: '100ml豆浆加1个水煮鸡蛋',

        }
      ],
      
      pageUxState: {
        showCartBox: false,
        buyBtnDisabled: false,
      }
    }
  },
  methods: {
    goPay() {
      this.pageUxState.buyBtnDisabled = true;
      var pay4Dialog = ui.Dialog({
        content:'是否要去支付',
        foot: '<button class="btn-dialog-cancel">取消</button><button class="btn-dialog-ok">确定</button>',
        afterOk: () =>  {
          pay4Dialog.destory()
          this.$router.push('pay')
        },
        afterClose: () => this.pageUxState.buyBtnDisabled = false
      })
      
      
    },
    goBack() {
      ui.showPrompt({
        msg: '呀，超出库存量了',       
        cb: function () {
          history.back()
        }
      })
      
    },
    filterList(type) {
      console.log(type)
    },
    toggleCartBox(flag) {
      this.pageUxState.showCartBox = flag
    }
  }
}
</script>
<style lang="scss">
@import '~styles/tools.scss';
@import '~styles/list.scss';
</style>


