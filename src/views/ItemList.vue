<template>
  <ActressDetail :actress="actress.obj" />
  <ItemFilterInfo :filter_info="filter_info" />
  <ItemListBoxs :items="items" />
  <ListPagination :page_info="page_info" />
</template>

<script setup>
import ItemFilterInfo from "@/components/ItemFilterInfo";
import ActressDetail from "@/components/ActressDetail";
import ItemListBoxs from "@/components/ItemListBoxs";
import ListPagination from "@/components/ListPagination";
import { getItemList } from "@/api/ItemList";
import { getActressItem } from "@/api/ActressSearch";
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
let items = reactive({
  arr: [],
  loading: false,
});
let page_info = reactive({
  total_count: 0,
  result_count: 0,
  first_position: 1,
  hits: 30,
  page_count: 0,
  page_index: Number(route.params.page) || 1,
});
let filter_info = reactive({
  filter_desc: "",
  show_filter:true
});

let article = "";
let article_id = "";

let actress = reactive({
  obj: { id: 0 },
});

function fetchData() {
  page_info.page_index = Number(route.query.page) || 1;
  let gte_date=''
  let lte_date=''
  if (route.query.gte_date){
    page_info.filter_date=[route.query.gte_date,route.query.lte_date]
    gte_date=route.query.gte_date+'T00:00:00'
    lte_date=route.query.lte_date+'T23:59:59'
    filter_info.filter_date=[route.query.gte_date,route.query.lte_date]
  }
  else{
    filter_info.filter_date=''
  }
  article = route.query.article || "";
  article_id = route.query.article_id || "";
  let offset = 1 + page_info.hits * (page_info.page_index - 1);

  console.log("itemlist fetchData");
  items.loading = true;
  let params={sort:route.query.sort,hits:page_info.hits,offset:offset,
  article,article_id,
  gte_date,lte_date}
  getItemList(params).then(
    (res) => {
      items.loading = false;
      items.arr = res.result.items;
      page_info.result_count = res.result.result_count;
      page_info.total_count = res.result.total_count;
      page_info.first_position = res.result.first_position;
      page_info.page_count = Math.ceil(page_info.total_count / page_info.hits);

      filter_info.filter_desc = ''
      if (items.arr.length > 0) {
        filter_info.filter_desc = `第${page_info.first_position}-${Math.min(
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
        //   filter_info.filter_desc += " 移除了部分无番号内容";
        // }
      }

      if (article == "actress") {
        if (actress.obj.id == 0 || actress.obj.id != article_id) {
          console.log("start getActressItem", article_id);
          let params={actress_id:article_id}
          getActressItem(params).then((res) => {
            console.log("getActressItem result", res);
            if (res.result.actress.length > 0) {
              actress.obj = res.result.actress[0];
              console.log("getActressItem result", res.result.actress[0]);
            }
          });
        }
      } else if (actress.obj.id > 0) {
        actress.obj = { id: 0 };
      }
    },
    (err) => {
      console.log(`err1:${err}`);
      items.loading = false;
    }
  );
}
fetchData();

watch(
  () => route.query,
  () => {
    console.log('watch route.query', route.query);
    fetchData();
  }
);
</script>

<style>
</style>