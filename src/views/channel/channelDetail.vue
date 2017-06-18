<style lang="stylus" scoped>   
@import '../../assets/css/common.styl';
@import '../../stylus/channel_detail.styl';
</style>
<template>
    <main class="channel_detail_page">
        <head-bar>
            <div slot="middle">
                <img src="../../assets/images/logo.png" class="logo_img">
            </div>       
        </head-bar>     
        <section class="channel_detail_container"> 
            <p class="channel_detail_info">
                <span class="detail_type">新闻中心</span>
                <i>&nbsp;</i>
                <span class="detail_time">09.20  10:00</span>
            </p>

            <div class="detail_content">    北京时间3月8日3时45分（意大利当地时间7日20时45分），欧冠1/8决赛次回合先赛2场，皇马客场3比1逆转那不勒斯，总比分6比2晋级8强。梅尔滕斯首开纪录，C罗和梅尔滕斯先后中柱。下半时，克罗斯两次开出角球，欧战百场的拉莫斯头槌扳平并造成梅尔滕斯乌龙。替补前锋莫拉塔终场前破门。[巴萨会出奇迹吗？新浪小炮预测今晚欧冠足彩]

　　首回合皇马主场3比1胜出，那不勒斯主场2比0取胜就能翻盘，但皇马此前已连续46场正式比赛破门。皇马近9个欧冠客场仅1负，但9次冠军联赛作客意大利仅1胜。联赛缺席的贝尔和C罗回归首发，BBC三箭齐发。佩佩顶替受伤的瓦拉内。

    一开场，迪亚瓦拉右路低传，梅尔滕斯禁区边缘转身射门被拉莫斯挡出横梁。克罗斯头球回传失误，因西涅禁区左侧射门角度已经太小，凌空将球打偏。因西涅左路低传，哈姆西克禁区前沿抽射偏出远门柱。库利巴利直传，因西涅在门前27米处转身低射被纳瓦斯封出左门柱。


    皇马第15分钟才有首次射门，摩德里奇右路直传反击，贝尔传中，克罗斯在门前20米处凌空抽射被雷纳没收。阿尔比奥尔直传，哈姆西克左肋突破低射偏出远门柱。卡塞米罗后场精准长传，贝尔在门前18米处左脚外脚背卸球低射被雷纳没收。
            </div>
        </section>  
        <footer class="foot_bar" flex="dir:left box:mean">
            <div :class="{blueCor : checkedCollect}" @click="doCollect">
               <i class="iconfont channel_detail_icon fz18">&#xe605;</i>
               <span class="channel_detail_do">收藏</span>
            </div>
            <div @click="doLike" :class="{blueCor : checkedLike }" >
               <i class="iconfont channel_detail_icon top">&#xe63f;</i>
               <span class="channel_detail_do">点赞</span>
           </div>
        </footer>     
    </main>
    
</template>

<script>
import headBar from '../common/head';
import CONST from "../../common/constant";
import { Toast , InfiniteScroll , Spinner } from 'mint-ui';

export default {
    data() {
        return {
           checkedCollect : true,
           checkedLike : false
        }
    },
    created() {  
        this.$store.dispatch('updateAllLoad', false)
    },
    components : {
        InfiniteScroll, 
        Spinner,
        headBar,
    },
    methods : {
        // 收藏
        doCollect() {
            if(!this.checkedCollect){
                this.checkedCollect = !this.checkedCollect;
                Toast({
                    message: '已收藏',
                    iconClass: 'iconfont icon-success white',
                    duration: 800
                });
            }else{
                this.$router.push({ name: 'collection' })
            }
                
        },
        // 点赞
        doLike() {
            this.checkedLike = !this.checkedLike;
            if(this.checkedLike){
                Toast({
                    message: '已点赞',
                    iconClass: 'iconfont icon-success white',
                    duration: 800
                });
            }else{
                Toast({
                    message: '取消点赞',
                    iconClass: 'iconfont icon-success white',
                    duration: 800
                });              
            }
        }
    }
}
        
</script>