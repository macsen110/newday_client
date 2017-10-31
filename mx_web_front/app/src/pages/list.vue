<template>
  <div class="page-list container" @click="reflushStagnation">
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
                <i class="tag hot">暖</i>
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
    <div @click="toggleCartBox(false)" class="widget-mask" v-show="pageUxState.showCartBox"></div>
  </div>
</template>
<script>
import  * as ui from 'yao-m-ui';
export default {
  data: function () {
    return {
      stagnationTime: 30,
      stagnationEndCb: null,
      cartListData: [],
      goods: [
        {
          url: './tmp/tmp_item_0.png',
          name: '100ml豆浆加1个水煮鸡蛋',

        },
        {
          url: './tmp/tmp_item_0.png',
          name: '100ml豆浆加1个水煮鸡蛋',

        },
        {
          url: './tmp/tmp_item_0.png',
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
      this.destroyStagnation()
      ui.showPrompt({
        msg: '正在创建订单...',
        cb: () => this.$router.push('pay')
      });
    },
    goBack() {
      history.back()      
    },
    filterList(type) {
      console.log(type)
    },
    toggleCartBox(flag) {
      this.pageUxState.showCartBox = flag
    },
    reflushStagnation() {
      this.destroyStagnation()
      this.stagnationEndCb = setTimeout(() => this.$router.push({ path: '/' }), this.stagnationTime * 1000)
    },
    destroyStagnation() {
      this.stagnationEndCb && clearTimeout(this.stagnationEndCb);
    },
    addCart() {

    },
    reduceCartArr() {

    }
    
  },
  created() {
    this.reflushStagnation()
  },
  beforeDestroy() {
    this.destroyStagnation()
  }
}
</script>
<style lang="scss">
@import '~styles/tools.scss';
@import '~styles/list.scss';
</style>


