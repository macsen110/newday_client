<template>
  <div class="page-list container">
    <h1 @click="goPay">list</h1> 
    
  </div>
</template>
<script>
export default {
  methods: {
    goPay() {
      this.$router.push('pay')
    }
  }
}
</script>
<style lang="scss">
@import '~styles/tools.scss';
@import '~styles/list.scss';
</style>


