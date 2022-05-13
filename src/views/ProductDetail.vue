<template>
  <div v-if="item">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-row>
          <el-col>
            <h2 v-if="item.title">{{ item.title }}</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-card>
              <!-- <el-container> -->
              <el-row>
                <div style="width: 70%;"
                  v-show="item.imageURL && item.imageURL.large"
                >
                  <img :src="item.imageURL.large" alt style="width: 100%;" />
                </div>
                <!-- <el-divider direction="vertical" /> -->
                <div style="width: 30%;">
                  <el-row v-if="item.maker_product">
                    番号：
                    <a :href="item.URL">{{ item.maker_product }}</a>
                  </el-row>
                  <el-row v-if="item.date">
                    日期：
                    <span>{{ date }}</span>
                  </el-row>
                  <el-row v-if="item.volume">
                    长度：
                    <span>{{ item.volume }} 分钟</span>
                  </el-row>
                  <el-row v-if="item.iteminfo && item.iteminfo.director">
                    导演：
                    <span
                      v-for="d in item.iteminfo.director"
                      :key="d.id"
                      class="director"
                    >
                    <router-link :to="{name:'list',query:{article:'director',article_id:d.id}}">
                        {{ d.name }}
                      </router-link>
                    </span>
                  </el-row>
                  <el-row v-if="item.iteminfo && item.iteminfo.maker">
                    制作商：
                    <span
                      v-for="m in item.iteminfo.maker"
                      :key="m.id"
                      class="maker"
                    >
                    <router-link :to="{name:'list',query:{article:'maker',article_id:m.id}}">
                        {{ m.name }}
                      </router-link>
                    </span>
                  </el-row>
                  <el-row v-if="item.iteminfo && item.iteminfo.label">
                    发行商：
                    <span
                      v-for="l in item.iteminfo.label"
                      :key="l.id"
                      class="label"
                    >
                      <router-link :to="{name:'list',query:{article:'label',article_id:l.id}}">
                        {{ l.name }}
                      </router-link>
                    </span>
                  </el-row>
                  <el-row v-if="item.iteminfo && item.iteminfo.series">
                    系列：
                    <span
                      v-for="s in item.iteminfo.series"
                      :key="s.id"
                      class="series"
                    >
                    <router-link :to="{name:'list',query:{article:'series',article_id:s.id}}">
                        {{ s.name }}
                      </router-link>
                    </span>
                  </el-row>
                  <el-row v-if="item.review">
                    评分：
                    <el-rate
                      :model-value="rate"
                      disabled
                      show-score
                      text-color="#ff9900"
                      :score-template="reviewtext"
                    />
                  </el-row>
                  <el-row v-if="item.iteminfo && item.iteminfo.genre">
                    类别：
                    <span
                      v-for="g in item.iteminfo.genre"
                      :key="g.id"
                      class="genre"
                    >
                      <router-link :to="{name:'list',query:{article:'genre',article_id:g.id}}">
                        {{ g.name }}
                      </router-link>
                    </span>
                  </el-row>
                  <el-row v-if="item.iteminfo && item.iteminfo.actress">
                    演员：
                    <span
                      v-for="act in item.iteminfo.actress"
                      :key="act.id"
                      class="actress"
                    >
                      <!-- <router-link :to="`/list/date/actress/${act.id}`"> -->
                        <router-link :to="{name:'list',query:{article:'actress',article_id:act.id}}">
                        {{ act.name }}
                      </router-link>
                    </span>
                  </el-row>
                </div>
              </el-row>
              <!-- </el-container> -->
            </el-card>
          </el-col>
        </el-row>
        <div v-if="sampleImage_s.length > 0">
          <el-row><h2>示例图片</h2></el-row>
          <el-row :gutter="20" class="el-card">
            <el-col
              v-for="(sample, index) in sampleImage_s"
              :key="index"
              :span="4"
            >
              <el-card class="el-card">
                <el-image
                  :src="sample"
                  :preview-src-list="sampleImage_l"
                  :initial-index="index"
                  fit="fill"
                />
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div v-if="sampleVideoURL">
          <el-row><h2>示例视频</h2></el-row>
          <el-row>
            <video controls muted>
              <source :src="sampleVideoURL" type="video/mp4" />
              您的浏览器不支持 video 标签。
            </video>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getItem } from "@/api/ItemList";
import { getSampleVideoURL } from "@/api/SampleVideo";
import { useRoute } from "vue-router";
const route = useRoute();
const item = ref(null);
const sampleVideoURL = ref("");

getItem(route.params.content_id).then((res) => {
  if (res.result.total_count == 0) {
    //404
    return;
  }
  item.value = res.result.items[0];
  getSampleVideoURL(item.value.content_id).then((res) => {
    sampleVideoURL.value = res;
  });
});

let date = computed(() => {
  return item.value.date.slice(0, 10);
});
let rate = computed(() => {
  if (!item.value.review) {
    return 0;
  }
  return Number(item.value.review.average);
});
let reviewtext = computed(() => {
  if (!item.value.review) {
    return null;
  }
  return (
    item.value.review.average +
    " by " +
    String(item.value.review.count) +
    " users"
  );
});
let sampleImage_s = computed(() => {
  if (
    item.value &&
    item.value.sampleImageURL &&
    item.value.sampleImageURL.sample_s
  ) {
    return item.value.sampleImageURL.sample_s.image;
  }
  return [];
});
let sampleImage_l = computed(() => {
  if (
    item.value &&
    item.value.sampleImageURL &&
    item.value.sampleImageURL.sample_l
  ) {
    return item.value.sampleImageURL.sample_l.image;
  } else if (
    item.value &&
    item.value.sampleImageURL &&
    item.value.sampleImageURL.sample_s
  ) {
    var res = [];
    for (let imgurl of item.value.sampleImageURL.sample_s.image) {
      res.push(imgurl.replace("-", "jp-"));
    }
    return res;
  }
  return [];
});
</script>

<style>
span {
  margin-right: 10px;
}
/* el-main {
  padding: 5px;
}
el-aside {
  padding: 5px;
} */
/* .cover {
  display:inline-block;
} */
/* .details {
  max-width: 100px;
  background-color:yellow;
} */
</style>