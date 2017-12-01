<template>
  <div>
    <div v-if="readonly || params.billCode">
       <div class='view-item'>
        <div class="item">账单编号：<span>{{submitData.billNo}}</span></div>
      </div>
      <div class='view-item'>
        <div class="item">账单状态：<span>{{waybillStatus()}}</span></div>
        <div class="item">收款状态：
          <span v-if="readonly">{{receivableStatus()}}</span>
          <select v-if="!readonly" v-model="submitData.receivableStatus">
            <option :value="item.value" v-for="(item,index) in receivableStatusSelect.list" :key='index'>{{item.label}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="view-item">
      <div class="item">收款方： <span class="userinfo-name">{{showData.selfName}}</span> <span class="userinfo-tip">[本公司]</span>
      </div>
      <div class="item">付款方：<span class="userinfo-name">{{params.clientOrgName}}</span> <span
        class="userinfo-tip">[客户]</span>
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: 'create_title',
    data() {
      return {
        receivableStatusSelect: {
          list: [{
            value: 'none',
            label: '未收款'
          }, {
            value: 'part',
            label: '部分收款'
          }, {
            value: 'all',
            label: '全部收款'
          }]
        }
      };
    },
    props: {
      params: {
        type: Object,
        default() {
          return {};
        }
      },
      showData: {
        type: Object,
        default() {
          return {};
        }
      },
      submitData: {
        type: Object,
        default() {
          return {};
        }
      },
      readonly: {
        type: Boolean,
        'default': false
      }
    },
    methods: {
      waybillStatus() {
        const formats = {
          none: '待提交审核',
          pend: '待审批',
          accept: '审批通过',
          reject: '审批不通过',
          destroy: '已作废'
        };
        return formats[this.submitData.billStatus];
      },
      receivableStatus() {
        const formats = {
          none: '未收款',
          part: '部分收款',
          all: '全部收款'
        };
        return formats[this.submitData.receivableStatus];
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
  .view-item{
    width: 100%;
    display: inline-block;
    line-height: 24px;

    .item{
      width: 400px;
      display: inline;
      float: left;
    }
  }
</style>
