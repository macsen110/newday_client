<template>
<div class="container page-index">
  <h3 class="bg-header"></h3>
  <div class="section-box"></div>
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
