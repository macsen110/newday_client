<template>
<div class="showdialog uc-uinfoverify uc-updatepwd hide" id="dialog">
    <div class="sd-hd">
        <h2 class="sdtit">修改密码</h2>
        <span class="close" title="点击关闭窗口" id="closePwdWinId" @click="closeWin()">关闭</span>
    </div>
    <div class="sd-bd">
      <form id="update-pwd-form" method="post" novalidate="novalidate">
	    <div class="tabverify">
	        <table class="dialog-table">
	            <tbody><tr>
	                <th>原密码：<i>*</i></th>
	                <td>
	                    <input class="el-input__inner" value="" v-model="oldPassword" name="oldPassword" type="password" autocomplete="off">
	                </td>
	            </tr>
	            <tr>
	                <th>新密码：<i>*</i></th>
	                <td>
	                    <input class="el-input__inner" value="" v-model="newPassword" name="newPassword" type="password">
	                </td>
	            </tr>
	            <tr>
	                <th>确认密码：<i>*</i></th>
	                <td>
	                    <input class="el-input__inner" value="" v-model="confirmPwd" name="confirmPwd" type="password">
	                </td>
	            </tr>
	        </tbody></table>
	    </div>
	    <p class="fmbtm">
        <el-button @click="closeWin()" id="cancel_update_phone">取消</el-button>
        <el-button type="primary" @click="updatePassword" :disabled="passIsDisabled">确认</el-button>
	    </p>
	  </form>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import * as HTTP from '../../api/httpUtil';
import apiDomain from '../../api/ApiConst';
import { addClass } from '../../api/classUtil';

export default{
  name: 'partnerList',
  data: () => {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPwd: '',
      passIsDisabled: false
    };
  },
  methods: {
    closeWin() {
      const masklayer = document.getElementById('maskLayer'),
        dialog = document.getElementById('dialog');
      addClass(masklayer, 'hide');
      addClass(dialog, 'hide');
      this.passIsDisabled = false;
      this.clear();
    },
    updatePassword() {
      if (!this.oldPassword) {
        this.$message.error('请输入原密码');
        return false;
      }
      if (!this.newPassword) {
        this.$message.error('请输入新密码');
        return false;
      }
      if (!this.confirmPwd) {
        this.$message.error('请输入确认密码');
        return false;
      }
      if (this.newPassword !== this.confirmPwd) {
        this.$message.error('两次输入密码不一致');
        return false;
      }
      if (this.oldPassword && this.newPassword && this.confirmPwd === this.newPassword) {
        this.passIsDisabled = true;
        const obj = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        };
        HTTP.post(`${apiDomain.apiAccountDomain}/account/modify_password`, obj, (response, error) => {
          if (response) {
            if (response.code === 200) {
              this.closeWin();
              this.$message({
                message: '密码修改成功',
                type: 'success'
              });
              this.passIsDisabled = false;
            } else {
              this.passIsDisabled = false;
            }
          }
          if (error) {
            this.$message.error(error.content);
            setTimeout(() => {
              this.passIsDisabled = false;
            }, 3000);
          }
        });
      }
    },
    clear() {
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPwd = '';
    }
  }
};
</script>
