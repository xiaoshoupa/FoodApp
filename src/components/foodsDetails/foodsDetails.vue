<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class="foodsDetails" v-show="foodShow" ref="foods_test">	
			<div>
				<div class="img">
					<img :src="food.image" alt="">				
				</div>
				<!-- 返回上一级 -->
				<div class="back" @click = 'close(food)'>
					<span class="icon-arrow_lift"></span>
				</div>
				<span class="f-name">{{food.name}}</span>
				<div class="foodContent">	
					<span class="f-sell">月售{{food.sellCount}}份</span>
					<span class="f-rating">好评率{{food.rating}}%</span>
					<!-- 商品价格 -->
					<div>
						<span class="f-price"><span>&yen;</span>{{food.price}}</span>
						<span v-if="food.oldPrice!=''" class="f-oldprice"><span>&yen;</span>{{food.oldPrice}}</span>
						<!-- 加入购物车 -->
						<div class="buy" @click.stop = 'addFist' v-show = '!food.count || food.count === 0'>加入购物车</div>
						<!-- 数量组件 -->
						<count :food="food"></count>
					</div>
				</div>
				<slipts></slipts>
				<div class="f-info">
					<span class="f-name">商品介绍</span>
					<span class="f-infos">
						<span v-if="food.info==''">无</span>{{food.info}}
					</span>
				</div>
				<!-- 间隔组件 -->
				<slipts></slipts>
				<!-- 评价 -->
				<div class="food-ratings">
					<span class="f-name">商品评价</span>
					<ratingBtn :rating="food.ratings"></ratingBtn>
					<!-- 所有评价 -->
					<ul>
						<li v-for="v in ratingList" class="r-ratings">
							<span class="r-time">{{v.rateTime | date}}</span>
							<div class="r-user">
								<span class="r-username">{{v.username}}</span>
								<img :src="v.avatar" class="r-avatar">
							</div>
							<div class="r-content">
							<!-- 好评标志 -->
								<span class="icon-thumb_up zan" v-show="v.rateType==0"></span>
							<!-- 差评标志 -->
								<span class="icon-thumb_down buzan" v-show="v.rateType==1"></span>
							<!-- 默认评价内容 -->
								<span class="r-contents">
									<span v-if="v.text==''&&v.rateType==0">默认好评!</span>
									<span v-if="v.text==''&&v.rateType==1">默认差评!</span>{{v.text}}
								</span>
							</div>
						</li>
					</ul>
					<div class="space"></div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Vue from 'vue'
	import count from '../count/count.vue'
	import slipts from '../slipts/slipts.vue'
	import ratingBtn from '../ratingBtn/ratingBtn.vue'

	export default {
		computed:{
			...mapGetters([
				'foodShow',
				'food',
				'ratingList'
			])
		},
		created(){
			
		},
		components:{
			count,
			slipts,
			ratingBtn
		},
		methods:{
			// 关闭当前页
			close(food){
				this.$store.dispatch('getFoods',food);
			},
			// 增加
			addFist(){
				Vue.set( this.food , 'count' , 1);
			}
		},
		filters:{
			// 日期过滤
			date:(data)=>{
				let d=new Date(data);
				return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+":"+d.getMinutes()+':'+d.getSeconds();
			}
		},
		watch:{
			ratingList(){
				this.$nextTick( () => {
					setTimeout( () => {
						if( !this.scroll ){
		 					this.scroll = new BScroll(this.$refs.foods_test,{
		 						click:true
			 				});
						}else{
							this.scroll.refresh();
						}						
					},100)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	//详情页面
	.foodsDetails{
		position:fixed;
		top:0;
		left:0;
		z-index:6;
		width:100%;
		height:100%;
		background-color: white;
		//详情页图片
		.img{
			width:100%;
			height:0;
			padding-bottom: 98%;
			position:relative;
			img{
                position: absolute;
                top: 0;
                left:0;
                width: 100%;
                height: 100%;
            }
		}
		//返回按钮
		.back{
			position: absolute;
			top: 0.4rem;
			left: 0.3rem;
			width: 0.4rem;
			height:0.4rem;
			font-size: 0.4rem;
			color: #fff;
			border-radius: 50%
		}
		//信息标题
		.f-name{
			font-size: 0.24rem;
			position: relative;
			top: -0.36rem;
			left: 0.36rem;
		}
		// 内容
		.foodContent{
			position: relative;
			font-size: 0.2rem;
			color:rgb(147,153,159);
			width:84%;
			padding-left: 0.36rem;
			padding-right: 0.36rem;
			top:-0.2rem;
			// 销售数量
			.f-sell{
				display: inline-block;
				margin-right: 0.1rem;
				margin-bottom: 0.18rem;
			}
			// 现价
			.f-price{
				font-size: 0.28rem;
                color:red;
                span{
					font-size: 0.14rem;
				}
			}
			// 原价
			.f-oldprice{
				text-decoration: line-through;
                font-size: 0.2rem;
                color:#8b9298;
				span{
					font-size: 0.1rem;
				}
			}
			// 加入购物车
			.buy{
				width: 1.5rem;
				height: 0.4rem;
				color:white;
				text-align: center;
				line-height: 0.4rem;
				border-radius: 0.2rem;
				background: #00a0dc;
				right:0rem;
				position: absolute;
				bottom: 10px;
				z-index: 6;
			}

		}
		//商品介绍
		.f-info{
			width: 100%;
			padding-bottom: 0.26rem;
			.f-infos{
				display: block;
				font-size: 0.2rem;
				padding-left:0.36rem;
				padding-right: 0.36rem;
				margin-top: -0.28rem;
				line-height: 0.48rem;
				color: rgb(104,101,116);
			}
		}
		//商品评价
		.r-ratings{
			font-size: 0.18rem;
			position: relative;
			top:-0.72rem;
			padding-top: 0.32rem;
			padding-left: 0.36rem;
			padding-bottom: 0.32rem;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			.r-time,.r-user,.buzan{
				color:rgb(147,153,159);
			}
			
			.r-user{
				position: absolute;
				top:0.24rem;
				right: 0.36rem;				
				.r-username{
					display: inline-block;
				}
				.r-avatar{
					width: 0.36rem;
					vertical-align: middle;
					margin-left: 0.1rem;
					border-radius: 50%;
				}
			}
			//评价详细内容
			.r-content{
				margin-top: 0.12rem;
				.zan{
					color: #00a0dc;
				}
				.r-contents{
					margin-left: 0.08rem;
				}
			}
		}
	}
	//空白间隙
	.space{
		height:0.2rem;
		margin:0;
		padding:0;
	}
</style>