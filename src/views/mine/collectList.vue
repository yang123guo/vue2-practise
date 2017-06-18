<style lang="stylus" scoped>
    @import '../../assets/css/common.styl';
    @import '../../stylus/collect.styl';
</style>

<template>
    <section>
    <!-- 头部导航条 -->
        <head-bar>
            <div slot="middle" >
                <span class="collect_title">{{title}}</span>               
            </div>
            <a @click="statusChange" slot="right" >
                <div class="collect_status">
                   <span v-show="!isOK">完成</span>
                    <span v-show="isOK">编辑</span> 
                </div>                
            </a>
        </head-bar>  
        <main class="collection_page"> 
            <section class="listNull" v-if="!collectData.length" flex="main:center cross:center">
                <div>
                     <img src="../../assets/images/no_collection.jpg">                
                    <div class="goto_home">
                        <router-link  :to="{ path: 'home'}" >
                            <i class="iconfont goto_homeColor">&#xe658;</i>
                            <span class="goto_homeColor">去首页看看</span>
                       </router-link>
                    </div>
                </div>              
                
            </section>

            <section class="collect_wrap clear">
                <div class="collect_item border border-bottom" flex="" v-for="(item, index) in collectData">
                    <div class="collect_check_list " flex-box="0" v-show="!isOK" @click="returnChecked(index)">
                        <span class="collect_check" :class="{checked : item.checked}" ></span>
                    </div>
                    <router-link flex-box="1"  :to="{ path: 'channelDetail', query: { channel_type : item.classification , id : item.id}}" >
                    <div class="collect_content_list" flex="">
                        <figure flex-box="0">
                            <img src="http://img0.imgtn.bdimg.com/it/u=3647965459,1629578673&fm=21&gp=0.jpg">
                        </figure>
                        <div class="collect_text_list" flex-box="1">
                            <h4 class="collect_text">{{item.title}}</h4>
                            <p class="collect_info">
                                <span class="collect_origin">{{item.classification | transformClass}}</span>
                                <span class="collect_date">{{item.date | dayFormat}}</span>
                            </p>
                        </div>
                    </div>
                    </router-link>  
                </div> 
                                    
            </section>

            <section class="collect_allEdit bounceIn animated" v-show="!isOK && collectData.length"  flex="main:justify">
                <div class="collect_all" @click="checkedAll()">
                    <span class="collect_check " :class="{checked : this.checked_all}" ></span>
                    <label class="collect_allCheck">全选</label>
                </div>
                <div class="collect_deleteBtn fr" @click="deleteList">
                   <a class="weui_btn weui_btn_delete">删除</a>
                </div>
            </section>
        </main>
    </section>        
</template>

<script>
    import headBar from '../common/head';
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                isOK : true,
                title : '我的收藏',
                collectData : [],
                loading : false,
                page : 1,
                loading : true,
                toBottom : false,
                checked_all : false,
            }
        },
        created() {
            this.collectList();  
            this.$store.dispatch('updateAllLoad', false)
        },
        components : {
            headBar,            
            
        },
        computed : {
            
        },
        methods : { 
            menu() {

            },
            statusChange() {
                this.isOK = !this.isOK;
            },

            collectList() {
                this.$service.Home.getHomeList().then(res => {
                    this.loading = true;
                    let {state, data} = res.data;
                    data.map(function(item, index){
                        item.checked = false;
                    })

                    if(state === 1){
                        this.toBottom = this.loading = false;
                        if(this.page === 1){
                            this.collectData = data;
                        }else{
                            this.collectData =  this.collectData.concat(data);
                        }                    
                    }
                })
            },
            /**
             * 单个状态
             * @param  {[type]} index [数组索引值]
             * @return {[type]}       [description]
             */
            returnChecked( index ) {
                this.collectData[index].checked = !this.collectData[index].checked;
                let allTrue = this.collectData.every(item => {
                    return item.checked
                })
                if(allTrue){
                    this.checked_all = true
                }else{
                    this.checked_all = false
                }
            },

            /**
             * 全选按钮状态
             * @return {[type]} [description]
             */
            checkedAll() {
                this.checked_all = !this.checked_all;
                this.collectData.forEach(item => {
                    item.checked = this.checked_all
                })
            },

            /**
             * 删除商品
             * @return {[type]} [description]
             */
            deleteList() {
                
               
                // 保证有选中的项，没有要提示
                let hasChecked = this.collectData.some(item => {
                    return item.checked
                }) 
                if(!hasChecked){
                    Toast({
                      message: '请选择需要删除项',
                      iconClass: 'iconfont icon-success white',
                      duration: 800
                    });
                }else{
                    // 得出选中列表的id，放入数组
                    const delIdArr = [];
                    (this.collectData.filter(item => {
                        return item.checked == true
                    })).forEach(item => {
                        delIdArr.push(item.id)
                    })
                    console.log(delIdArr)

                    // 删除以后发出请求，回调成功以后toast提示
                        this.collectData = this.collectData.filter(item => {
                            return item.checked == false
                        })
                        
                        Toast({
                          message: '已删除',
                          iconClass: 'iconfont icon-success white',
                          duration: 800
                        });
                }
            }
        }
}
</script>
