<template>
  <el-select @change="$emit('change',$event)" :value="channel_id" placeholder="请选择">
    <el-option v-for="(item,index) in channels" :key="index" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ["channel_id"],
  model: {
    prop: "channel_id",
    event: "change"
  },
  data() {
    return {
      channels: []
    };
  },
  created() {
    this.$axios
      .get("/mp/v1_0/channels")
      .then(res => (this.channels = res.data.data.channels));
  }
};
</script>

<style>
</style>