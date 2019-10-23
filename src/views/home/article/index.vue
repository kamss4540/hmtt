<template>
  <el-scrollbar :native="false" wrapStyle wrapClass viewClass viewStyle :noresize="false">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <span>文章状态:</span>
      <!-- 单选框 -->
      <el-radio-group v-model="status">
        <el-radio label>全部</el-radio>
        <el-radio :label="0">草稿</el-radio>
        <el-radio :label="1">待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="3">审核失败</el-radio>
      </el-radio-group>

      <br />
      <span>频道列表:</span>
      <!-- 选择器 -->
      <el-select v-model="id" placeholder="请选择">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>

      <!-- 日期 -->
      <div class="block">
        <span class="demonstration">时间选择:</span>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>

      <el-button @click="search" type="primary">筛选</el-button>
    </el-card>

    <!-- 搜索结果 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{num}}条符合条件的内容</span>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="cover" label="封面" width="180">
          <template slot-scope="scope">
            <!-- <span style="margin-left: 10px">{{ scope.row }}</span> -->
            <img :src="scope.row.cover.images" alt="" width="100px" height="100px">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <el-button type="success">修改</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </el-scrollbar>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      //  单选框
      status: "",

      //选择器
      options: [{ id: "选项1", name: "黄金糕" }],
      id: "",

      //日期
      value1: "",

      //搜索结果
      num: "",
      tableData: [
        {
          cover: "",
          title: "",
          status: "",
          pubdate: ""
        }
      ]
    };
  },
  methods: {
    search() {
      let params = {
        status: this.status == "" ? undefined : this.status,
        channel_id: this.id == "" ? undefined : this.id,
        begin_pubdate: this.value1[0],
        end_pubdate: this.value1[1],
        page: 1,
        per_page: 10
      };

      let obj = JSON.parse(window.localStorage.getItem("token"));

      this.$axios
        .get("/mp/v1_0/articles", {
          headers: {
            Authorization: "Bearer " + obj.token
          },
          params
        })
        .then(res => {
          window.console.log(res);
          let results = res.data.data;
          this.num = results.total_count;
          this.tableData = results.results;
        });
    }
  },
  created() {
    this.$axios.get("/mp/v1_0/channels").then(res => {
      this.options = res.data.data.channels;
    });
    this.search();
  }
};
</script>

<style lang="less">
.el-scrollbar {
  height: 100%;

  .el-scrollbar__wrap {
    overflow-x: hidden;

    .box-card {
      width: 99.8%;

      .el-radio-group {
        margin-left: 10px;
      }

      .el-select {
        margin: 20px 10px;
      }

      .block {
        .demonstration {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>