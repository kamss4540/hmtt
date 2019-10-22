<template>
  <div class="bg">
    <div class="box">
      <div class="logo">
        <img src="./images/login_logo.png" alt />
      </div>
      <el-form :rules="rules" class="login" :label-position="labelPosition" :model="formLabelAlign">
        <el-form-item prop="mobile">
          <el-input v-model="formLabelAlign.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-row :gutter="15">
          <el-col :span="15">
            <el-form-item>
              <el-input v-model="formLabelAlign.code" placeholder="验证码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button>发送验证码</el-button>
          </el-col>
        </el-row>

        <el-checkbox v-model="checked">
          我已阅读并同意
          <a href="javascript:void(0)">用户协议</a>和
          <a href="javascript:void(0)">隐私条款</a>
        </el-checkbox>

        <el-button @click="doLogin" class="btn" type="primary" :loading="isLoading">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        mobile: "",
        code: ""
      },
      isLoading: false,
      checked: false,
      rules: {
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: "0?(13|14|15|18|17)[0-9]{9}",
            message: "请输入正确的手机",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    doLogin() {
      this.$axios
        .post("mp/v1_0/authorizations", this.formLabelAlign)
        .then(res => {
          window.console.log(res);
          if (res.status == 201) {
            alert(res.data.message);
          }
        });
    }
  }
};
</script>

<style lang="less">
.bg {
  height: 100%;
  background: url("./images/login_bg.jpg") no-repeat center/cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    background-color: #fff;
    width: 400px;
    padding: 40px;

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;

      img {
        width: 150px;
      }
    }

    .login {
      a {
        color: #3296fa;
      }

      .btn {
        width: 100%;
        margin-top: 30px;
      }
    }
  }
}
</style>