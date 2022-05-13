<template>
  <ActressFilterInfo :filter_info="filter_info" />
  <ActressListBoxs :actresses="actresses" />
  <ListPagination :page_info="page_info"/>
</template>

<script setup>
import { getActressItem } from "@/api/ActressSearch";
import ActressFilterInfo from "@/components/ActressFilterInfo";
import ActressListBoxs from "@/components/ActressListBoxs";
import ListPagination from "@/components/ListPagination";
import { reactive, watch } from "vue";
import { useRoute } from 'vue-router'
const route=useRoute()
let actresses = reactive({
  arr:[],
  // loading:false,
});
let page_info = reactive({
  total_count:0,
  result_count:0,
  first_position:1,
  hits:40,
  page_count:0,
  page_index:Number(route.query.page) || 1,
});

let filter_info = reactive({
  filter_desc: "",
  filter_sort: "name",
  filter_date:"",
  show_filter:true
});


function fetchData(){
  page_info.page_index = Number(route.query.page) || 1;
  let offset=1+page_info.hits*(page_info.page_index-1)
  console.log('actresslist fetchData')
  let params=Object.assign({},route.query)
  params.hits=page_info.hits
  params.offset=offset
  getActressItem(params).then(
  (res) => {
    console.log(res.result.actress)
    actresses.arr=res.result.actress
    page_info.result_count = res.result.result_count;
    page_info.total_count = res.result.total_count;
    page_info.first_position = res.result.first_position;
    page_info.page_count = Math.ceil(page_info.total_count / page_info.hits);
  }
);
}
fetchData()

watch(
      () => route.query,
      ()=>{
        console.log('watch route.params');
        fetchData()
      }
    )


</script>

<style>
</style>