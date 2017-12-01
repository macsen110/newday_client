<template>
  <ele-list :selectable="selectable" :operatable="operatable"
            @query="query" @ready="query" @action="action" @exportData="exportData"
            :total="total" :loading="loading"
            :listData="listData"
            ref="eleList"
            :customColumn="customColumn"
            :params="params"
            :needPage="needPage"
            :isAdvanced="isAdvanced" :isHide="isHide"
            :add="add"
            :downloadErrorData="downloadErrorData"
            :downloadTemplate="downloadTemplate"
            :importUrl="importUrl"
            :editUrl="editUrl"
            :getColumn="getColumn"
            :exportCsv="exportCsv"
            :getSearch="getSearch"
            :objectName="objectName">
  </ele-list>
</template>
<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */

  import eleList from '../../components/ele-list/eleList.vue';
  import { getColumn, list, getSearch, deleted, exportCsv, add, downloadErrorData, downloadTemplate, personDeptRelationList } from '../../../api/EmployeeService';
  import { getUserRoleList } from '../../../api/RoleService';
  import ApiConst from '../../../api/ApiConst';
  import { urlRedirect } from '../../../api/Utils';

  export default {
    name: 'employeeList',
    components: {
      'ele-list': eleList
    },
    props: {
      isHide: {
        type: Boolean,
        'default': false
      },
      selectable: {
        type: Boolean,
        'default': true
      },
      operatable: {
        type: Boolean,
        'default': true
      },
      customColumn: Array,
      isAdvanced: {
        type: Boolean,
        'default': true
      },
      needPage: {
        type: Boolean,
        'default': true
      },
      params: {
        type: Object,
        'default': function () {
          return {};
        }
      },
      deptList: {
        type: Array,
        'default': function () {
          return [];
        }
      }
    },
    data() {
      return {
        total: 0,
        loading: true,
        listData: [],
        objectName: '人员',
        addUrl: '/employee/add.html',
        editUrl: '/employee/add.html',
        listUrl: '/employee/list.html',
        importUrl: `${ApiConst.apiPersonDomain}/import/employee`,
        exportCsv,
        downloadErrorData,
        downloadTemplate,
        add,
        getSearch,
        getColumn,
        deptMap: {}
      };
    },
    methods: {
      dispatchQueryEvent() {
        this.$refs.eleList.dispatchQueryEvent();
      },
      openWindow(url, title) {
        urlRedirect(url, title);
      },
      exportData(params) {
        exportCsv(params, (success) => {
          window.location.href = success.content.url;
        });
      },
      doRemove(model) {
        const self = this;
        this.$msgbox({
          title: '确认',
          message: `确认要删除${this.objectName} ${model.fullName} 吗？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              deleted({ code: model.code }, (success, error) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '删除成功',
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
          self.$refs.eleList.dispatchQueryEvent();
        });
      },
      action(command, menu, model) {
        switch (command) {
          case 'add':
            this.openWindow(`${this.editUrl}?objectName=${this.objectName}`, `新建${this.objectName}`);
            break;
          case 'edit':
            this.openWindow(`${this.editUrl}?code=${model.code}&objectName=${this.objectName}`, `编辑${this.objectName}`);
            break;
          case 'remove':
            this.doRemove(model);
            break;
          default:
            break;
        }
      },
      query(searchParams) {
        const that = this;
        console.log('searchParams', searchParams);
        Object.assign(searchParams, this.params);
        console.log('query', searchParams);
        that.total = 0;
        that.loading = true;
        list(searchParams, (success, error) => {
          if (error) {
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
          }
          if (success) {
            that.total = success.total;
            const codeList = [];
            success.content.forEach((row) => {
              const actionList = [];
              actionList.push({ key: 'edit', name: '编辑' });
              actionList.push({ key: 'remove', name: '删除' });
              row.actionMenuList = actionList;
              row.departmentName = '';
              row.roleName = '';
              codeList.push(row.code);
            });
            that.listData = success.content;
            if (codeList.length) {
              personDeptRelationList({ userCodeList: codeList }, (sc, er) => {
                if (sc) {
                  sc.content.forEach((item) => {
                    that.listData.forEach((employee) => {
                      if (employee.code === item.userCode) {
                        employee.deptCode = item.deptCode;
                        employee.departmentName = this.deptMap[item.deptCode];
                      }
                    });
                  });
                }
              });

              getUserRoleList({ userCodeList: codeList }, (sc, er) => {
                if (sc) {
                  const userRoleList = {};
                  sc.content.forEach((item) => {
                    if (item.userCode && item.roleCode && item.roleName) {
                      if (!userRoleList[item.userCode]) {
                        userRoleList[item.userCode] = [];
                      }
                      userRoleList[item.userCode].push(item.roleName);
                    }
                  });
                  that.listData.forEach((employee) => {
                    if (userRoleList[employee.code]) {
                      employee.roleName = userRoleList[employee.code].join(',');
                    }
                  });
                }
              });
            }
            that.loading = false;
          }
        });
      }
    },
    watch: {
      deptList() {
        this.deptList.forEach((item) => {
          this.deptMap[item.code] = item.deptName;
        });
      }
    }
  };
</script>
