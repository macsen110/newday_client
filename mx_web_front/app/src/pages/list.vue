<template>
  <div class="page-list container" @click="reflushStagnation">
    <h3 class="common-header header">
      <span @click="goBack" class="btn-go-back">取消</span>
    </h3>
    <div class="body">
      <ul class="nav">
        <li @click="filterListByCatId(item.id, index, item.val)" v-for="(item, index) in cateGoryList" :class="index == curFilterCatIndex ? 'item cur' : 'item'"  :key="index">{{item.val}}</li>
      </ul>
      <div class="list-container">
        <h4 class="tit">{{curFilterCatTitle}}</h4>
        <ul class="list clear">
          <li class="item" v-for="(item, index) in goods" :key="index">
            <div class="wrap-img">
              <img :src="item.pic" alt="">
            </div>
            <h5 class="price">{{item.price}}</h5>
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
          <li class="item">
            <span class="name">100ml豆浆加1个水煮蛋</span>
            <strong class="price">¥10.00</strong>
            <div class="wrap-actions">
              <i class="icon icon-reduce"></i>
              <em class="numbers">2</em>
              <i class="icon icon-plus"></i>
            </div>
          </li>
          <li class="item">
            <span class="name">100ml豆浆加1个水煮蛋</span>
            <strong class="price">¥10.00</strong>
            <div class="wrap-actions">
              <i class="icon icon-reduce"></i>
              <em class="numbers">2</em>
              <i class="icon icon-plus"></i>
            </div>
          </li>
          <li class="item">
            <span class="name">100ml豆浆加1个水煮蛋</span>
            <strong class="price">¥10.00</strong>
            <div class="wrap-actions">
              <i class="icon icon-reduce"></i>
              <em class="numbers">2</em>
              <i class="icon icon-plus"></i>
            </div>
          </li>
          <li class="item">
            <span class="name">100ml豆浆加1个水煮蛋</span>
            <strong class="price">¥10.00</strong>
            <div class="wrap-actions">
              <i class="icon icon-reduce"></i>
              <em class="numbers">2</em>
              <i class="icon icon-plus"></i>
            </div>
          </li>
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
import _xhr from '../utils/xhr';
export default {
  data: function () {
    return {
      stagnationTime: 30 * 100,
      stagnationEndCb: null,
      cartListData: [],
      cateGoryList:[],
      curFilterCatIndex: 0,
      curFilterCatTitle: '',
      goods: [
        
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

    },
    async filterListByCatId(catId, index, catName) {
      var ajaxData = await APP.utils.http({
        url: '?cmd=GetPlistByCategoryId&param={"categoryId":"'+catId+'","sess":"aaa"}'
      })
      ajaxData = this.filterAjaxData(ajaxData);
      if (ajaxData) {
        this.goods = ajaxData.goods;
        this.curFilterCatIndex = index;
        this.curFilterCatTitle = catName
      }
    },
    async initCateGoryList() {
      var ajaxData = await this.getCateGoryList()
      ajaxData = this.filterAjaxData(ajaxData);
      if (ajaxData) {
        this.cateGoryList = ajaxData.categories;
        this.filterListByCatId(this.cateGoryList[0].id, 0)
      } 
    },
    getCateGoryList() {
      return APP.utils.http({
        url: '?cmd=GetCategoryList&param={"sess":"aaa"}'
      })
    },
    filterAjaxData(data) {
      if (data.status == 'ok') return data.result;
      else {
        ui.showPrompt(data.msg)
        return false
      }
    }
  },
  
  created() {
    this.initCateGoryList()
    this.reflushStagnation()
  },
  beforeDestroy() {
    this.destroyStagnation()
  }
}
</script>
<style lang="scss">
@import '~styles/list.scss';
</style>


