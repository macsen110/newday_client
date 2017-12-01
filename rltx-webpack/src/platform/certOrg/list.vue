<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="list" class="list-page">
    <!-- advance search -->
    <div class="advance-search">
      <div class="as-hd clearfix">
        <h3 class="tit fl">高级搜索</h3>
        <span class="as-close fr" id="asClose" @click="closeAdvanceSearch">
            <i class="el-icon-close"></i>
        </span>
      </div>
      <div class="as-bd" id="asBd">
        <v-tableSearch :getData="getData" :searchFields="searchFields" :searchModel="searchModel" :isShow="false" ref="tableSearch"></v-tableSearch>
      </div>
    </div>

    <div class="list-wrap">
      <div class="page-header clearfix">
        <h2 class="page-title fl">组织审核</h2>
        <span class="page-refresh fr" id="pageRefresh">
          <i class="ico-refresh"></i>刷新
        </span>
      </div>
      <div class="block">
        <div class="table-opr clearfix">
          <div class="mini-search fr" id="miniSearch">
            <v-minTableSearch :getData="getData" :searchFields="searchFields" :searchModel="searchModel" :isShow="true" ref="tableSearch"></v-minTableSearch>
          </div>
        </div>
        <!-- fix-table-wrap -->
        <div class="fix-table-wrap">
          <table class="rl-fix-table table-bordered">
            <thead>
            <tr>
              <th class="fix-hd fix-col"><input type="checkbox" class="ck-all"></th>
              <th class="fix-hd fix-col">操作</th>
              <th v-for="column in columnsData" class="fix-hd">
                {{ column.showName }}
          </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="list in listData" :data-error="list.error">
              <td class="fix-col">
                <input type="checkbox" class="ck-single">
              </td>
              <td class="fix-col">
                <div class="cell" style="width: 100px">
                  <el-select placeholder="请选择" v-model="operValues[list.code]">
                    <el-option v-if="list.certStatus === 'authenticating'" :key="'审核'" :label="'审核'" :value="'审核'">
                      <div @click="openWindow(`${approvalUrl}?code=${list.code}`, '审核组织')">
                        <a href="JavaScript:;">审核</a>
                      </div>
                    </el-option>
                    <el-option v-if="list.disabled === 'false'" :key="'冻结'" :label="'冻结'" :value="'冻结'">
                      <div @click="handleDisabled(list, 'true')">
                        <a href="JavaScript:;">冻结</a>
                      </div>
                    </el-option>
                    <el-option v-else="list.disabled === 'true'" :key="'解冻'" :label="'解冻'" :value="'解冻'">
                      <div @click="handleDisabled(list, 'false')">
                        <a href="JavaScript:;">解冻</a>
                      </div>
                    </el-option>
                  </el-select>
                </div>
              </td>
              <td v-for="(column,index) in columnsData">
                <template v-if="column.detailLinkVisiable==='true'">
                  <a href="javascript:;" class="blue" @click="openWindow(`${approvalUrl}?code=${list.code}`, '审核组织')">
                    <ele-block :field="column" :domainObject="list" :editable="false"></ele-block>
                  </a>
                </template>
                <template v-else>
                  <ele-block :field="column" :domainObject="list" :editable="false"></ele-block>
                </template>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change"></v-page>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable object-shorthand */

  import eleConfig from '../../components/ele-config/eleConfig.vue';
  import eleBlock from '../../components/ele-block/eleBlock.vue';
  import * as utils from '../../../api/Utils';
  import page from '../../components/ele-table/elePage.vue';
  import tableSearch from '../../components/ele-table/eleTableSearch.vue';
  import minTableSearch from '../../components/ele-table/eleMinSearchOnly.vue';
  import * as elementService from '../../../api/ElementService';
  import { certOrgSearch, certOrgColumn, certOrgList, certOrgDisabled } from '../../../api/PlatformService';
  import * as classUtil from '../../../api/classUtil';

  // 引入tab跳转
  require('../../public.js');

  export default {
    name: 'certOrgList',
    components: {
      'v-tableSearch': tableSearch,
      'v-minTableSearch': minTableSearch,
      'ele-config': eleConfig,
      'ele-block': eleBlock,
      'v-page': page
    },
    data() {
      return {
        columnsData: [],
        listData: [],
        searchData: [],
        pageSize: 50,
        page: 1,
        total: null,
        searchFields: [],
        searchModel: {},
        loading: true,
        leftDistance: '',
        topDistance: '',
        operValues: {},
        approvalUrl: '/platform/cert_org/approval.html'
      };
    },
    methods: {
      resetScrollBar() {
        const tableWrap = document.querySelector('.fix-table-wrap'),
          fixHd = document.querySelectorAll('.fix-hd'),
          fixCol = document.querySelectorAll('.fix-col');
        tableWrap.scrollTop = this.topDistance;
        tableWrap.scrollLeft = this.leftDistance;
        for (let i = 0, len = fixHd.length; i < len; i++) {
          fixHd[i].style.top = `${this.topDistance}px`;
        }
        for (let j = 0, len = fixCol.length; j < len; j++) {
          fixCol[j].style.left = `${this.leftDistance}px`;
        }
      },
      closeAdvanceSearch() {
        const listPage = document.querySelector('#list'),
          miniSearch = document.querySelector('#miniSearch');
        classUtil.toggleClass(listPage, 'opened');
        classUtil.toggleClass(miniSearch, 'hide');
      },
      getData() {
        this.listData = [];
        this.total = 0;
        const self = this,
          codeArr = [];
        this.paramObj = {
          size: this.pageSize,
          page: this.page
        };
        Object.keys(this.searchModel).forEach((key) => {
          self.paramObj[key] = self.searchModel[key];
        });
        certOrgList(this.paramObj, (success) => {
          this.listData = success.content;
          this.total = success.total;
          success.content.forEach((data) => {
            codeArr.push(data.code);
          });
          this.$nextTick(() => {
            this.loading = false;
            this.resetScrollBar();
          });
        });
      },
      change(newPage, newPageSize) {
        const tableWrap = document.querySelector('.fix-table-wrap');
        this.topDistance = tableWrap.scrollTop;
        this.leftDistance = tableWrap.scrollLeft;
        this.page = newPage;
        this.pageSize = newPageSize;
        this.getData();
      },
      handleDisabled(row, disabled) {
        const paramObj = {
            disabled: disabled
          },
          h = this.$createElement;
        let message = '您确认冻结该组织吗？冻结后，该组织将无法登陆平台';
        if (!disabled) {
          message = '您确认解冻该组织吗？解冻后，该组织将可以正常登陆平台';
        }
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, message)
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              certOrgDisabled(row.orgCode, paramObj, (success, error) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: disabled ? '冻结成功' : '解冻成功',
                    duration: 1000
                  });
                  done();
                  instance.confirmButtonLoading = false;
                }
                if (error) {
                  this.$message({
                    type: 'warning',
                    message: `${error}`,
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                }
              });
            } else {
              done();
            }
          }
        }).then(() => {
          this.getData();
        });
      },
      openWindow(url, title) {
        utils.urlRedirect(url, title);
      }
    },
    created() {
      // 获取检索区域
      certOrgSearch((searchConfig) => {
        const self = this;
        if (searchConfig) {
          elementService.elementDefine((elementDefine) => {
            elementService.elementInfo((elementInfo) => {
              const paramData = utils.getParam({ data: { content: searchConfig.content } }, { data: { content: elementDefine.content } }, { data: { content: elementInfo.content } });
              paramData.field.forEach((field) => {
                field.extraParams.forEach((property) => {
                  self.$set(self.searchModel, property.field, null);
                });
              });
              self.searchFields = paramData.field;
              // self.searchModel.certStatus = 'authenticating';
              this.getData();
            });
          });
        }
      });
      // 获取列名
      certOrgColumn((success) => {
        if (success) {
          elementService.elementDefine((elementDefine) => {
            elementService.elementInfo((elementInfo) => {
              const columns = utils.getParam(
                { data: { content: success.content } },
                { data: { content: elementDefine.content } },
                { data: { content: elementInfo.content } }
              );
              this.columnsData = columns.field;
            });
          });
        }
      });
    },
    mounted() {
      // 重置宽度
      function fixedTable() {
        const tableWrap = document.querySelector('.fix-table-wrap'),
          top = tableWrap.scrollTop,
          left = tableWrap.scrollLeft,
          fixHd = document.querySelectorAll('.fix-hd'),
          fixCol = document.querySelectorAll('.fix-col'),
          unit = 'px';
        for (let i = 0, len = fixHd.length; i < len; i++) {
          fixHd[i].style.top = top + unit;
        }
        for (let j = 0, len = fixCol.length; j < len; j++) {
          fixCol[j].style.left = left + unit;
        }
      }
      document.querySelector('.fix-table-wrap').addEventListener('scroll', fixedTable);
      // 单选
      function checkRow() {
        const ckAll = document.querySelector('.ck-all'),
          ckSingle = document.querySelectorAll('.ck-single'),
          ckLength = ckSingle.length;
        let countNum = 0;
        ckSingle.forEach((item) => {
          if (item.checked === true) {
            countNum += 1;
            classUtil.addClass(item.parentNode.parentNode, 'active');
          } else {
            classUtil.removeClass(item.parentNode.parentNode, 'active');
          }
        });
        if (countNum === ckLength) {
          ckAll.checked = true;
        } else {
          ckAll.checked = false;
        }
      }
      document.querySelector('.fix-table-wrap').addEventListener('click', (event) => {
        const target = event.target;
        if (classUtil.hasClass(target, 'ck-single')) {
          checkRow();
        }
        if (target.nodeName === 'TD') {
          target.parentNode.childNodes[0].querySelector('.ck-single').click();
        }
        if (target.nodeName === 'SPAN' && target.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName === 'TD') {
          target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].querySelector('.ck-single').click();
        }
      });
      // 全选
      function checkAll() {
        const ckAll = document.querySelector('.ck-all'),
          ischeckAll = ckAll.checked,
          ckTr = document.querySelectorAll('.rl-fix-table tbody tr'),
          ckSingle = document.querySelectorAll('.ck-single');
        ckSingle.forEach((item) => {
          item.checked = ischeckAll;
        });
        if (ischeckAll === true) {
          ckTr.forEach((tr) => {
            classUtil.addClass(tr, 'active');
          });
        } else {
          ckTr.forEach((tr) => {
            classUtil.removeClass(tr, 'active');
          });
        }
      }
      document.querySelector('.ck-all').addEventListener('click', checkAll);

      // 检测高度
      this.$nextTick(() => {
        utils.adaptHeight();
        window.onresize = () => {
          utils.adaptHeight();
        };
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/sass/rl-fixed-table.min.scss";
  @import "../../assets/sass/base.scss";
</style>

