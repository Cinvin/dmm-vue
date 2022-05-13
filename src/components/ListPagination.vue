<template>
  <el-row v-show="page_info.total_count > 0 && page_info.page_count > 1">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="page_info.page_count"
      :current-page="page_info.page_index"
      @current-change="handleCurrentChange"
      class="el-pagination"
    />
  </el-row>
</template>

<script>
export default {
  name: "ListPagination",
  props: {
    page_info: {
      type: Object,
      default: ()=>{},
    },
  },
  methods: {
    handleCurrentChange(val) {
      let params = Object.assign({}, this.$route.query,)
      params.page=Number(val)
      this.$router.push({
        name: this.$route.name,
        query: params,
      });
    },
  },
};
</script>

<style>
.el-pagination {
  margin: 0 auto;
  text-align: center;
}
</style>