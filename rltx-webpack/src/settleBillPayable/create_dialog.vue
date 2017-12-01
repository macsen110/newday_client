<template>
  <el-dialog :title="dialog.title"
             :visible.sync="dialog.show"
             size="tiny">
    <br>
    <div v-if="dialog.key!=='remove'">
      <el-checkbox v-model="dialog.checkbox"></el-checkbox>
      选择本账单内所有已选运单
    </div>
    <br>
    <div v-if="dialog.key!=='remove'">共选中{{batchCodeList.length}}条，将这些运单的{{dialog.title}}批量置为</div>
    <br>

    <div v-if="dialog.key==='remove'">共选中{{batchCodeList.length}}条，您确认移出这些运单吗？</div>
    <br>
    <div v-if="dialog.key!=='remove'">
      <el-input
        :placeholder="dialog.title"
        v-model="dialog.value"
        v-if="!dialog.selectList || !dialog.selectList.length"></el-input>
      <el-select
        :placeholder="dialog.title"
        v-model="dialog.value"
        v-if="dialog.selectList && dialog.selectList.length">
        <el-option
          :label="opt.label"
          :value="opt.value"
          :key="index"
          v-for="(opt,index) in dialog.selectList"></el-option>
      </el-select>
      <br>
    </div>
    <div v-else>移出后该运单将不在已选运单列表中。</div>
    <span slot="footer" class="dialog-footer">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onBatchSubmit">确 定</el-button>
          </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'create_dialog',
    data() {
      return {};
    },
    props: {
      batchCodeList: {
        required: true,
        type: Array,
        default() {
          return [];
        }
      },
      dialog: {
        required: true,
        type: Object,
        default() {
          return {};
        }
      },
      params: {
        required: true,
        type: Object,
        default() {
          return {};
        }
      }
    },
    methods: {
      onBatchSubmit() {
        if (!this.dialog.value && this.dialog.key !== 'remove') {
          const tipType = this.dialog.selectList.length ? '选择' : '输入';
          this.$message.error(`请先${tipType}${this.dialog.title}后再确定`);
          return;
        }
        this.dialog.show = false;
        console.log('批量弹框确定点击事件');
        console.log(this.dialog.checkbox);
        const data = {};
        if (!this.params.billCode) {
          data.carrierOrgName = this.params.carrierOrgName;
        } else {
          data.billCode = this.params.billCode;
        }
        if (this.dialog.key !== 'remove') {
          data[this.dialog.key] = this.dialog.value;
        }
        if (this.dialog.checkbox) {
//          console.log(this.searchDataPrev);
          Object.keys(this.$parent.searchDataPrev).forEach((key) => {
            data[key] = this.$parent.searchDataPrev[key];
          });
        } else {
          data.codeList = this.batchCodeList.join(',');
        }
        console.log('create_dialog->onBatchSubmit:', data);
        this.$emit('onBatchSubmit', data);
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

<style lang="scss">

</style>
