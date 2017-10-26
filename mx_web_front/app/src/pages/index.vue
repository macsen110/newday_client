<template>
<div class="container">
  <nav>home</nav>
  <div @click="goList">go list</div>
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
<style src="../scss/index.scss"></style>
