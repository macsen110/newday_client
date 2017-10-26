<template>
  <div class="container">
    <h1 @click="goPay">test</h1> 
    
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
<style src="../scss/test.scss"></style>