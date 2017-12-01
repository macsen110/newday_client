<template>
  <div class="table-list-component fix-table-wrap" id="list">
    <el-table
      @selection-change="onSelectionChange"
      :data="list"
      border
      max-height="560"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-if="!readonly"
        fixed="left"
        label="操作"
        width="100">
        <template scope="scope">
          <el-button
            v-for="(btn,index) in btnList"
            :key="index"
            v-bind="btn.attrs"
            @click="btn.fn && typeof btn.fn==='function' ? btn.fn({ index: scope.$index, data: scope.row, btn, btnIndex: index }) : onClickBtn({ index: scope.$index, data: scope.row, btn, btnIndex: index })"
            :type="btn.type">{{btn.text}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(field,index) in fields"
        :fixed="formatterFixedArrow(field.fieldConfigCode)"
        :key="index"
        min-width="200"
        :prop="field.fieldConfigCode"
        :label="field.showName">
        <template scope='scope'>
          <!--{{scope.row[field.fieldConfigCode]}}-->
          <component
            @onTableList="onGetCellEvent"
            :data="scope.row"
            :field="field"
            :index="scope.$index"
            :editInfo="editFields[field.fieldConfigCode]"
            :formatterInfo='formatterFields[field.fieldConfigCode]'
            :is="updateCurComponent(field.fieldConfigCode, scope.row)"></component>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import * as TableCells from './table-cells/';

  export default {
    name: 'table-list',
    components: TableCells,
    data() {
      return {
        bindAttr: {},
        isCurComponent: ''
      };
    },
//    computed: {
//      list() {
//        return this.list;
//      },
//      fields() {
//        return this.fields;
//      }
//    },
    computed: {
      fixedLeftFields() {
        return this.fixedFields.left || [];
      },
      fixedRightFields() {
        return this.fixedFields.right || [];
      }
    },
    props: {
      // 数据
      list: {
        type: Array,
        default() {
          return [];
        }
      },
      // 字段
      fields: {
        type: Array,
        default() {
          return [];
        }
      },
      btnList: {
        type: Array,
        default() {
          return [];
        }
      },
      // 需要固定的列字段
      fixedFields: {
        type: Object,
        default() {
          return {
            left: [],
            right: []
          };
        }
      },
      // 需要编辑的字段
      editFields: {
        type: Object,
        default() {
          return {};
        }
      },
      batchFields: {
        type: Array,
        default() {
          return [];
        }
      },
      formatterFields: {
        type: Object,
        default() {
          return {};
        }
      },
      readonly: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    methods: {
      onSelectionChange(selection) {
        const opts = {
          allData: selection
        };
        for (let i = 0; i < this.batchFields.length; i++) {
          opts[this.batchFields[i]] = [];
          for (let j = 0; j < selection.length; j++) {
            opts[this.batchFields[i]].push(selection[j][this.batchFields[i]]);
          }
        }
        this.$emit('onSelectionChange', opts);
      },
      /**
       * 检测有没有需要固定的列
       */
      formatterFixedArrow(key) {
        if (this.fixedLeftFields.indexOf(key) !== -1) {
          return 'left';
        }
        if (this.fixedRightFields.indexOf(key) !== -1) {
          return 'right';
        }
        return false;
      },

      /**
       * 把表格所有的事件派发出去的的统一中间件
       * 写法:在表格组件中this.$emit('onTableList',{eventName:'onTest',opts:{}});
       * 然后按照此规则，在调用此组件时，可以直接接收上面定义的onTest的事件，参数就是opts对象。
       */
      onGetCellEvent({
                       eventName, opts
                     }) {
        this.$emit(eventName, opts);
      },
      onClickBtn(opts) {
        this.$emit('onClickBtn', opts);
      },
      /**
       * 更新当前表格需要渲染的组件，默认直接输出
       * @param key
       * @returns {any}
       */
      updateCurComponent(key, data) {
        return this.editFields[key] && this.editFields[key].component && !this.readonly && !data[`${key}UnitCodeAsyncEdit`] ? this.editFields[key].component : 'TableCellDefault';
      },

      /**
       * 初始化
       */
      init() {

      }
    },
    mounted() {
      this.init();
    },
    watch: {
      $route() {
        this.init();
      }
    }
  };
</script>

<style scoped lang="sass">
  @import "../../assets/sass/rl-fixed-table.min.scss";
  @import "../../assets/sass/base.scss";
</style>
