<template>
    <section class="listNull"  flex="main:center cross:center">
        <div>
             <img src="../../assets/images/404.png" class="noFound_img">                
            <div class="goto_home">
                <router-link  :to="{ path: 'home'}" >
                    <i class="iconfont goto_homeColor">&#xe658;</i>
                    <span class="goto_homeColor">去首页看看</span>
               </router-link>
            </div>
        </div>              
        
    </section>
</template>
<script>
export default{
    data () {
        return {
        }
    },
    created() {
        this.$store.dispatch('updateAllLoad', false)
    }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/common.styl';
   .listNull
        background-color $f
        width 100%
        position fixed
        top 0
        left 0
        bottom 0
        z-index 4
        
        >div 
            margin-top -60px
        
            img
                display block
                
                &.noFound_img
                    width 100px
            
            .goto_home
                background-color $light_blue
                border-radius 4px
                line-height 30px
                width 100px
                padding 2px 5px
                margin 15px auto
                font-size 12px 
                text-align center 
                          
               .goto_homeColor
                   color $f 
</style>
