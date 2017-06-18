<template>
<div>
    <header class="header_wrap" flex="" :style="{color: titleColor}">
        <div class="left_menu" flex-box="0">
            <a @click="menu">
                <i class="iconfont icon">&#xe603;</i>
            </a>
        </div>
        <div flex-box="1" flex="cross:center main:center">
            <slot name="middle"></slot>
        </div> 
        <div class="left_menu" flex-box="0">
            <slot name="right"></slot>
        </div>
    </header>

     <!-- 左边侧边栏 -->
    <drawer v-model="showRight" :placement="right" :header="Title" :width="width" >
        <div class="aside-dialog">
            <tab :tabtitles="tabtitles" :current-page="1">                    
                <div class="tab-content-container">
                    <li class="title_item border border-bottom" v-for="(item, index) in subscribeList" @click="gotoDes1">
                        <router-link  :to="{ path: 'channel', query: { channel_type : item.id }}" >
                            <div class="title_img">
                                <img :src="item.cover" >
                            </div>
                            <div class="title_info">
                                <h4>{{item.title}}</h4>
                                <p>{{item.abstract}}</p>
                            </div>         
                            <!-- <span class="title_operate fr">
                                <i class="iconfont icon" v-html="iconCon(item.status)" v-show="item.status === 0" 
                                    :class="{addStatus : item.status === 1}" 
                                    @click="add(index)"></i>
                                <i class="iconfont icon" v-html="iconCon(item.status)" v-show="item.status === 1" 
                                    :class="{addStatus : item.status === 1}" 
                                    @click="remove(index)"></i>
                            </span> -->
                        </router-link>
                    </li> 
                </div>
                
                <div class="tab-content-container">
                    <li class="border border-bottom  border-right mine_item" v-for="(item, index) in mineTab" @click="gotoDes">
                        <router-link :to="item.route">
                            <figure>
                                <img :src="item.src">
                            </figure>                            
                            <p>{{MINE_TITLE[item.title]}}</p>
                        </router-link>
                    </li>
                    
                </div>
            </tab>
        </div>       
    </drawer>
</div>
    
</template>

<script>
import Drawer from '../../components/drawer.vue';
import tab from '../../components/vue-tab';
import CONST from "../../common/constant";
import { Toast } from 'mint-ui';

const MINE_TITLE = {'collect' : '我的收藏' , 'upload' : '我要上传'}

    export default {
        data() {
            return {
                newsList : [],
                showRight : false,
                right : 'left',
                Title : '略',
                pos: 'left',
                tabtitles: null,
                subscribeList : null,
                MINE_TITLE : MINE_TITLE,
                mineTab : [
                    {
                        'src' : 'http://img0.imgtn.bdimg.com/it/u=3647965459,1629578673&fm=21&gp=0.jpg',
                        'title' : 'collect',
                        'route' : '/collection'

                    },
                    {
                        'src' : 'http://cimg.163.com/2004/2004/11/7/20041107194340c3b27.jpg',
                        'title' : 'upload',
                        'route' : '/upload'
                    }
                ]
            }
        },
        created() {
            this.getTabTitles();     
        },
        props : {
            titleColor : {
                type : String,
                default : '#fff'
            }
        },
        components : {
            Drawer, 
            tab,
            Toast
        },
        computed : {
            width() {
                let clientWidth = document.documentElement.clientWidth;
                return parseInt(clientWidth * 0.6, 10)
            }
        },
        methods : { 
            // 获得对应的icon图标 
            iconCon(status){
                switch(status) {
                    case 0 : 
                        return '&#xe607;'
                        break;
                    case 1 : 
                        return '&#xe669;'
                        break;
                }
            },
            // 得到tab标签的内容
            getTabTitles() {
                this.tabtitles = CONST.DRAWER_TAB_DATA;
            },
            // 点击左侧菜单事件
            menu() {    
                this.showRight = !this.showRight;
                this.getSubscribeList();
            },
            getSubscribeList() {
                this.$service.Home.getSubscribeList().then(res => {                   
                    let {state, data} = res.data;
                    if(state === 1){
                        this.subscribeList = data;
                    }
                })
            }, 

            add(index){
               this.subscribeList[index].status = 1;
               Toast({
                  message: '已订阅',
                  iconClass: 'iconfont icon-success white',
                  duration: 600
                });
            },

            remove(index) {
                this.subscribeList[index].status =  0;
                Toast({
                  message: '已取消',
                  iconClass: 'iconfont icon-success white',
                  duration: 600
                });
            },

            gotoDes() {
                this.showRight = false;

            },
            gotoDes1() {
                this.showRight = false;

                //console.log(this.$route.query.channel_type)
            }           
        }
    }
    
</script>

<style lang="stylus" scoped>
@import '../../assets/css/common.styl';
.header_wrap  
    position fixed
    left 0
    top 0
    z-index $zIndexHomeHeader
    width 100% 
    height 41px
    background-color $f
    
    &:after
        content ''
        display block
        width 100%
        height 1px
        position absolute
        bottom 0
        left 0
        border-bottom 1px solid #dadada
        pointer-events none
        box-sizing border-box
  
    .left_menu
        height 40px
        width 60px
        color $titleCor
        font-size 14px
        text-align center
        line-height 40px
        
        .icon
            color $titleCor
            font-size 16px
    
    img.logo_img
        width 70px
        height 20px
  
.tab-content-container  

    li.border-bottom
            set-border-color(#f0f0f0)

        .title_item
            height 56px
            width 100%
            padding 16px
            font-size 0
            
            .title_img
                margin-right 15px
                height 26px
                width 26px
                display inline-block
            
            >img
                height 100%
                width 100%
                
            .title_info
                display inline-block
                vertical-align top 
                font-size 12px
                line-height 16px
            
            p
                font-size 10px
                color #eee
                line-height 14px
            
            .title_operate
                padding 5px
                height 30px
                width 30px    
                font-size 18px
                line-height 18px
                text-align center
                vertical-align top 
            
            .addStatus 
                color #6fbe13  
                
    li.mine_item
        box-sizing border-box
        set-border-color($borCor)        
        height 97px
        width 50%
        float left
        
        figure
            height 36px
            width 36px
            margin 24px auto 12px
            
            img
                height 100%
                width 100%
                
        p
            line-height 12px
            font-size 12px
            text-align center
            color $3
            
        
    li.mine_item:nth-child(even)
        &::after
            border-right-width: 0px                
</style>