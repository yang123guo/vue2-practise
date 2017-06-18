<template>
    <transition :name="transition">
        <div class="mask"
            v-show="$parent.currentValue"
            @click="clickable">
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'mask-layer',
        props: {
            transition: {
                type: String,
                default: 'fade',
            }
        },
        methods : {
            //clickable && ($parent.currentValue = false)
            clickable(){
                this.$emit('close')
            }
        }
    };
</script>

<style lang="stylus">
@import '../assets/css/common.styl'; 
    .mask 
        position fixed
        left 0 
        top 0
        right 0
        bottom 0
        z-index $zIndexDrawerMask
        background-color rgba(0,0,0,0.3)
        
    .fade-enter
        opcity 0
    
    .fade-enter-active 
        animation fadeIn .3s ease
    
    .fade-leave-active
        animation fadeOut .3s ease
        

    @keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>