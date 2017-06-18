<style lang="stylus" scoped>   
@import '../../assets/css/common.styl';
@import '../../stylus/channel.styl';
</style>
<template>
    <main class="channel_page">
        <head-bar>
            <div slot="middle">
                <img src="../../assets/images/logo.png" class="logo_img">
            </div>       
        </head-bar>     
        <div class="channel_container" :style="{height : homeHeight +'px'}">
            <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="100">
                <li class="news_item" v-for="(item, index) in collectionList" :key="item.id">
                    <router-link  :to="{ path: 'channelDetail', query: { channel_type : item.classification , id : item.id}}" >
                        <div  class="item_img">
                            <img v-lazy="item.avatar">
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
            </ul>
            <p class="page_infinite_loading" v-if="!loading && !toBottom">
                <mt-spinner type="double-bounce" :color="spinnerCor" :size="24" style="display:inline-block"></mt-spinner>   
                <span class="loadingText">加载中..... </span>
            </p>
            <p class="page_infinite_loading" v-if="toEnd">
                <span class="loadingText">到最底部了...</span>
            </p>
        </div>
    </main>
</template>

<script>
import headBar from '../common/head';
import CONST from "../../common/constant";
import utils from "../../common/utils";
import { Toast , InfiniteScroll , Spinner } from 'mint-ui';

export default {
    data() {
        return {
            collectionList : [],  
            toEnd : false,   
            page : 1,
            loading : false,
            toBottom : false,
            spinnerCor : 'blue',
            wrapperHeight: 0
        }
    },
    beforeCreate() {
        //console.log(this.$route.query.channel_type)
    },
    watch : {
        $route : function(val, oldvalue){
            if(val.query.channel_type == oldvalue.query.channel_type){
                return;
            }else{
                this.page = 1;
                this.collectionList = [];
                this.getCollectionList(); 
            }
        },

        /*'$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }*/
    },
    created() {
        //console.log(utils.urlParse().channel_type)
        this.getCollectionList();        
    },
    computed : {
       homeHeight() {
            let clientHeight = document.documentElement.clientHeight;
            return parseInt(clientHeight - 41 + 51 )
        } 
    },
    components : {
        InfiniteScroll, 
        Spinner,
        headBar,
    },
    methods : { 
        // 获得首页列表数据
        getCollectionList() {
            this.$service.Collect.getCollectList().then(res => {
                let {state, data} = res.data;
                if(state === 1){
                    this.$store.dispatch('updateAllLoad', false)
                    this.toBottom = this.loading = false;
                    if(this.page === 1){
                        this.collectionList = data;
                    }else{
                        this.collectionList =  this.collectionList.concat(data);
                    }                    
                }
            })
        },

        // 编译订阅类型
        getClass(item) {
            return CONST.SUBSCRIBE_TYPE[item]
        },

        // 向上滑动加载更多
        loadMore() {

            // infinite-scroll-disabled为true，则滚动不会被触发,防止过快的连续滚动
            if(!this.loading){
                this.loading = true;
                this.page++;
                if(this.page <= 5 ){  
                    setTimeout(function(){
                        this.getCollectionList()
                    }.bind(this),3000);                
                    
                }else{
                    this.toEnd = this.toBottom = true;
                }
            }
        }
        
    }
}
        
</script>