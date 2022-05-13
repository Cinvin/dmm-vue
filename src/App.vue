<template>
  <div>
    <ContextMenu></ContextMenu>
    <el-main><router-view></router-view></el-main>
    
  </div>
  <!-- <ItemList/> -->
</template>

<script>
import ContextMenu from '@/components/ContextMenu.vue'
export default {
  name: 'App',
  components: {
    ContextMenu
  }
}
</script>

<style>

</style>
