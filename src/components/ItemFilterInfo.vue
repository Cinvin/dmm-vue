<template>
  <el-row justify="space-between" class="fliter-area">
    <div>{{ filter_info.filter_desc }}</div>
    <div class="fliter-right-area" v-show="filter_info.show_filter">
      日期:
      <el-date-picker v-model="datevalue" @change="onDateChange" type="daterange" unlink-panels range-separator="~"
        start-placeholder="开始" end-placeholder="结束" value-format="YYYY-MM-DD" :shortcuts="shortcuts" />
      排序:
      <el-select v-model="sortvalue" @change="onSortChange" id="sort-select">
        <el-option v-for="item in ItemOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "ItemFilterInfo",
  props: {
    filter_info: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      sortvalue: "rank",
      datevalue: "",
      shortcuts: [
        {
          text: "过去1周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 1);
            return [start, end];
          },
        },
        {
          text: "过去1月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 1);
            return [start, end];
          },
        },
        {
          text: "过去3月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 3);
            return [start, end];
          },
        },
        {
          text: "过去6月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 6);
            return [start, end];
          },
        },
        {
          text: "过去1年",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 12);
            return [start, end];
          },
        },
        {
          text: "今月",
          value: [new Date(), new Date()],
        },
        {
          text: "今年",
          value: () => {
            const end = new Date();
            const start = new Date(new Date().getFullYear(), 0);
            return [start, end];
          },
        },
      ],
      ItemOptions: [
        { value: "rank", label: "人气" },
        { value: "date", label: "新发布" },
        { value: "review", label: "评价" },
        { value: "match", label: "匹配" },
        { value: "price", label: "价格降序" },
        { value: "-price", label: "价格升序" },
      ],
    };
  },
  methods: {
    onSortChange(val) {
      let params = Object.assign({}, this.$route.query);
      params.sort=val
      console.log(params)
      this.$router.push({
        name: this.$route.name,
        query: params,
      });
    },
    onDateChange(val) {
      console.log("onDateChange", val);
      if (val) {
        let gte_date = val[0];
        let lte_date = val[1];
        let params = Object.assign({},this.$route.query);
        params.gte_date=gte_date
        params.lte_date=lte_date
        console.log("onDateChange", params);
        params.page = 1
        this.$router.push({
          name: 'list',
          query: params,
        });
      }
      else {
        let params = Object.assign(
          {},
          this.$route.query
        );
        params.page = 1
        if (params.gte_date) {
          delete params.gte_date;
        }
        if (params.lte_date) {
          delete params.lte_date;
        }
        this.$router.push({
          name: 'list',
          query: params,
        });
      }
    },
  },
  watch: {
    "$route.query": {
       immediate: true, 
       handler(new_value) {
           this.sortvalue=new_value.sort||'rank'
           if (new_value.gte_date){
            this.datevalue=[new_value.gte_date,new_value.lte_date]
           }
           else{
              this.datevalue=''
           }
       },
   },
  },
  // created(){
  //     this.sortvalue=this.$route.params.sort || 'date'

  // }
};
</script>

<style>
/* .right_div{
  position:absolute;
  right:0
} */
.fliter-area {
  margin-bottom: 10px;
}

#sort-select {
  width: auto;
  height: auto;
}
</style>