<template>
  <div class="container">
    <h2 @click="test">pay</h2> 
    
  </div>
</template>
<script>
export default {
  methods: {
    test() {
      this.$router.push('test')
    }
  }
}
</script>
<style lang="scss">
@import '~styles/tools.scss';
@import '~styles/pay.scss';
</style>


