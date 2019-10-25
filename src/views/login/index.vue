<template>
  <div class="bg">
    <div class="box">
      <div class="logo">
        <img src="./images/login_logo.png" alt />
      </div>
      <el-form
        ref="loginForm"
        :rules="rules"
        class="login"
        :label-position="labelPosition"
        :model="formLabelAlign"
      >
        <el-form-item prop="mobile">
          <el-input v-model="formLabelAlign.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-row :gutter="15">
          <el-col :span="15">
            <el-form-item prop="code">
              <el-input v-model="formLabelAlign.code" placeholder="验证码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button :disabled="isDisabled" @click="postCode">{{msg}}</el-button>
          </el-col>
        </el-row>

        <el-form-item prop="agree">
          <el-checkbox v-model="formLabelAlign.agree">
            <span>
              我已阅读并同意
              <a href="javascript:void(0)">用户协议</a>和
              <a href="javascript:void(0)">隐私条款</a>
            </span>
          </el-checkbox>
        </el-form-item>

        <el-button @click="doLogin('loginForm')" class="btn" type="primary" :loading="isLoading">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        mobile: "18801185985",
        code: "246810",
        agree: true
      },
      msg: "发送验证码",
      isDisabled: false,
      isLoading: false,
      rules: {
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: "0?(13|14|15|18|17)[0-9]{9}",
            message: "请输入正确的手机",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len: 6, message: "请输入6位验证码" }
        ],
        agree: [
          { pattern: /true/, message: "同意协议方可登录", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    doLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoading = true;

          this.$axios
            .post("mp/v1_0/authorizations", this.formLabelAlign)
            .then(res => {
              // window.console.log(res);
              if (res.status == 201) {
                window.localStorage.setItem(
                  "token",
                  JSON.stringify(res.data.data)
                );

                this.$message({
                  showClose: true,
                  message: "登录成功,跳转到首页",
                  type: "success"
                });

                this.isLoading = false;
                this.$router.push("/home");
              }
            })
            .catch(() => {
              this.$message({
                showClose: true,
                message: "手机号或验证码错误",
                type: "error"
              });

              this.isLoading = false;
            });
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    postCode() {
      this.isDisabled = true;
      let sec = 60;
      this.msg = `${sec}秒后可用`;
      let timerId = setInterval(() => {
        sec--;
        this.msg = `${sec}秒后可用`;

        if (sec == 0) {
          clearInterval(timerId);
          this.msg = "发送验证码";
          this.isDisabled = false;
        }
      }, 1000);
    }
    // doLogin() {
    //   this.$axios
    //     .post("mp/v1_0/authorizations", this.formLabelAlign)
    //     .then(res => {
    //       window.console.log(res);
    //       if (res.status == 201) {
    //         alert(res.data.message);
    //       }
    //     })
    // }
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
    width: 320px;
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
      }
    }
  }
}
</style>