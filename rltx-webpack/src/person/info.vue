<template>
  <div class="form-page">
    <div class="page-header clearfix">
      <h2 class="page-title fl">
      个人信息
      </h2>
      <!-- <span class="page-refresh fr" id="pageRefresh">
        <i class="ico-refresh"></i>刷新
      </span> -->
    </div>
    <div class="verify-status">
      <!-- <h2>认证情况</h2> -->
      <div class="vs-section clearfix">
        <div class="user-info fl">
            <ul class="text-list">
              <li>
                <span class="name">用户ID：</span>
                <span class="value">
                  {{ editParams.code }}
                </span>
              </li>
              <li>
                <span class="name">账号：</span>
                <span class="value">
                  {{ editParams.loginAccount }}
                </span>
              </li>
            </ul>
            <p class="remark">
              注：如需修改密码或验证手机号码，请到
              <a href="javascript:;" data-link="/safe/safe.html" data-title="安全设置">安全设置</a>
            </p>
        </div>
        <div class="avatar-uploader-box fr">
          <el-upload
            class="avatar-uploader"
            :action=actionUrl
            :show-file-list="false"
            with-credentials
            :data=actionParams
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <span v-if="imageUrl" class="edit-avatar">修改头像</span>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- <el-button @click="editInfo()">提交头像</el-button> -->
        </div>
      </div>
    </div>
    <div class="basic-info">
      <!-- <h2>个人基本信息</h2> -->
      <div class="bi-section">
        <div class="basic-info-opr">
          <el-button type="text" @click='editBI()' v-show="isShow === false">修改</el-button>
          <el-button @click='cancelBI()' v-show="isShow === true">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" v-show="isShow === true">保存</el-button>
        </div>
        <!-- 1 -->
        <div class="basic-info-list" v-show="isShow === false">
          <ul class="text-list">
              <li>
                <span class="name">真实姓名：</span>
                <span class="value">
                  {{ editParams.fullName }}
                </span>
              </li>
              <li>
                <span class="name">手机号：</span>
                <span class="value">
                  {{ editParams.phone }}
                </span>
              </li>
              <li>
                <span class="name">性别：</span>
                <span class="value">
                  {{ editParams.gender == 1 ? '男' : '女' }}
                </span>
              </li>
              <li>
                <span class="name">启用状态：</span>
                <span class="value">
                  {{ editParams.userStatus == 'active' ? '已启用' : '未启用' }}
                </span>
              </li>
              <li>
                <span class="name">部门：</span>
                <span class="value">
                  {{ editParams.dept }}
                </span>
              </li>
              <li>
                <span class="name">岗位：</span>
                <span class="value">
                  {{ editParams.positionName }}
                </span>
              </li>
              <li>
                <span class="name">角色类型：</span>
                <span class="value">
                  {{ editParams.roleName }}
                </span>
              </li>
            </ul>
        </div>
        <!-- 2 -->
        <div class="basic-info-form" v-show="isShow === true">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true" label-width="150px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="真实姓名" prop="fullName">
                  <el-input v-model="ruleForm.fullName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="性别" prop="gender">
                  <el-radio-group v-model="ruleForm.gender">
                    <el-radio :label="'1'">男</el-radio>
                    <el-radio :label="'2'">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="启用状态" prop="userStatus">
                  {{ ruleForm.userStatus == 'active' ? '已启用' : '未启用' }}
                  <!-- <el-radio-group v-model="ruleForm.userStatus">
                    <el-radio :label="'active'">已启用</el-radio>
                    <el-radio :label="'inactive'">未启用</el-radio>
                  </el-radio-group> -->
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="部门" prop="dept">
                  <el-input v-model="ruleForm.dept"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="岗位" prop="positionName">
                  <el-input v-model="ruleForm.positionName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="角色类型" prop="roleName">
                  <el-input v-model="ruleForm.roleName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as apiConst from '../../api/ApiConst';
// import * as Utils from '../../../api/Utils';
import * as HTTP from '../../api/httpUtil';

const axios = require('axios');

axios.defaults.withCredentials = true;

export default {
  data() {
    return {
      ruleForm: {
        fullName: '',
        gender: 1,
        phone: ''
      },
      rules: {
        fullName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        gender: [
          // { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          // { required: true, message: '请输入联系电话', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      actionUrl: `${apiConst.apiPersonDomain}/fw/image/update`,
      actionParams: {
        type: 'headWeb',
        premission: false
      },
      editParams: {
        gender: 1
      },
      isShow: false
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // this.$message({
      //   message: '图片上传成功，请点击提交头像按钮更新个人头像',
      //   type: 'success'
      // });
      if (res.code === 200) {
        this.editParams.headPictureResourceCode = res.content.resourceCode;
        this.imageUrl = URL.createObjectURL(file.raw);
        this.editInfo();
      } else {
        this.$message.error(res.content);
      }
    },
    beforeAvatarUpload(file) {
      const isType =
          file.type === 'image/jpeg' ||
          file.type === 'image/gif' ||
          file.type === 'image/png',
        isLt3M = file.size / 1024 / 1024 < 3;
      // console.log(isType, file.type);
      if (!isType) {
        this.$message.error('上传头像图片仅限JPG、GIF、PNG格式!');
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
      }
      return isType && isLt3M;
    },
    editInfo() {
      const url = `${apiConst.apiPersonDomain}/person/self/edit`,
        queryObj = {};
      queryObj.fullName = this.editParams.fullName;
      queryObj.userType = this.editParams.userType;
      queryObj.positionName = this.editParams.positionName;
      queryObj.userTag = '1';
      queryObj.phone = this.editParams.phone;
      queryObj.headPictureResourceCode = this.editParams.headPictureResourceCode;
      // console.log(queryObj);
      HTTP.post(url, queryObj, (res) => {
        if (res.code === 200) {
          this.$message({
            message: '个人头像上传成功',
            type: 'success'
          });
        }
      });
    },
    editBI() {
      this.isShow = true;
    },
    cancelBI() {
      this.isShow = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = `${apiConst.apiPersonDomain}/person/self/edit`,
            storage = window.localStorage;
          HTTP.post(url, this.ruleForm, (res) => {
            if (res.code === 200) {
              this.isShow = false;
              this.editParams.fullName = this.ruleForm.fullName;
              this.editParams.phone = this.ruleForm.phone;
              this.editParams.gender = this.ruleForm.gender;
              this.editParams.userStatus = this.ruleForm.userStatus;
              this.editParams.dept = this.ruleForm.dept;
              this.editParams.positionName = this.ruleForm.positionName;
              this.editParams.roleName = this.ruleForm.roleName;
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              // console.log(window.localStorage);
              const trueName = window.top.document.querySelector('.user-role'),
                userInfo = storage.getItem('userInfo'),
                userInfoObj = JSON.parse(userInfo);
              userInfoObj.userFullName = this.ruleForm.fullName;
              storage.setItem('userInfo', JSON.stringify(userInfoObj));
              if (trueName) {
                trueName.innerHTML = this.ruleForm.fullName;
              }
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    HTTP.get(
      `${apiConst.apiPersonDomain}/person/self/info`,
      {},
      (success, error) => {
        if (success && success.content) {
          Object.keys(success.content).forEach((key) => {
            this.editParams[key] = success.content[key];
          });
          // console.log(this.editParams);
          Object.keys(success.content).forEach((key) => {
            this.ruleForm[key] = success.content[key];
          });
          // console.log(this.ruleForm);
          const url = `${apiConst.apiPersonDomain}/fw/image/${success.content
            .headPictureResourceCode}/get`;
          HTTP.get(url, {}, (s, e) => {
            if (s && s.content.thumbnailList.length !== 0) {
              this.imageUrl = s.content.thumbnailList[0].url;
            }
            if (e) {
              console.error(e);
            }
          });
        }
        if (error) {
          console.error(error);
        }
      }
    );
  }
};
</script>


<style lang="scss" rel="stylesheet/scss">
@import "../assets/sass/base";
@import "./info";
</style>
