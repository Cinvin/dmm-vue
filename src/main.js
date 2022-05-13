import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Search, InfoFilled, StarFilled, Star } from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.component(Search.name, Search)
    .component(InfoFilled.name,InfoFilled)
    .component(StarFilled.name, StarFilled)
    .component(Star.name, Star)
app.mount('#app')