<template>
  <div>
    <div id="base">
      <h2 class="tmp-title">基本信息</h2>
      <div class="el-row">
        <slot name="base"></slot>
      </div>
    </div>
    <div id="transporter">
      <h2 class="tmp-title">运力信息</h2>
      <div class="el-row">
        <slot name="transporter"></slot>
      </div>
    </div>
    <div id="loading">
      <h2 class="tmp-title">装货信息</h2>
      <div class="el-row">
        <slot name="loading"></slot>
      </div>
    </div>
    <div id="unloading">
      <h2 class="tmp-title">卸货信息</h2>
      <div class="el-row">
        <slot name="unloading"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
