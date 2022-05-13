<template>
<div v-loading="items.loading">
  <el-empty v-if="!items.loading && items.arr.length===0" description="No Data" />
  <el-row :gutter="20" class="el-row">
    <template v-for="item in items.arr" :key="item.content_id">
    <el-col
      :span="4"
    >
      <ItemListBox :item="item"/>
    </el-col>
    </template>
  </el-row>
</div>
</template>

<script>
import ItemListBox from "@/components/ItemListBox";
export default {
    name: 'ItemListBoxs',
    props:{
        items:{
            type:Object,
            default:()=>{}
        },
    },
    components:{
      ItemListBox
    }
}
</script>

<style>
.el-row{
  /* margin-bottom: 5px; */
  /* padding: 20px; */
  display: flex;
  flex-flow: row wrap;
}
</style>