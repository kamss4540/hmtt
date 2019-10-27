<template>
  <!-- <el-scrollbar :native="false" wrapStyle wrapClass viewClass viewStyle :noresize="false"> -->
  <el-form :rules="rules" ref="form" :model="form" label-width="80px">
    <el-form-item prop="title" label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item prop="content" label="内容">
      <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>
    <el-form-item label="封面">
      <h3>这里是封面</h3>
    </el-form-item>

    <el-form-item label="频道">
      <channel v-model="form.channel_id"></channel>
    </el-form-item>

    <el-form-item>
      <el-button @click="edit('form')" type="primary">发表</el-button>
      <el-button>保存草稿</el-button>
    </el-form-item>
  </el-form>
  <!-- </el-scrollbar> -->
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

import channel from "../components/channel.vue";

export default {
  name: "publish",
  components: {
    quillEditor,
    channel
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        channel_id: "",
        cover: { type: 0, images: [] }
      },
      rules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          { min: 5, max: 30, message: "标题长度在5-30之间", trigger: "change" }
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    edit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = JSON.parse(window.localStorage.getItem("token"));
          // let i = 0;
          // let timerId = window.setInterval(() => {
            this.$axios
              .post("/mp/v1_0/articles", this.form, {
                headers: {
                  Authorization: `Bearer ${obj.token}`
                }
              })
              .then(() => {
                this.$message.success("文章发表成功!");
                this.$router.push("/article");
              })
            // i++;
            // if (i == 2000) {
              // clearInterval(timerId);
            // }
          // }, 5);
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    const id = this.$route.params.id;
    window.console.log(id);
  }
};
</script>

<style lang="less">
.ql-editor {
  height: 200px;
}
</style>