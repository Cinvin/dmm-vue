<template>
  <el-card class="el-card" @click="toProductDetail(item.content_id)">
        <el-image
          :src="item.imageURL.small"
          lazy
          class="el-image"
        />
        <div style="">
            <span style="overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;">{{item.title}}</span>
            <!-- <br/> -->
            <span v-if="item.date">{{item.date.slice(0,10)}}</span>
            <br/>
            <span v-if="item.maker_product">{{item.maker_product}}</span>
            <span v-else-if="item.content_id">{{item.content_id}}</span>

            <el-tooltip
            v-if="tooltip"
        class="box-item"
        effect="dark"
        :content="tooltip"
        placement="top"
      >
        <el-icon><info-filled /></el-icon>
      </el-tooltip>
        </div>
      </el-card>
</template>

<script>
export default {
    name: 'ItemListBox',
    props:{
        item:{
            type:Object,
            default:()=>{}
        },
    },
    methods: {
      toProductDetail(cid){
            console.log(cid)
            this.$router.push({name:'product_detail',params:{ content_id:cid} })
        },
    },
    computed:{
      tooltip(){
        for(let genreitem of this.item.iteminfo.genre){
          if (genreitem.id==6561){
            //特典付き・セット商品
            return "活动特殊商品"
          }
          else if(genreitem.id==6997 || genreitem.id==6993 || genreitem.id==6992 || genreitem.id==6991){
            //（DOD）
            return "DOD专用商品"
          }
          else if(genreitem.id==6104){
            return "蓝光"
          }
          else if(genreitem.id==6147){
            return "出口商品"
          }
        }
        return null
      }
    }
}
</script>

<style>
.el-card{
  min-width: 100%;
  /* height: 100%; */
  /* margin: 20px; */
  /* margin-right: 5px; */
  margin-bottom: 20px;
}
.el-image{
  min-width: 100%;
}
</style>