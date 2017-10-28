<template>
  <div class="page-list container">
    <h3 class="header">
      <span @click="goBack" class="btn-go-back">取消</span>
    </h3>
    <div class="body">
      <ul class="nav">
        <li class="item cur" @click="filterList('sd')">item1</li>
        <li class="item" @click="filterList('ds')">item2</li>
        <li class="item" @click="filterList('ds')">item3</li>

      </ul>
      <div class="list-container">
        <h4 class="tit">套餐</h4>
        <ul class="list">
          <li class="item" v-for="(item, index) in goods" :key="index">
            <div class="wrap-pic">
              <img :src="item.url" alt="">
            </div>
          </li>
          <li class="item" v-for="(item, index) in goods" :key="index">
            <div class="wrap-pic">
              <img :src="item.url" alt="">
            </div>
          </li>
          <li class="item" v-for="(item, index) in goods" :key="index">
            <div class="wrap-pic">
              <img :src="item.url" alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      goods: [
        {
          url: '/tmp/tmp_item_0.png',
          name: '100ml豆浆加1个水煮鸡蛋',

        }
      ]
    }
  },
  methods: {
    goPay() {
      this.$router.push('pay')
    },
    goBack() {
      history.back()
    },
    filterList(type) {
      console.log(type)
    }
  }
}
</script>
<style lang="scss">
@import '~styles/tools.scss';
@import '~styles/list.scss';
</style>


