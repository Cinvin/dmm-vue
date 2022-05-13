<template>
<div class="actboxs">
  <el-row :gutter="20" class="el-card">
    <el-col
      v-for="actress in actresses.arr" 
      :key="actress.id"
      :span="3"
    >
      <el-card @click="toItemList(actress.id)" class="el-card">
        <el-image 
          v-if="actress.imageURL"
          :src="actress.imageURL.large"
          lazy
        />
        <img v-else src="/img/act-no-image.gif">
        <div style="padding: 14px width: auto">
            <span>{{actress.name}}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
    name: 'ActressListBoxs',
    props:{
        actresses:{
            type:Object,
            default:()=>{}
        },
    },
    methods: {
      toItemList(actress_id){
            this.$router.push({ 
              name:'list',
              query:{article:'actress',article_id:actress_id}
      })
        },
    },
}
</script>

<style>
.el-row{
  /* margin-bottom: 5px; */
  /* padding: 20px; */
  display: flex;
  flex-flow: row wrap;
}
.el-card{
  min-width: 100%;
  /* height: 100%; */
  /* margin: 20px; */
  /* margin-right: 5px; */
  margin-bottom: 20px;
}
</style>