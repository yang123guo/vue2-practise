<template>
   <span class="numCor" >剩余{{remain}}字</span>
</template>

<script>
    export default {
        name: 'remain-count',
        data() {
            return {

            }
        },
        props: {
            num : {
                type : Number,
                default : 400
            }
        },
        
        watch: {
            remain: function (val) {
                let len = 
                return parseInt(this.num - remain, 10)
            }
        }
    };
</script>

<style lang="stylus">
@import '../assets/css/common.styl'; 
.numCor
    font-size 12px
    color $9
</style>