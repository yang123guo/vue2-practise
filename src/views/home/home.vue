<style lang="stylus" scoped>   
@import '../../stylus/home.styl';
</style>
<template>
    <main class="home_page" >
        <head-bar>
            <div slot="middle">
                <img src="../../assets/images/logo.png" class="logo_img">
            </div>       
        </head-bar>     
        <section class="home_container" :style="{height : homeHeight +'px'}">        
            <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
                <li class="news_item" v-for="(item, index) in newsList" :key="item.id">
                    <router-link  :to="{ path: 'channelDetail', query: { channel_type : item.classification , id : item.id}}" >
                        <div  class="item_img">
                            <v-img :imgUrl="item.avatar"></v-img>
                        </div>                                
                        <div class="item_content">
                            <h2 class="item_title">{{item.title}}</h2>
                            <p class="item_info">
                                <span>{{getClass(item.classification)}}</span>
                                <span>{{item.date | dayFormat}}&nbsp;{{item.date | timeFormat}}</span>
                                <span class="fr">
                                    <i class="iconfont icon">&#xe66f;</i>{{item.appreciate}}
                                </span>
                            </p>
                        </div>  
                    </router-link>                                      
                </li>
                <p class="page_infinite_loading" v-if="!loading && !toBottom">
                    <mt-spinner type="double-bounce" :color="spinnerCor" :size="24" style="display:inline-block"></mt-spinner>   
                    <span class="loadingText">加载中..... </span>
                </p>
                <p class="page_infinite_loading" v-if="toEnd">
                    <span class="loadingText">到最底部了...</span>
                </p>
            </ul>
           
        </section>
       
    </main>
</template>

<script>
import headBar from '../common/head';
import CONST from "../../common/constant";
import { Toast , InfiniteScroll , Spinner } from 'mint-ui';
import vImg from '../../components/lazyimg';

export default {
    data() {
        return {
            newsList : [],     
            page : 1,
            loading : false,
            toBottom : true,
            spinnerCor : 'blue',
            wrapperHeight: 0,
            toEnd : false,
            loadMoreFlag : false,
            isAjax : false,
        }
    },
    created() {
       this.getNewsList()     
    },
    computed : {
       homeHeight() {
            let clientHeight = document.documentElement.clientHeight;
            return parseInt(clientHeight - 51)
        } 
    },
    components : {
        InfiniteScroll, 
        Spinner,
        headBar,
        vImg
    },
    methods : { 
        // 获得首页列表数据
        getNewsList() {
            this.isAjax = true; 
            this.$service.Home.getHomeList().then(res => {
                this.isAjax = false; 
                let {state, data} = res.data;
                if(state === 1){
                    this.$store.dispatch('updateAllLoad', false)
                    if(this.page === 1){
                        this.newsList = data;                        
                        this.$nextTick(() => {
                            this.loadMoreFlag = true;
                        });
                    }else{
                        this.newsList =  this.newsList.concat(data);
                    } 

                }

            })
        },

        // 编译订阅类型
        getClass(item) {
            return CONST.SUBSCRIBE_TYPE[item]
        },

        mounted : {
            
        },
        // 向上滑动加载更多
        loadMore() {
            // infinite-scroll-disabled为true，则滚动不会被触发,防止过快的连续滚动

            if(!this.loadMoreFlag || this.isAjax == true) {
                return false;
            }else{
                if(!this.loading){
                    this.loading = false;
                    this.page++;
                    if(this.page <= 5 ){   
                        setTimeout(function(){
                            this.getNewsList()
                             this.toBottom = false
                        }.bind(this),300) 
                    }else{
                        this.toEnd = this.toBottom = true;
                    }
                }
            }
                
        }
        
    },

    watch : {
        
    }
}
        
</script>