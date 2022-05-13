<template>
  <el-collapse>
    <el-collapse-item title="过滤条件" name="1">
      <el-row>
        <el-col :span="12">
        <el-row>
          <span>年龄:</span>
          <el-slider v-model="age_value" range show-stops :max="age_range[1]" :min="age_range[0]" class="filter-item" />
          </el-row>
        </el-col>
        <el-col :span="12">
        <el-row>
          <span>排序:</span>
          <el-select v-model="sortvalue" @change="onSortChange" id="sort-select" class="filter-item">
            <el-option v-for="item in ActressOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
        <el-row>
          <span>胸围:</span>
          <el-slider v-model="bust_value" range show-stops :max="bust_range[1]" :min="bust_range[0]" class="filter-item" />
        </el-row>
        </el-col>
        <el-col :span="12">
        <el-row>
          <span>腰围:</span>
          <el-slider v-model="waist_value" range show-stops :max="waist_range[1]" :min="waist_range[0]" class="filter-item" />
        </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
        <el-row>
          <span>臀围:</span>
          <el-slider v-model="hip_value" range show-stops :max="hip_range[1]" :min="hip_range[0]" class="filter-item" />
        </el-row>
        </el-col>
        <el-col :span="12">
        <el-row>
          <span>身高:</span>
          <el-slider v-model="height_value" range show-stops :max="height_range[1]" :min="height_range[0]" class="filter-item" />
        </el-row>
        </el-col>
      </el-row>
      <el-row justify="end">
        <el-button type="primary" @click="onApply">应用</el-button>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name: "ActressFilterInfo",
  props: {
    filter_info: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      sortvalue: "-name",
      age_range:[18,70],
      age_value: "",
      bust_range:[70,160],
      bust_value: "",
      waist_range:[50,100],
      waist_value: "",
      hip_range:[70,150],
      hip_value: "",
      height_range:[130,190],
      height_value: "",
      ActressOptions: [
        { value: "name", label: "名字升序" },
        { value: "-name", label: "名字降序" },
        { value: "bust", label: "胸围升序" },
        { value: "-bust", label: "胸围降序" },
        { value: "waist", label: "腰围升序" },
        { value: "-waist", label: "腰围降序" },
        { value: "hip", label: "臀围升序" },
        { value: "-hip", label: "臀围降序" },
        { value: "height", label: "身高升序" },
        { value: "-height", label: "身高降序" },
        { value: "birthday", label: "生日升序" },
        { value: "-birthday", label: "生日降序" },
        { value: "id", label: "ID升序" },
        { value: "-id", label: "ID降序" },
      ],
    };
  },
  methods: {
    onApply(){
        let params={page:1}
        if(this.sortvalue)(
          params.sort=this.sortvalue
        )
        if (this.age_value[0]!==this.age_range[0]){
            params.lte_birthday=dayjs().subtract(this.age_value[0], 'year').format('YYYY-MM-DD')
        }
        if (this.age_value[1]!==this.age_range[1]){
            params.gte_birthday=dayjs().subtract(this.age_value[1], 'year').format('YYYY-MM-DD')
        }
        if (this.bust_value[0]!==this.bust_range[0]){
            params.gte_bust=this.bust_value[0]
        }
        if (this.bust_value[1]!==this.bust_range[1]){
            params.lte_bust=this.bust_value[1]
        }
        if (this.waist_value[0]!==this.waist_range[0]){
            params.gte_waist=this.waist_value[0]
        }
        if (this.waist_value[1]!==this.waist_range[1]){
            params.lte_waist=this.waist_value[1]
        }
        if (this.hip_value[0]!==this.hip_range[0]){
            params.gte_hip=this.hip_value[0]
        }
        if (this.hip_value[1]!==this.hip_range[1]){
            params.lte_hip=this.hip_value[1]
        }
        if (this.height_value[0]!==this.height_range[0]){
            params.gte_height=this.height_value[0]
        }
        if (this.height_value[1]!==this.height_range[1]){
            params.lte_height=this.height_value[1]
        }
        this.$router.push({
        name: this.$route.name,
        query: params,
      });
    },
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler(new_value) {
        this.sortvalue = new_value.sort || "-name";
        if(new_value.gte_birthday || new_value.lte_birthday){
          let lte_age=this.age_range[0]
          let gte_age=this.age_range[1]
          if (new_value.gte_birthday){
            gte_age=dayjs().diff(new_value.gte_birthday, 'year')
          }
          if (new_value.lte_birthday){
            lte_age=dayjs().diff(new_value.lte_birthday, 'year')
          }
          this.age_value=[lte_age,gte_age]
        }
        if(new_value.gte_bust|| new_value.lte_bust){
          this.bust_value=[new_value.gte_bust||this.bust_range[0],new_value.lte_bust||this.bust_range[1]]
        }
        if(new_value.gte_waist|| new_value.lte_waist){
          this.waist_value=[new_value.gte_waist||this.waist_range[0],new_value.lte_waist||this.waist_range[1]]
        }
        if(new_value.gte_hip|| new_value.lte_hip){
          this.hip_value=[new_value.gte_hip||this.hip_range[0],new_value.lte_hip||this.hip_range[1]]
        }
        if(new_value.gte_height|| new_value.lte_height){
          this.height_value=[new_value.gte_height||this.height_range[0],new_value.lte_height||this.height_range[1]]
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
.filter-item{
  max-width : 90%;
  margin-left: 10px;
}
</style>