/**
* list.vue
* 运单列表
* Created by zyc on 17/7/21.
*/
<template>
  <div id="template">
    <div class="page-header clearfix">
      <h2 class="page-title fl">
        人员列表
      </h2>
    </div>
    <div class="page-content clearfix">
      <div class="role-aside fl">
        <div class="hd-opr">
          <el-button type="primary" size="small" @click.stop="addDialog"><i class="el-icon-plus"></i> 新增部门 </el-button>
          <el-button size="small" @click="editDialog"><i class="el-icon-edit"></i> 编辑</el-button>
          <el-button size="small" @click.stop="deletedDept"><i class="el-icon-delete"></i> 删除</el-button>
        </div>
        <div class="role-tree" id="roleTree">
          <el-tree :data="listdata" :highlight-current="showCheck" :props="defaultProps" :default-expand-all="true" :show-checkbox="true"  :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
        </div>
      </div>
      <div class="role-table">
        <employee-table ref="list" :params="extraSearchParamObj" :isHide="true" :deptList="selfList"></employee-table>
      </div>
      <!--<listLayout :showDownloadTemplate="showDownloadTemplate" :showImportButton="showImportButton" :add="add" :downloadErrorData="downloadErrorData" :downloadTemplate="downloadTemplate" :importUrl="importUrl" :exportCsv="exportCsv" ref="list" :extraSearchParamObj="extraSearchParamObj" :isHide="true" class="layout-content" :deleteFun="deleteFun" :getColumn="getColumn" :getList="getList" :getSearch="getSearch" :objectName="objectName" :editUrl="editUrl" :addUrl="addUrl">-->
      <!--</listLayout>-->
    </div>
    <el-dialog
      title="新增部门"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <div class="dialog-form">
        <div class="dialog-form-item required">
          <span>部门名称：</span>
          <input type="text" v-model="deptName" id="deptName" placeholder="部门名称不能为空" class="el-input__inner" />
        </div>
        <div class="dialog-form-item required">
          <span>上级部门：</span>
          <input type="text" id="parentDeptCode" v-model="parentDeptCode" class="el-input__inner" />
        </div>
        <div class="dialog-form-item">
          <span>部门描述： </span>
          <textarea id="description" v-model="description" class="el-textarea__inner"></textarea>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDept" :disabled="isAdd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑部门"
      :visible.sync="dialogVisible1"
      size="tiny"
      :before-close="handleClose">
      <div class="dialog-form">
        <div class="dialog-form-item required">
          <span>部门名称：</span>
          <input type="text" id="editDeptName" v-model="editDeptName" placeholder="部门名称不能为空" class="el-input__inner" />
        </div>
        <div class="dialog-form-item required">
          <span>上级部门：</span>
          <el-select v-model="editParentDeptName" placeholder="请选择上级部门">
            <el-option
              v-for="item in selfList"
              :key="item.deptName"
              :label="item.deptName"
              :disabled="item.code === checkedDept.code"
              :value="item.deptName">
            </el-option>
          </el-select>
          <!--<input type="text" id="editParentDeptName" v-model="editParentDeptName" class="el-input__inner" />-->
        </div>
        <div class="dialog-form-item">
          <span>部门描述： </span>
          <textarea id="editDescription" v-model="editDescription" class="el-textarea__inner"></textarea>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editDept" :disabled="isEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addDept, editDept, deletedDept, getSelfDept } from '../../../api/OrgService';
  import { hasClass } from '../../../api/classUtil';
  import table from './table.vue';

  export default {
    name: 'employeeList',
    components: {
      'employee-table': table
    },
    data: () => {
      return {
        listdata: [],
        selfList: [],
        defaultProps: {
          children: 'children',
          label: 'deptName'
        },
        dialogVisible: false,
        dialogVisible1: false,
        checkedDept: {},
        showCheck: true,
        deptName: '',
        parentDeptCode: '',
        description: '',
        editDeptName: '',
        editParentDeptName: '',
        editDescription: '',
        extraSearchParamObj: {},
        isAdd: false,
        isEdit: false
      };
    },
    methods: {
      handleNodeClick(data) {
        // console.log(data.deptName, '的code为', data.code);
        this.checkedDept = data;
        if (data.code !== 'org-Name') {
          this.$set(this.extraSearchParamObj, 'deptCode', data.code);
        } else {
          this.$delete(this.extraSearchParamObj, 'deptCode');
        }
        this.$refs.list.dispatchQueryEvent();
      },
      addDialog() {
        this.deptName = '';
        this.parentDeptCode = this.checkedDept.deptName || JSON.parse(localStorage.userInfo).orgFullName;
        this.description = '';
        this.dialogVisible = true;
      },
      addDept() {
        if (!this.deptName) {
          this.$message({
            type: 'error',
            message: '请输入部门名称',
            duration: 1000
          });
          return false;
        }
        if (!this.parentDeptCode) {
          this.$message({
            type: 'error',
            message: '请输入上级部门名称',
            duration: 1000
          });
          return false;
        }
        this.isAdd = true;
        const Obj = {
            deptName: this.deptName,
            description: this.description
          },
          parentObj = this.getDeptInfoByName(this.parentDeptCode);
        if (parentObj) {
          Obj.parentDeptCode = this.getDeptInfoByName(this.parentDeptCode).code;
        }
        addDept(Obj, (success, error) => {
          if (error || success.code !== 200) {
            this.isAdd = false;
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
            return false;
          }
          if (success) {
            this.isAdd = false;
            this.handleClose();
            this.$message({
              message: '添加部门成功',
              type: 'success'
            });
            this.refreshList();
          }
        });
      },
      editDialog() {
        if (!this.checkedDept.code) {
          this.$message({
            type: 'warning',
            message: '请选择您要编辑的部门'
          });
          return false;
        }
        if (this.checkedDept.code !== 'org-Name') {
          this.editDeptName = this.checkedDept.deptName;
          this.editParentDeptName = this.getDeptInfoByCode(this.checkedDept.parentDeptCode) ?
            this.getDeptInfoByCode(this.checkedDept.parentDeptCode).deptName : JSON.parse(localStorage.userInfo).orgFullName;
          this.editDescription = this.checkedDept.description;
          this.dialogVisible1 = true;
        } else {
          this.$message({
            type: 'warning',
            message: '不能编辑组织信息'
          });
        }
      },
      editDept() {
        if (!this.editDeptName) {
          this.$message({
            type: 'error',
            message: '请输入部门名称',
            duration: 1000
          });
          return false;
        }
        if (!this.editParentDeptName) {
          this.$message({
            type: 'error',
            message: '请选择上级部门',
            duration: 1000
          });
          return false;
        }
        this.isEdit = true;
        const obj = {
          code: this.getDeptInfoByName(this.editDeptName).code,
          deptName: this.editDeptName,
          description: this.editDescription
        };
        console.log('edit obj is', obj);
        if (this.getDeptInfoByName(this.editParentDeptName)) {
          obj.parentDeptCode = this.getDeptInfoByName(this.editParentDeptName).code;
        }
        editDept(obj, (success, error) => {
          if (error || success.code !== 200) {
            this.isEdit = false;
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
            return false;
          }
          if (success) {
            this.isEdit = false;
            this.handleClose();
            this.$message({
              message: '编辑部门成功',
              type: 'success'
            });
            this.refreshList();
          }
        });
      },
      deletedDept() {
        const paramObj = {
          code: this.checkedDept.code
        };
        if (!this.checkedDept.code) {
          this.$message({
            type: 'warning',
            message: '请选择您要删除的部门'
          });
          return false;
        }
        if (this.checkedDept.code === 'org-Name') {
          this.$message({
            type: 'warning',
            message: '根目录不可以删除'
          });
          return false;
        }
        this.$confirm('是否确认删除该部门', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletedDept(paramObj, (success) => {
            if (success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.checkedDept.code = null;
              this.refreshList();
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleClose() {
        this.dialogVisible = false;
        this.dialogVisible1 = false;
        this.deptName = '';
        this.parentDeptCode = '';
        this.description = '';
        this.editDeptName = '';
        this.editParentDeptName = '';
        this.editDescription = '';
        this.isAdd = false;
        this.isEdit = false;
      },
      refreshList() {
        // 更新列表方法
        this.listdata = [];
        this.selfList = [];
        const userInfo = JSON.parse(localStorage.userInfo).orgFullName,
          obj = {
            deptName: userInfo,
            children: [],
            code: 'org-Name'
          };
        this.listdata.push(obj);
        this.selfList.push(obj);
        getSelfDept({}, (success) => {
          if (success) {
            this.selfList = this.selfList.concat(success.content);
            // console.log('合并后的部门list', this.selfList);
            const content = success.content,
              // 已有parentcode列表
              existArray = {
                'org-Name': this.listdata[0]
              },
              // 未插入列表
              unexistArray = {};
            for (let i = 0, len = content.length; i < len; i++) {
              // 查看是否有没有已经渲染父节点
              if (!content[i].parentDeptCode || content[i].parentDeptCode === 'null' || content[i].parentDeptCode === 'org-Name') {
                content[i].parentDeptCode = 'org-Name';
              }
              console.log('existArray', existArray);
              const parentSpace = existArray[content[i].parentDeptCode];
              if (parentSpace) {
                const parentSpaceChildren = parentSpace.children,
                  parentSpaceChildrenLen = parentSpaceChildren.length;
                // 父节点中插入对象
                content[i].children = content[i].children || [];
                parentSpace.children.push(content[i]);
                // 获取插入对象，按值引用，后面直接添加子节点
                existArray[content[i].code] = parentSpace.children[parentSpaceChildrenLen];
                // 看看有没有未插入的子元素，插入已保存列表，然后获取到他对应的对象插入到已存在对象的属性中
                if (unexistArray[content[i].code] && unexistArray[content[i].code].length > 0) {
                  // 插入之前没有push进来的对象
                  const toBePushObj = existArray[content[i].code],
                    pushObjArray = unexistArray[content[i].code],
                    newLen = toBePushObj.children.length;
//                  toBePushObj.children.push(pushObjArray);
//                  existArray[pushObjArray] = toBePushObj.children[newLen];
                  for (let k = 0, len1 = pushObjArray.length; k < len1; k++) {
                    toBePushObj.children.push(pushObjArray[i]);
                    existArray[pushObjArray[i].code] = toBePushObj.children[newLen + k];
                  }
                  delete unexistArray[content[i].code];
                }
              } else {
                // 将自己的parentcode挂到不存在对象的属性上
                content[i].children = [];
                // 保存一个数组来存放未插入的对象
                let unExistObj = unexistArray[content[i].parentDeptCode];
                unExistObj = unExistObj || [];
                unExistObj.push(content[i]);
              }
            }
          }
        });
      },
      getDeptInfoByName(name) {
        for (let i = 0, len = this.selfList.length; i < len; i++) {
          if (this.selfList[i].deptName === name) {
            return this.selfList[i];
          }
        }
        return null;
      },
      getDeptInfoByCode(code) {
        for (let i = 0, len = this.selfList.length; i < len; i++) {
          if (this.selfList[i].code === code) {
            return this.selfList[i];
          }
        }
        return null;
      },
      getHeight() {
        const winHeight = window.innerHeight,
          pageHeader = document.querySelectorAll('.page-header')[0].offsetHeight,
          pagination = document.querySelector('.pagination').offsetHeight,
          tableOprHeight = document.querySelector('.table-opr').offsetHeight,
          pageContent = winHeight - pageHeader,
          pageTable = winHeight - pageHeader - pageHeader - tableOprHeight - pagination - 2;
        // console.log('pageContent is', pageContent);
        // console.log('pageTable is', pageTable);
        document.querySelector('.page-content').style.height = `${pageContent}px`;
        document.querySelector('#list').style.height = `${pageContent}px`;
        document.querySelector('#roleTree').style.height = `${pageContent - 35}px`;
        document.querySelector('.advance-search').style.height = `${pageContent}px`;
        document.querySelector('#asBd').style.maxHeight = `${pageContent - 75}px`;
        document.querySelector('.fix-table-wrap').style.height = `${pageTable}px`;
      }
    },
    created() {
      this.refreshList();
    },
    mounted() {
      document.body.addEventListener('click', (event) => {
        const target = event.target;
        // console.log(target);
        if (hasClass(target, 'el-dialog__wrapper')) {
          document.body.removeChild(document.querySelector('.el-select-dropdown:last-child'));
        }
      });
      // 检测高度
      this.$nextTick(() => {
        this.getHeight();
        window.onresize = () => {
          this.getHeight();
        };
      });
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .page-content {
    background-color: #f6f6f6;
  }
  .el-tree {
    padding: 10px 0px;
    border: none;
    background: transparent;
  }
  .role-aside {
    width: 236px;
  }
  .role-table {
    margin-left: 236px;
  }
  #list {
    background-color: #fff;
    border-left: solid 1px #e6e6e6;
  }
  .layout-content {
    .hd-opr {
      height: 25px;
      padding: 0;
      .tit {
        font-size: 16px;
        line-height: 25px;
      }
    }
    margin-left: 238px;
  }
  .el-form--inline .el-form-item {
    .el-form-item {
      margin-right: 0;
    }
  }
  .mini-search {
    .el-input {
      width: 140px;
    }
  }
  .role-tree{
    overflow: auto;
  }

  .el-dialog__body {
    min-height: auto;
  }

  .dialog-form {
    .dialog-form-item {
      padding-left: 100px;
      margin-bottom: 10px;
      span {
        float: left;
        width: 90px;
        text-align: right;
        margin-left: -100px;
        line-height: 24px;

      }
      .el-textarea__inner {
        min-width: auto;
        height: 100px;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    .required {
      span {
        &:before {
          content: '*';
          display: inline-block;
          margin-right: 3px;
          color: #f48400;
        }
      }
    }
  }

  .el-radio-group {
    padding: 20px 10px;
    display: block;
    .el-radio {
      display: block;
      margin-left: 0;
      margin-bottom: 10px;
    }
  }

  .el-checkbox-group {
    padding: 20px 10px;
    .el-checkbox {
      margin-left: 0;
      margin-bottom: 10px;
    }
  }

  .hd-opr{
    padding: 5px;
  }

  .el-tree-node__content>.el-checkbox {
    display: none;
  }

  .el-tree-node__expand-icon {
    cursor: pointer;
    width: 0;
    height: 0;
    margin-left: 10px;
    border: 8px solid transparent;
    border-right-width: 0;
    border-left-color: #97a8be;
    border-left-width: 10px;
    -ms-transform: rotate(0);
    transform: rotate(0);
    transition: transform .3s ease-in-out;
  }

  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #f1efe4;
  }
</style>
