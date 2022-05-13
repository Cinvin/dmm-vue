import { createRouter, createWebHistory } from 'vue-router'
import ItemList from '@/views/ItemList'
import ActressList from '@/views/ActressList'
import ProductDetail from '@/views/ProductDetail'
import SearchResult from '@/views/SearchResult'

const routes = [
    // floor,keyword, sort, page, article, article_id
    //https://www.dmm.co.jp/digital/videoa/-/actress/=/keyword={keyword}/page=pageindex/
    //https://www.dmm.co.jp/digital/videoa/-/list/=/article=actress/id=1076461/
    //https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=bacj00001/
    {   path: '/', 
        redirect: "/list"
    },
    { 
        //http://localhost:8080/digital/videoa/list/
        name: 'list',
        path: '/list', 
        component: ItemList,
        // children:[
        //     {name:'baselist', path: ':sort/:page?', component: ItemList},
        //     {name:'daterange_baselist', path: ':sort/daterange/:date_start/:date_end/:page?', component: ItemList},
        //     {name:'articlelist', path: ':sort/:article/:article_id/:page?', component: ItemList},
        //     {name:'daterange_articlelist', path: ':sort/:article/:article_id/daterange/:date_start/:date_end/:page?', component: ItemList},
        // ]
    },
    { 
        name: 'actress',
        path: '/actress/:page?', 
        component: ActressList,
    },
    {
        name: 'product_detail',
        path: '/product_detail/:content_id/',
        component: ProductDetail,
    },
    {
        name: 'search',
        path: '/search/:searchtype/:keyword/:page?',
        component: SearchResult,
    },
  ]

  const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
  })
  
export default router;