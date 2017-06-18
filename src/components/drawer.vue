<template>
    <!-- container -->
    <div>
		<transition :name="(placement === 'left') ? 'slideleft' : 'slideright'" >
		    <div class="aside-drawer" 
			    :style="{'width':width + 'px' }"
			    :class="{left:placement === 'left', right:placement === 'right'}"
			    v-show="currentValue"> 
		    	<slot></slot>
		    </div>    
		</transition>
		<mask-layer v-on:close="closeBox"></mask-layer>
	</div>


</template>

<script>
import maskLayer from './mask'
export default {
    props: {        
		value: {},
		placement: {
		    type: String,
		    default: 'left'
		},
		width: {
		    type: Number,
		    default: 320
		}
    },     
	components: {
	    maskLayer
	},
	watch : {
	    value(val) {
		    this.currentValue = val;
		},
	    currentValue(val) {    
		    this.$emit('input', val);
		    this.$emit('change', val, this.currentText);
	    },            
	},
    data() {
		return {
		    currentValue: this.value	    
		}
    },
    methods: {
		closeBox() {
		    this.currentValue = false
		}
    }
}
</script>

<style lang="stylus" >
@import '../assets/css/common.styl';
.aside-background
	position: fixed
	top: 0
	right: 0
	bottom: 0
	left: 0
	z-index: $zIndexDrawerBg
	background-color: rgba(0,0,0,.3)
	&.in
		opacity: .5
		
.aside-drawer
	position: fixed
	top: 0
	bottom: 0
	z-index: $zIndexDrawerAside
	overflow: auto
	background: #fff
		
	&.left
		left: 0
		right: auto			
	
	&.right
		right: 0
		

.slideleft-enter-active
	// 其他属性
	animation: slideleft-in .3s

.slideleft-leave-active
	animation: slideleft-out .3s
	
@keyframes     slideleft-in
	from 
		-webkit-transform: translate3d(-100%, 0, 0)
		transform: translate3d(-100%, 0, 0)
		opacity: 0

	to
		-webkit-transform: translate3d(0, 0, 0)
		transform: translate3d(0, 0, 0)
		opacity: 1


@keyframes     slideleft-out
	from 
		-webkit-transform: translate3d(0, 0, 0)
		transform: translate3d(0, 0, 0)
		opacity: 1

	to
		-webkit-transform: translate3d(-100%, 0, 0)
		transform: translate3d(-100%, 0, 0)
		opacity: 0



			
				    
</style>
