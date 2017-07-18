<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class="detail" v-show="detailShow">
			<!-- 商家图标 -->
			<div  class="detail-avatar">
				<img :src="seller.avatar">
			</div>
			<!-- 商家名 -->
			<span class="detail-name">{{seller.name}}</span>
			
			<!-- 星星 -->
			<div class="detail-star">
				<star :score="seller.score" :size="size"></star>
				<span class="s-score">{{seller.score}} 分</span>
			</div>
			<div class="detail-title">
				<hr><span>优惠信息</span><hr>
			</div>
			<!-- 优惠信息 -->
			<div class="detail-supports">
				<ul >
					<li v-for="(v,k) in seller.supports"><img :src="v.src1" alt=""><span>{{v.description}}</span></li>
				</ul>
			</div>
			<div class="detail-title">
				<hr>
				<span>商家公告</span><hr>
			</div>
			<!-- 公告详情 -->
			<div class="detail-bulletin">
				{{seller.bulletin}}
			</div>
			<!-- 关闭 -->
			<div class="detail-close">
				<span class="icon-close" @click="closeDetail"></span>
			</div>
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import star from '../star/star.vue'
	export default {
		computed:{
			...mapGetters([
				'detailShow',
				'seller'
			])
		},
		methods:{
			closeDetail(){
				this.$store.dispatch('closeDetail');
			}
		},
		components:{
			star
		},
		data(){
			return {
				size:'big'
			}
		}
	}	
</script>

<style lang="less" scoped>
	.detail{
		position:fixed;
		top:0;
		left:0;
		z-index:20;
		width:100%;
		height:100%;
		overflow:auto;
		text-align: center;
		background-color:rgba(7,17,27,0.8);
		// 商家头像
		.detail-avatar{
			width: 1.4rem;
			height: 1.4rem;
			border-radius: 50%;
			border:0.1rem solid rgba(101,108,109,0.5);
			overflow: hidden;
			margin: 0.6rem auto 0;
			img{
				width: 1.4rem;
			}
		}
		// 商家名
		.detail-name{
			font-size: 0.28rem;
			display: block;
			margin: 0.2rem 0;
			font-weight: bold;
		}
		//标题
		.detail-title{
			margin: 0.04rem auto;
			hr{
				width: 1.6rem;
				height:0.03rem;
				border: none;
				display: inline-block;
				margin-top: 0.2rem;
				background-color:rgba(255,255,255,0.2);
			}
			span{
				font-size: 0.24rem;
				display: inline-block;
				margin:0.18rem 0.24rem;
				// font-weight: bold;
			}
		}
		//优惠信息详情
		.detail-supports{
			color: rgba(255,255,255,0.7);
			text-align: left;
			// margin-left: 1rem;
			padding:0 1rem;
			font-size: 0.2rem;
			img{
				height: 0.26rem;
				display: inline-block;
				margin-right: 0.14rem;
				vertical-align:middle;
			}
			li{
				display: block;
				height: 0.32rem;
				margin-bottom: 0.18rem;
			}
			li:nth-child(5){
				margin-bottom: 0;
			}
		}
		//商家公告
		.detail-bulletin{
			padding:0 0.9rem;
			color: rgba(255,255,255,0.7);
		    text-align: left;
		    line-height: 0.48rem;
		    font-size: 0.2rem;
		}

		//关闭按钮
		.detail-close{
		    width: 0.8rem;
		    height: 0.8rem;
		    line-height: 0.8rem;
		    left: 50%;
			margin-left: -0.4rem;
		    position: fixed;
		    bottom: 0.8rem;
		    span{
		    	font-size: 0.48rem;
		    	line-height: 0.8rem;
		    	color: rgba(255,255,255,0.6)
		    }
		}
		//星星
		.detail-star{
			margin-left: 1.62rem;
			display:flex;
			.s-score{
				margin-left:0.1rem;
				margin-top:0.12rem;
				font-size:0.2rem;
			}
		}
	}
</style>