<template>
  <div class="container">
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
<style src="../scss/list.scss"></style>


