import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
// import Vuex from 'vuex'


/*import infiniteScroll from 'vue-infinite-scroll';*/
import axios from 'axios'
import VueAxios from 'vue-axios';
import VueLazyload from 'vue-lazyload';
import Mint from 'mint-ui';

/**
  * 单独引用 暂先全部引用，后期修改
  * import { Button, Cell } from 'mint-ui'
  * Vue.use(Button)  全局使用，也可以以组件使用
  * Vue.use(Cell)
  */

import routes from './router/router.js';
import App from './App'
import store from './store/store.js' 
import filters from './filters'


import 'assets/css/common.css';

// 怎么把styl文件引入到main.js中
// import './assets/css/common.styl';  

Vue.config.debug = true  //开启debug模式
window.log = console.log
window.routeList = [];

// Vue.use(VueResource)
Vue.use(VueAxios, axios)
// Vue.axios.defaults.headers.common['Token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI1MCIsInByaW1hcnlzaWQiOiIzNCIsIm5hbWVpZCI6Imh1eWFvZG9uZyIsInVuaXF1ZV9uYW1lIjoiaHV5YW9kb25nIiwiaXNzIjoiUHJvbGxpYW5jZS5jbiIsImF1ZCI6Imh0dHA6Ly9wcm9sbGlhbmNlLmNuIiwiZXhwIjoxNDg4NzY5MjUwLCJuYmYiOjE0ODg2ODI4NTB9.Kv9Yv2Zf4gjefB0dKH7tr5Ebzvxeaiob3LRBX6tk4bw'

Vue.use(VueRouter)
Vue.use(Mint);

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/images/zhongliang.jpg'),
    loading: require('./assets/images/lazy.gif'),
    attempt: 1
})

const router = new VueRouter({
    routes,
    linkActiveClass: 'custom-active',  
    mode : 'history',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
})

// 实例化filters 
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));


router.beforeEach((to , from, next) => {
    // 这里写用户权限验证  控制前进后退的切换
    
    if( routeList.length > 1 && to.path == routeList[routeList.length-2]['path']){        
        router.app.trans = 'prev';//后退
        routeList.splice(routeList.length-1,1);//数组减一个
        setTimeout(function(){
            //这里加上延迟是要在afterEach之后在执行
            next()
        },150);
    }else{
        router.app.trans='next';//前进
        routeList.push({
            path : to.path,
            timer : + new Date()
        });        
        next()
    }
})
// router.afterEach(function(transition){
//     //这里必须要加上， 此钩子函数会在beforeEach之后马上执行,没有这句会导致
//     //当你浏览顺序为，首页->页面二->页面三
//     //此时点击页面二正常返回，然后再次选择页面三，本应该是前进，结果还是返回。
//     router.app.trans='next';//重置前进
    
// });

let data = {
  store, 
  router, 
  ...App
}

new Vue(data).$mount('#app');

 
