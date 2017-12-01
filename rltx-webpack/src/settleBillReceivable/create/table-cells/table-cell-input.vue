<template>
    <span>
      <span v-if="!edit">{{value}}</span>
      <span v-if="edit">
        <input type="text" v-model="info[field.fieldConfigCode]">
      </span>
      <el-button @click="onEdit" v-if="!edit">编辑</el-button>
      <el-button @click="onCancel" v-if="edit">取消</el-button>
      <el-button @click="onSave" v-if="edit">保存</el-button>
    </span>
</template>

<script>
  export default {
    name: 'table-cell-input',
    data() {
      return {
        edit: false
      };
    },
    computed: {
      info() {
        return Object.assign({}, this.data);
      },
      value() {
        if (this.data[this.field.fieldConfigCode] && this.data[this.field.fieldConfigCode] !== '0') {
          if (this.formatterInfo && typeof this.formatterInfo === 'function') {
            return this.formatterInfo(this.data, this.field);
          }
        } else {
          // console.log('-', this.data[this.field.fieldConfigCode]);
          return '-';
        }
        return this.data[this.field.fieldConfigCode];
      }
    },
    props: {
      data: {
        required: true,
        type: Object,
        default() {
          return {};
        }
      },
      field: {
        required: true,
        type: Object,
        default() {
          return {};
        }
      },
      editInfo: {
        type: Object,
        default() {
          return {};
        }
      },
      index: {
        type: Number,
        'default': -1
      },
      formatterInfo: {
        type: Function
      }
    },
    methods: {
      onEdit() {
        if (!this.editInfo.onEdit) {
          this.edit = true;
        }
        this.$emit('onTableList', {
          eventName: 'onEdit',
          opts: {
            data: this.data,
            index: this.index,
            field: this.field
          }
        });
      },
      onCancel() {
        if (!this.editInfo.onCancel) {
          this.edit = false;
        }
        if (this.editInfo && this.editInfo.cancelReset) {
          this.info[this.field.fieldConfigCode] = this.data[this.field.fieldConfigCode];
        }
        this.$emit('onTableList', {
          eventName: 'onCancel',
          opts: {
            oldData: this.data,
            newData: this.info,
            index: this.index,
            field: this.field
          }
        });
      },
      onSave() {
        if (!this.editInfo.onSave) {
          this.edit = false;
        }
        this.$emit('onTableList', {
          eventName: 'onSave',
          opts: {
            oldData: this.data,
            newData: this.info,
            index: this.index,
            field: this.field
          }
        });
      },
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

<style lang="sass">

</style>
