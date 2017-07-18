<template>
	<div class='header' >
		<!-- 虚幻背景 -->
		<div :style="{backgroundImage:'url('+seller.avatar+')'}" class="header-son1"></div>
		<div class="header-son2" @click="showDetail">
				<!-- 商标 -->
				<img :src="seller.avatar" alt="" class="sellerPic" >
				<div class="header-content">
					<!-- 品牌 -->
					<img src="../../../static/images/brand@2x.png" class="sellerIcon1">
					<!-- 商家名称 -->
					<span class="sellerName">{{seller.name}}</span>
					<!-- 配送 -->
					<span class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</span>
					<!-- 优惠信息 -->
					<img src="../../../static/images/decrease_1@2x.png" class="sellerIcon2">
					<span class="supports" v-for="(v,k) in seller.supports" v-if="k==0">
						{{v.description}}
					</span>
					
				</div>
				<!-- 优惠信息缩略 -->
				<div class="sellerIcon3" v-for="(v,k) in seller.supports" v-if="k==0">&nbsp;&nbsp;{{seller.supports.length}}个
					<span class="icon-keyboard_arrow_right"></span>
				</div>
			<!-- 公告栏 -->
			<div class="header-notice">
				<img src="../../../static/images/bulletin@2x.png" class="header-notice-img">
				<span class="header-notice-bulletin">{{seller.bulletin}} </span>
				<span class="icon-keyboard_arrow_right" id="right">
                </span>
			</div>
		</div>
			<!-- 商家详情弹出层 -->
		<detail></detail>
		
	</div>
	

</template>

<script>
	import {mapGetters} from 'vuex'
	import detail from '../detail/detail.vue'
	export default {
		created(){
			this.$store.dispatch('getSeller');
		},
		computed:{
			...mapGetters([
				'seller'
			])
		},
		components:{
			detail
		},
		methods:{
			showDetail(){
				this.$store.dispatch('showDetail');
			}
		}
	}

</script>

<style lang="less" scoped>
	.header{
		// width:100%;
		height:2.48rem;
		font-size: 0.18rem;
		color:rgb(255,255,255);	
		//虚幻背景box
		.header-son1{
			width: 100%;
			height: 2.48rem;
			position: absolute;
			top:0;
			background-size:50% 120%;
			background-repeat: no-repeat;
			background-position: 50% 80%;
			filter:blur(5px);
		}
		.header-son2{
			position:relative;
			top:0;
			left:0;
			width: 100%;
			height: 2.48rem;
			background-color: rgba(7,17,27,0.5);
			//头像
			.sellerPic{
				width: 1.28rem;
				height: 1.28rem;
				border-radius:0.04rem;
				position: absolute;
				top:0.38rem;
				left: 0.38rem;
			}
			.header-content{
				position: absolute;
				top:0.38rem;
				left:1.88rem;
				//品牌
				.sellerIcon1{
					height: 0.3rem;
					margin-top: 0.04rem;
				}
				//商家名
				.sellerName{
					font-size: 0.26rem;
					display: inline-block;
					position: relative;
					top: -0.05rem;
					height: 0.34rem;
					line-height: 0.34rem;
					margin-left: 0.1rem;
				}
				//配送信息
				.description{
					font-size: 0.2rem;
					display: block;
					margin-top: 0.1rem;
				}
				//优惠图标
				.sellerIcon2{
					height: 0.24rem;
					margin-top: 0.2rem;
				}
				//优惠信息
				.supports{
					font-size: 0.18rem;
					display: inline-block;
					position: relative;
					top: -0.05rem;
					height: 0.36rem;
					line-height: 0.36rem;
					margin-left: 0.1rem;
				}
				
			}
			//优惠缩略
			.sellerIcon3{
				width: 0.88rem;
				height: 0.42rem;
				background-color: rgba(0,0,0,0.3);
				text-align: center;
				border-radius:0.28rem;
				line-height: 0.42rem;
				font-size: 0.2rem;
				position: absolute;
				right: 0.24rem;
				top:1.26rem;
				span{
					font-size: 0.3rem;
					position: relative;
					top:0.07rem;
					left:-0.07rem;
				}
			}
			// 公告
			.header-notice{
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 0.56rem;
				line-height:0.56rem;
				background-color: rgba(7,17,27,0.3);
				// 公告图标
				.header-notice-img{
					width: 0.42rem;
					position: absolute;
					left: 0.24rem;
					top:50%;
					margin-top: -0.11rem;
				}
				//公告内容
				.header-notice-bulletin{
					display: inline-block;
					width: 80%;
					height: 100%;
					margin-left: 0.8rem;
					line-height:0.56rem;
					overflow: hidden;
   					white-space: nowrap;
    				text-overflow: ellipsis;
    				font-family: initial;
    				font-size: 0.18rem;
				}
				//右侧箭头
				#right{
					font-size: 0.3rem;
    				position: absolute;
					top: 50%;
					right: 0.18rem;
    				margin-top: -0.15rem;
				}
			}
		}
	}
	
</style>

