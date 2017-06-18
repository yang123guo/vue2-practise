<style lang="stylus">
@import './assets/css/common.styl'; 
.container 
    position relative;
  
  // 可见之前的切换class类名控制是正确的，错误的是两个页面在同一z-index上，所以过渡很别扭
@keyframes bounce-in {
    from {
        -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        opacity: .4;
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
  }
@keyframes bounce-out {
    from {
        -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
        opacity: .4;
    }
  }
.bounce-enter-active {
    position: absolute;
    z-index:1001px;
    animation: bounce-in .5s;
}
.bounce-leave-active {
    position: absolute;
    z-index:1000px;
    animation: bounce-out .5s;
}
</style>

<template>
    <section class="root">        
        <main class="container">  
            <transition  :name="trans">
                <router-view ></router-view>
            </transition>
        </main>
        <loading :show="loadingShow"></loading>
    </section>
</template>

<script>

import Loading from "./components/loading";
import Service from "./services";
import Utils from "./common/utils";
import Vue from 'vue';
import { mapState , mapGetters } from 'vuex';

export default {
    name: 'app',
    data () {
        return {
            trans : 'next'  // 过渡效果
        }    
  },
    components: {
        Loading
    },
    computed: {
        ...mapState([
            'loadingShow'
        ])
    },
    created() {
        const $service = Service.init(this);
        Object.defineProperties(Vue.prototype, {
            $service: {
                get: function () {
                  return $service;
                }
            }
        });
        this.getUserInfo();   

    },
    methods : {
        getUserInfo() {
            let code = Utils.urlParse().code || 'UE3DtIiyyAB2Ch-ONY5dTKvqBZz0w17wlz2fAXA_i9w'; 
            this.$service.Auth.getUserInfo(code).then(res => {
                console.log(res.Token);
            })
        }
    }
}
</script>
