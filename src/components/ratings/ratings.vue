<template>
	<div class="ratings" ref="ratingTest">
		<div class="rating-body">
			<!-- 评分 -->
			<div class="mark">
			<!-- 综合评分 -->
				<div class="mark-left">
				<!-- 总分 -->
					<span>{{seller.score}}</span>
					<span>综合评分</span>
					<span>高于周边商家{{seller.rankRate}}%</span>
				</div>
			<!-- 细节评分 -->
				<div class="mark-right">
					<div class="mark-box">
						<span class="mark-title">服务态度</span>
						<star :score="seller.serviceScore" :size="size1" style="margin-top:-0.02rem;"></star>
						<span class="mark-score">{{seller.serviceScore}}</span>
					</div>
					<div class="mark-box">
						<span class="mark-title">商品评价</span>
						<star :score="seller.foodScore" :size="size1" style="margin-top:-0.02rem;"></star>
						<span class="mark-score">{{seller.foodScore}}</span>
					</div>
						<span class="mark-time">送达时间</span>
						<span class="mark-time2">{{seller.deliveryTime}}分钟</span>
				</div>
			</div>
			<splits></splits>
			<!-- 评价按钮 -->
			<div class="rating-btn">
				<ratingBtn :rating="sellerRating"></ratingBtn>
			</div>
			<!-- 评价内容 -->
			<div class="r-content" >
				<!-- 所有评价 -->
				<ul>
					<li v-for="v in ratingList"  class="r-content-li">
						<!-- 头像 -->
						<img :src="v.avatar" class="r-content-li-avatar">
						<!-- 用户名 -->
						<div class="r-content-li-username">
							<span>{{v.username}}</span>
							<star :score="v.score" :size="size2"></star>
							<span class="r-content-li-username-time">{{v.deliveryTime}}<span v-if="v.deliveryTime==''">- -</span> 分钟送达</span>	
						</div>
						<!-- 送达时间 -->
						<span class="r-time">{{v.rateTime | date}}</span>
						<!-- 文字 -->
						<div class="r-content-li-text">
							<span>{{v.text}}</span>
							<span v-if="v.text==''&&v.rateType==0">默认好评!</span>
							<span v-if="v.text==''&&v.rateType==1">默认差评!</span>
							<br>
							<span class="icon-thumb_up zan" v-show="v.rateType==0"></span>
							<span class="icon-thumb_down buzan" v-show="v.rateType==1"></span>
							<span class="r-recommend" v-if="k<4" v-for="(v,k) in v.recommend">{{v}}</span>
						</div>
					</li>
				</ul>
				<div class="space"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import star from '../star/star.vue'
	import splits from '../slipts/slipts.vue'
	import ratingBtn from '../ratingBtn/ratingBtn.vue'
	export default {
		computed:{
			...mapGetters([
				'seller',
				'sellerRating',
				'ratingList',
			])
		},
		components:{
			star,
			splits,
			ratingBtn
		},
		data(){
			return {
				size1:'small',
				size2:'mini',
			}
		},
		created(){
				this.$nextTick(()=>{
				this.$store.dispatch('getRatings');
			})			
  		},
		filters:{
			date:(data)=>{
				let d=new Date(data);
				return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+":"+d.getMinutes()+':'+d.getSeconds();
			}
		},
		watch:{
			ratingList(){
				this.$nextTick(()=>{
					setTimeout(()=>{
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.ratingTest,{
				 				click:true
							});
						}else{
							this.scroll.refresh();
						}
					},1000)
				})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.ratings{
		height: 100%;
			width: 100%;
			position: fixed;
			overflow: hidden;
		//评分
		.mark{
			width: 100%;
			display: flex;
			margin-bottom: 0.36rem;
			margin-top: 0.3rem;
			//综合评分box
			.mark-left{
				border-right:1px solid rgba(7,17,27,0.1);
				text-align: center;
				width:2.45rem;
				span:nth-child(1){
					display:block;
					font-size: 0.4rem;
					padding-top:0.02rem;
					color:rgb(255,153,0);
				}
				span:nth-child(2){
					display:block;
					font-size: 0.2rem;
					color:rgb(7,17,27);
					margin: 0.12rem 0 0.16rem 0;
				}
				span:nth-child(3){
					display:block;
					font-size: 0.18rem;
					color: rgb(147,153,159);
				}

			}
			//其它评分
			.mark-right{
				flex:1;
				width:4.74rem;
				font-size:0.2rem;
				padding-top:0.02rem;
				.mark-box{
					display: flex;
					padding-right: 0.4rem;
					//名称
					.mark-title{
						flex:1;
						display:block;
						line-height: 0.32rem;
						text-align:center;
						margin-bottom:0.16rem;
						margin-top: -0.05rem;
					}
					//分数
					.mark-score{
						color: rgb(255,153,0);
						display: inline-block;
						margin-left: 0.12rem;
						margin-top: 0.02rem;
					}
				}
				//送达时间
				.mark-time{
					display:inline-block;
					margin-left: 0.3rem;
				}
				.mark-time2{
					display:inline-block;
					margin-left: 0.26rem;
					color:rgb(147,153,159);
				}
			}
		}
		// 评价按钮
		.rating-btn{
			margin-top:0.52rem;
		}
		//评价内容
		.r-content{
			margin-left: 0.4rem;
			margin-right: 0.36rem;
			margin-top: -0.88rem;		
			.r-content-li{
				display: block;
				position: relative;
				padding-right: 0.36rem;
				width: 90%;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.r-content-li-avatar{
					width: 0.46rem;
					border-radius: 50%;
					position:relative;
					top:-0.1rem;
				}
				.r-content-li-username{
					display:block;
					font-size: 0.18rem;
					position: absolute;
					top:0.3rem;
					left: 0.68rem;
					width: 2.4rem;
					line-height: 0.22rem;
					.r-content-li-username-time{
						position: absolute;
						top:0.26rem;
						right: 0rem;
						color: rgb(147,153,159);
					}
				}
				// 评价时间
				.r-time{
					font-size: 0.18rem;
					position: absolute;
					display: block;
					right: 0;
					top:0.44rem;
					margin-top: -0.1rem;
					color: rgb(147,153,159);
				}
				.r-content-li-text{
					font-size: 0.2rem;
					line-height: 0.32rem;
					position: relative;
					left: 0.68rem;
					color: rgb(7,17,27);
					width: 90%;
					margin-top: -0.1rem;
					margin-bottom: 0.24rem;
					// 好评标志
					.zan{
						display: inline-block;
						margin-top: 0.1rem;
						color: #00a0dc;
					}
					// 差评标志
					.buzan{
						display: inline-block;
						margin-top: 0.1rem;
						color:rgb(147,153,159);
					}
					.r-recommend{
						display: inline-block;
						font-size: 0.18rem;
						max-width: 1rem;
						height: 0.36rem;
						text-align: center;
						position: relative;
						top:0.1rem;
						left: 0.1rem;
						margin-right: 0.1rem;
						padding-left: 0.04rem;
						padding-right: 0.04rem;
						line-height: 0.36rem;
						color: rgb(147,153,159);
						border: 1px solid rgba(7,17,27,0.1);
						overflow: hidden;
						white-space: nowrap;
	    				text-overflow: ellipsis;
					}
				}
			}
			.space{
				padding-bottom:5rem;
			}
		}
	}
</style>