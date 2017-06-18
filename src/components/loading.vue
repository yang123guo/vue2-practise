<template>
    <div class="loading" v-show="show">
        <div class="loader-inner ball-pulse">
            <mt-spinner :type="type" :color="color" :size="size" ></mt-spinner>
        </div>
</template>
<script>
    import { Spinner  } from 'mint-ui';
    export default {
        name: 'loading',

        props: {
            show: {
                type: Boolean
            },
            type : {
                type : String,
                default : 'triple-bounce'
            },
            color : {
                type : String,
                default : '#03a9f4'
            },
            size : {
                type : Number,
                default : 60
            },
        },
        components : {
           Spinner
        },
    };
</script>

<style lang="stylus" >
@import '../assets/css/common.styl';
@import '../stylus/loading.styl';
</style>