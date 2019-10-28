<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>帐号信息</span>
    </div>
    <div class="content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="媒体名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="媒体简介">
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="头条号ID">
          <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定手机">
          <el-input v-model="form.mobile" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存更新</el-button>
        </el-form-item>
      </el-form>

      <!-- 上传头像 -->
      <div class="right">
        <el-upload
          :http-request="upload"
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </el-card>
</template> 

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        intro: "",
        id: "",
        mobile: "",
        email: ""
      },
      imageUrl: ""
    };
  },
  methods: {
    upload(e) {
      let fd = new FormData();
      fd.append("photo", e.file);
      this.$axios.patch("/mp/v1_0/user/photo",fd).then(res=>{
        window.console.log(res);
        
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang='less'>
.el-card {
  .content {
    display: flex;
    justify-content: space-between;

    .right {
      width: 50%;
      display: flex;
      justify-content: center;
    }
  }
}

.avatar-uploader .el-upload {
  // display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>