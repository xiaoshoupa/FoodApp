<template>
	<div class="f-click">
		<!-- 入离场动画 -->
		<transition name="fade">
			<!-- 减少按钮 -->
			<span class="icon-remove_circle_outline f-reduce" v-show="food.count>0" @click.stop="reduceCount($event)"></span>
		</transition>
		<!-- 数量 -->
		<span class="f-count" v-show="food.count>0" @click.stop>{{food.count}}</span>
		<!-- 增加按钮 -->
		<span class="icon-add_circle f-add"  @click.stop="addCount($event)"></span>
	</div>
</template>
<script type="text/javascript">
	 import Vue from 'vue';

    export default {
    	props : ['food'],
    	methods : {
    		// 增加
    		addCount( event ){
                if( !event._constructed ){
                    return;
                };
                if( !this.food.count ){
                    Vue.set( this.food , 'count' , 1 );
                }else{
                    this.food.count ++ ;
                }
            },
            // 减少
            reduceCount( event ){
    			if( !event._constructed ){
    				return;
    			};
    			this.food.count -- ;
    		}
    	}

    }
</script>

<style lang="less" scoped>
	.f-click{
		position: absolute;
		right: 0rem;
		bottom: 0.2rem;
		// 减少按钮
		.f-reduce{
			color: rgb(0, 160, 220);
			font-size: 0.36rem;
			position:absolute;
			right:0.74rem;
		}
		//数字
		.f-count{
			font-size: 0.22rem;
			display: inline-block;
			width:0.28rem;
			text-align: center;
			position: relative;
			top:-0.08rem;
		}
		//增加按钮
		.f-add{
			font-size: 0.36rem;
			color: rgb(0, 160, 220);
		}
	}
	//自定义动画
	//入场
	.fade-enter-active{
		transition: all 0.8s ease;
	}
	//出场
	.fade-leave-active{
		transition: all 0.6s ease;
	}
	//效果
	.fade-enter, .fade-leave-to{
  		transform:translateX(0.74rem) rotate(360deg);
 		 opacity: 0;
	}
</style>