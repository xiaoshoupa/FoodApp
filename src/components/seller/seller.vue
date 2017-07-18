<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<!-- 商家介绍-->
			<div class="seller-description">
			<!-- 商家名 -->
				<span class="seller-description-name">{{seller.name}}</span>
				<!-- 星星div -->
				<div class="seller-description-star">
					<!-- 星星 -->
					<star :score="seller.score" :size="size"></star>
					<span class="seller-description-star-text span1">( {{seller.ratingCount}} )</span>
					<span class="seller-description-star-text">月售{{seller.sellCount}}单</span>
				</div>
				<!-- 收藏 -->
				<div class="seller-description-favorite"  @click="saveColor">
					<span class="icon-favorite icon" :class="{'red':fColor}"></span>
					<span class="icon-text"><span v-if="fColor">已</span>收藏</span>
				</div>
				<!-- 数据信息 -->
				<div class="mark">
					<div class="mark-box">
						<span class="mark-title">起送价</span>
						<span class="mark-num">{{seller.minPrice}}</span>
						<span>元</span>
					</div>
					<div class="mark-box">
						<span class="mark-title">商家配送</span>
						<span class="mark-num">{{seller.deliveryPrice}}</span>
						<span>元</span>
					</div>
					<div class="mark-box">
						<span class="mark-title">平均配送时间</span>
						<span class="mark-num">{{seller.deliveryTime}}</span>
						<span>分钟</span>
					</div>
				</div>
			</div>
			<slipts></slipts>
			<!-- 商家活动 -->
			<div class="seller-bulletin">
				<!-- 标题 -->
				<span>公告与活动</span>
				<!-- 描述 -->
				<div class="seller-bulletin-text">
					{{seller.bulletin}}
				</div>
				<!-- 优惠详情 -->
				<ul>
					<li v-for="v in seller.supports" class="seller-bulletin-li">
						<img :src="v.src2" class="seller-bulletin-li-img">
						<span class="seller-bulletin-li-text">
							{{v.description}}
						</span>
					</li>
				</ul>
			</div>
			<slipts></slipts>
			<!-- 商家实景 -->
			<div class="seller-pic" style="">
				<span>商家实景</span>
				<div class="seller-pic-box" ref="picBox">
					<ul ref="sellerUl">
						<li v-for="pic in seller.pics" class="seller-pic-box-li">
							<img :src="pic">
						</li>
					</ul>
				</div>
			</div>
			<slipts></slipts>
			<div class="seller-infos">
				<span>商家信息</span>
				<ul>
					<li v-for="v in seller.infos" class="seller-infos-li">{{v}}</li>
				</ul>
			</div>
			<div class="space">
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import star from '../star/star.vue'
	import slipts from '../slipts/slipts.vue'

	export default {
		computed:{
			...mapGetters([
				'seller'
			])
		},
		components:{
			star,
			slipts
		},
		data(){
			return {
				size:'small',
				fColor:''
			}
		},
		watch:{
			seller(){
			
			}
		},
		created(){
			this.fColor=this.fColor=window.localStorage.getItem('item');
			
			this.$nextTick(()=>{
				setTimeout(()=>{
					let picWidth = 120;
		          	let margin = 6;
		          	let width = (picWidth + margin) * this.seller.pics.length - margin;
		          	this.$refs.sellerUl.style.width = width + 'px';
					this.scroll=new BScroll(this.$refs.seller,{
					click:true
					});
					this.scroll2=new BScroll(this.$refs.picBox,{
						scrollX: true,
		               	eventPassthrough: 'vertical'
					});
				},100);
			})
		},
		methods:{
			saveColor(){
				this.fColor=!this.fColor;	
				if(this.fColor){
					window.localStorage.setItem("item",this.fColor);
				}else{
					window.localStorage.removeItem("item");

				}
			}
		}
	}
</script>

<style lang="less" scoped>
//商家信息box
.seller{
	height: 100%;
	width: 100%;
	position: fixed;
	overflow: hidden;
	//商家信息内容
	.seller-description{
		padding:0.36rem;
		font-size: 0.24rem;
		position: relative;
		//商家名称
		.seller-description-name{
			margin-left:0.1rem;
			font-size: 0.24rem;
		}
		//商家星星box
		.seller-description-star{
			margin-left:0.1rem;
			display: block;
			margin-top:0.16rem;
			padding-bottom: 0.18rem;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			position: relative;
			//月售单数以及评价数量
			.seller-description-star-text{
				font-size:0.16rem;
				display:inline-block;
				position:absolute;
				top:50%;
				margin-top:-0.16rem;
				margin-right:0.2rem;
				left:2.4rem;
				&.span1{
					left:1.7rem;
				}
			}
		}
		//收藏
		.seller-description-favorite{
			position:absolute;
			right: 0.5rem;
			top:0.28rem;
			text-align: center;
			line-height: 0.3rem;
			width:0.8rem;
			//收藏图标
			.icon{
				font-size:0.38rem;
				color:rgba(57,57,57,0.2);
				&.red{
					color:red;
				}
			}
			//收藏文字
			.icon-text{
				font-size:0.22rem;
				display:block;
			}
		}
		//3个数据信息
		.mark{
			display:flex;
			font-size:0.2rem;
			//单个数据信息box
			.mark-box{
				flex:1;
				margin-top:0.24rem;
				// margin-left: -0.1rem;
				text-align:center;
				border-right:1px solid rgba(7,17,27,0.1);
				//数据信息标题
				.mark-title{
					display:block;
					color:rgb(147,153,159);
					font-size:0.22rem;
					margin-bottom:0.12rem;
				}
				//数据-数字
				.mark-num{
					font-size:0.4rem;
					color:rgb(7,17,27);
					font-family: 'Century Gothic','YouYuan';
				}
			}
			.mark-box:nth-child(3){
				border-right: none;
			}
		}
	}
	//商家公告与活动
	.seller-bulletin{
		padding:0.36rem;
		padding-bottom: 0.2rem;
		font-size:0.24rem;
		//描述文字
		.seller-bulletin-text{
			// margin-left:0.02rem;
			margin-top:0.2rem;
			font-size:0.2rem;
			line-height: 0.42rem;
			padding-bottom:0.2rem;
			color:rgba(7,17,27,0.7);

		}
		//优惠信息
		.seller-bulletin-li{
			border-top: 1px solid rgba(7,17,27,0.1);
			font-size:0.22rem;
			padding-bottom:0.2rem;
			padding-top:0.2rem;
			color:rgba(7,17,27,0.7);
			position:relative;
			//优惠信息图标
			.seller-bulletin-li-img{
				width: 0.3rem;
				position:relative;
				left:0.04rem;
			}
			//优惠信息文字
			.seller-bulletin-li-text{
				display:block;
				position:absolute;
				top:50%;
				margin-top:-0.1rem;
				left:0.48rem;
			}
		}
		//最后一个优惠信息
		.seller-bulletin-li:last-child{
			padding-bottom:0rem;
			line-height:0.34rem;
		}
	}
	//商家实景
	.seller-pic{
		padding:0.36rem;
		font-size:0.24rem;
		overflow: hidden;
		//商家实景盒子
		.seller-pic-box{
			margin-top: 0.24rem;
			overflow: hidden;
			ul{	
				display:flex;
				padding-right: 0.2rem;
				.seller-pic-box-li{
					margin-right: 0.1rem;
					//实景图片大小
					img{
						width:1.8rem;
						height:1.4rem;
					}
				}
				
			}
		}
	}
	//商家信息
	.seller-infos{
		padding:0.36rem;
		font-size:0.24rem;
		.seller-infos-li{
			// margin-left:0.1rem;
			padding-left:0.04rem;
			font-size:0.22rem;
			padding-bottom:0.26rem;
			padding-top:0.26rem;
			color:rgba(7,17,27,0.7);
			border-top: 1px solid rgba(7,17,27,0.1);
		}
		.seller-infos-li:nth-child(1){
			margin-top:0.26rem;
		}
	}
	.space{
		padding-bottom:4.2rem;
	}
}
</style>