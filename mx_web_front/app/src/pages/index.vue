<template>
<div class="container page-index" @click="goList">
  <h3 class="bg-header"></h3>
  <div class="section-box clear">
    <ul class="list">
      <li class="item" v-for="item in randomGoods" :key="item.id">
        <img :src="item.url" />
        <div class="item-info-box">
          <div class="info">
            <p class="name">{{item.name}}</p>
            <p class="price">{{item.price}}</p>
          </div>
          <div class="tag hot">{{item.tagName}}</div>
        </div>
      </li>

    </ul>
  </div>
  
  <div class="footer">点击屏幕开始点餐</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      randomGoods: [
        {
          'id': 10,
          url: './tmp/tmp_item_0.png',
          name: '水煮鸡蛋',
          price: '20.00',
          tagName: '暖'

        },
        {
          'id': 11,
          url: './tmp/tmp_item_0.png',
          name: '水煮鸡蛋',
          price: '10.00',
          tagName: '暖'
        },
        {
          'id': 12,
          url: './tmp/tmp_item_0.png',
          name: '水煮鸡蛋',
          price: '20.10',
          tagName: '暖'
        }
      ]
    }
  },
  methods: {
    goList() {
      this.$router.push('list')
    }
  }
}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
@import '~styles/_tools.scss';
@import '~styles/index.scss';
</style>
