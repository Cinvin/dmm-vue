<template>
  <el-menu
    :default-active="activeIndex"
    class="context-menu"
    mode="horizontal"
    router
  >
    <img src="/img/fanza_r18.svg" />
    <el-menu-item index="/list" router>列表</el-menu-item>
    <el-menu-item index="/actress" router>女优</el-menu-item>
    
    <el-menu-item :index="route.path" v-if="defaultDescription != ''">{{defaultDescription}}</el-menu-item>
    <el-input
              type="text"
              :prefix-icon="Search"
              v-model="keywordinput"
              placeholder="请输入"
              style="width: 270px; cursor: pointer"
              @keyup.enter="search"
            ></el-input>
  </el-menu>
</template>

<script setup>
import { ref,computed,watch } from "vue";
import { useRoute,useRouter } from "vue-router";
import { Search } from '@element-plus/icons-vue'
const route = useRoute();
const router = useRouter();
  // let activeIndex = ref("/list/date/1");
  // let defaultDescription = ref("");
  let keywordinput = ref("");
  if (route.name == "search"){
      keywordinput.value=route.params.keyword
  }
function search(val){
  // /search/:keyword/:searchtype/
  console.log(val)
  router.push({ 
              path:`/search/list/${keywordinput.value}/1`,
      })
}

watch(
  () => route.name,
  () => {
    if (route.name == "search"){
      keywordinput.value=route.params.keyword
    }
    else{
      keywordinput.value=""
    }
  },
  {immediate: true}
);
// let keywordinput = computed(() => {
//   if (route.name != "search"){
//       return ""
//   }
//   return route.params.keyword
// });
let defaultDescription = computed(() => {
  if (route.name == "search"){
      return "搜索"
  }
  else if (route.name == "product_detail") {
      return "详情"
  }
  return ""
});
let activeIndex = computed(() => {
  if (route.name == "list"){
      return "/list"
  }
  else if (route.name == "actress") {
      return "/actress"
  }
  return route.path
});
</script>

<style>
</style>