<template>
  <el-dropdown @command="_handleSelect" split-button @click="_handleClick" trigger="click">
    {{primaryMenu.name}}
    <el-dropdown-menu slot="dropdown" v-if="subMenuList.length">
      <el-dropdown-item v-for="item in subMenuList" key="item.key" :command="item.key">{{item.name}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script type="text/ecmascript-6">

  export default {
    props: {
      domainObject: Object,
      menuItems: Array,
      handleSelect: Function
    },
    computed: {
      primaryMenu() {
//        console.log('primaryMenu', this.menuItems);
        if (this.menuItems.length > 0) {
          return this.menuItems[0];
        }
        return null;
      },
      subMenuList() {
//        console.log('subMenuList', this.menuItems);
        const items = [];
        if (this.menuItems.length > 0) {
          this.menuItems.forEach((item, index) => {
            if (index > 0) {
              items.push(item);
            }
          });
        }
        return items;
      }
    },
    methods: {
      _handleClick() {
//        console.log('command', this.primaryMenu.key, 'menu', this.primaryMenu, 'domainObject', this.domainObject);
        this.handleSelect(this.primaryMenu.key, this.primaryMenu, this.domainObject);
      },
      _handleSelect(command) {
        const menu = this.subMenuList.filter(item => item.key === command);
//        console.log('command', command, 'menu', menu, 'domainObject', this.domainObject);
        this.handleSelect(command, menu[0], this.domainObject);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .el-button-group .el-button:first-child {
    min-width: 70px;
  }
  .el-dropdown .el-dropdown__caret-button .el-dropdown__icon {
    color: #ddd;
  }
  .el-button--default:hover .el-dropdown .el-dropdown__caret-button .el-dropdown__icon {
    color: #f48400 !important;
  }
</style>
