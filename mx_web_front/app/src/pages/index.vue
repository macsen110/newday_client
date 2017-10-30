<template>
<div class="container page-index" @click="goList">
  <h3 class="bg-header"></h3>
  <div class="section-box clear">
    <ul class="list">
      <li class="item">
        <img src="/tmp/tmp_item_0.png" />
        <div class="item-info-box">
          <div class="info">
            <p class="name">叉烧饭</p>
            <p class="price">10.00</p>
          </div>
          <div class="tag hot">暖</div>
        </div>
      </li>
      <li class="item">
        <img src="/tmp/tmp_item_0.png" />
        <div class="item-info-box">
          <div class="info">
            <p class="name">叉烧饭</p>
            <p class="price">10.00</p>
          </div>
          <div class="tag hot">暖</div>
        </div>
      </li>
      <li class="item">
        <img src="/tmp/tmp_item_0.png" />
        <div class="item-info-box">
          <div class="info">
            <p class="name">叉烧饭</p>
            <p class="price">10.00</p>
          </div>
          <div class="tag hot">暖</div>
        </div>
      </li>
    </ul>
  </div>
  
  <div class="footer">点击屏幕开始点餐</div>
</div>
</template>
<script>
export default {
  methods: {
    goList() {
      this.$router.push('list')
    }
  }
}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
@import '~styles/tools.scss';
@import '~styles/index.scss';
</style>
