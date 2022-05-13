<template>
  <el-tabs
    v-model="searchtype"
    type="card"
    class="demo-tabs"
    @tab-change="handleChange"
  >
    <el-tab-pane label="列表" name="list">
      <ItemFilterInfo  v-if="searchtype=='list'" :filter_info="item_filter_info" />
      <ItemListBoxs v-if="searchtype=='list'" :items="items" />
      <ListPagination v-if="searchtype=='list'" :page_info="page_info" />
    </el-tab-pane>
    <el-tab-pane label="女优" name="actress">
      <ActressListBoxs v-if="searchtype=='actress'" :actresses="actresses" />
      <ListPagination v-if="searchtype=='actress'" :page_info="page_info" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref,reactive,watch } from "vue";
import { useRoute } from "vue-router";
import ActressListBoxs from "@/components/ActressListBoxs";
import ItemListBoxs from "@/components/ItemListBoxs";
import ItemFilterInfo from "@/components/ItemFilterInfo";
import ListPagination from "@/components/ListPagination";
import { getItemList } from "@/api/ItemList";
import { getActressItem } from "@/api/ActressSearch";
import router from "@/router";
const route = useRoute();
let items = reactive({
  arr: [],
  loading: false,
});
let actresses = reactive({
  arr:[]
});
let item_filter_info = reactive({
  filter_desc: "",
  show_filter:false
});
let searchtype = ref(route.params.searchtype);
let page_info = reactive({
  total_count: 0,
  result_count: 0,
  first_position: 1,
  hits: 30,
  page_count: 0,
  page_index: Number(route.params.page) || 1,
});

function fetchData() {
  let keyword = route.params.keyword;
  page_info.page_index = Number(route.query.page) || 1;
  let offset = 1 + page_info.hits * (page_info.page_index - 1);
  console.log('fetchData',route.params.searchtype)
  if (route.params.searchtype == "list") {
    items.loading=true
    let params={sort:'match', hits:page_info.hits,offset,keyword,}
    getItemList(params).then((res) => {
      items.arr = res.result.items;
      items.loading=false
      console.log('getItemList',items.arr)
      page_info.result_count = res.result.result_count;
      page_info.total_count = res.result.total_count;
      page_info.first_position = res.result.first_position;
      page_info.page_count = Math.ceil(page_info.total_count / page_info.hits);

      item_filter_info.filter_desc = ''
      if (items.arr.length > 0) {
        item_filter_info.filter_desc = `第${page_info.first_position}-${Math.min(
          page_info.first_position + items.arr.length - 1,
          page_info.total_count
        )}条结果 共${page_info.total_count}条结果`;
        // let deleteflag = false;
        // for (let i = items.arr.length - 1; i >= 0; i--) {
        //   if (!items.arr[i].jancode || !items.arr[i].maker_product) {
        //     items.arr.splice(i, 1);
        //     deleteflag = true;
        //   }
        // }
        // if (deleteflag) {
        //   item_filter_info.filter_desc += " 移除了部分无番号内容";
        // }
      }
    },
    (err) => {
      console.log(`err1:${err}`);
      items.loading = false;
    });
  } else if (route.params.searchtype == "actress") {
    let params={hits:page_info.hits,offset,keyword}
    getActressItem(params).then((res) => {
      console.log('getActressItem',res.result.actress)
      actresses.arr = res.result.actress;
      page_info.result_count = res.result.result_count;
      page_info.total_count = res.result.total_count;
      page_info.first_position = res.result.first_position;
      page_info.page_count = Math.ceil(page_info.total_count / page_info.hits);
    });
  }
}

function handleChange(val){
  router.push(`/search/${val}/${route.params.keyword}/1`)
}

fetchData()

watch(
  () => route.params,
  () => {
    fetchData();
  }
);

</script>

<style>
</style>