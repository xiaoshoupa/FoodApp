<template>
		<div class="shopcar">
			<div class="shopcar-icon" :class="{'active':counts!=''}" @click="showShopDetail">
				<!-- 购物车图标 -->
				<span class="icon-shopping_cart icon"></span>
				<!-- 物品数量 -->
				<div class="shopcar-counts" v-show="counts!=''">
					{{counts}}
				</div>
			</div>
			<!-- 金额 -->
			<span class="shopcar-money" :class="{'active':allMoney>0}">&yen; {{allMoney}}</span>
			<!-- 配送费 -->
			<span class="shopcar-deliveryPrice">另需配送费{{seller.deliveryPrice}}元</span>

			<!-- 起送 -->
			<div class="shopcar-minPrice" :class="{'active':minPrice=='结算'}" @click="end">
				<span>{{minPrice}}</span>
			</div>
			<!-- 详情页 -->
			<transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
				<div class="shopcar-details-box" v-if="flag">
					<div class="shopcar-details">
						<!-- 购物车 -->
						<div class="shopcar-details-title">购物车
							<span class="shopcar-details-clean" @click="clean">清空</span>
						</div>
						<div ref="shopcar" style="max-height:3.6rem;">
							<ul>
								<li v-for="v in foodList" class="shopcar-details-li">{{v.name}}
									<span class="shopcar-details-li-money"> <span>&yen;</span> {{v.price*v.count}}</span>
									<div class="shopcar-details-li-count">
										<count :food="v"></count>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</transition>
			<!-- 弹窗 -->
			<popup :flags="flag2" :foods="foodList" @hide="changeFlag" :icon="icon"></popup>
		</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	import count from '../count/count.vue'
	import popup from '../popup/popup.vue'
	export default {
		computed:{
			...mapGetters([
				'goods',
				'seller'
			]),
			foodList(){
				let foodList=[];
				this.goods.forEach(good =>{
					good.foods.forEach(food=>{
						if(food.count>0){
							foodList.push(food);
						}
					})
				})
				return foodList;
			},
			counts(){
				let counts=0;
				this.foodList.forEach(food =>{
					counts+=food.count;
				})
				return counts;
			},
			allMoney(){
				let allMoney=0;
				this.foodList.forEach(food =>{
					allMoney+=food.count*food.price;
				})
				return allMoney;
			},
			minPrice(){
				let str='';
				if(this.counts!=0){
					if(this.allMoney<this.seller.minPrice){
						str="还差￥"+(this.seller.minPrice-this.allMoney)+"";
					}else{
						str="结算";
					}
				}else{
					str='￥'+this.seller.minPrice+"元起送";
				}
				return str;
			}
		},
		components:{
			count,
			popup
		},
		watch:{
			counts(){
				if(this.counts==0){
					setTimeout(()=>{
						this.flag=false;
					}, 100);
				}
				setTimeout(()=>{
					if(this.scroll){
						this.scroll.refresh();
					}
				},100)
			}
		},
		data(){
			return {
				flag:false,
				flag2:false,
				icon:'car'
			}
		},
		methods:{
			showShopDetail(){	
				if(this.counts==''){
					return;
				}else{
					setTimeout(()=>{
						this.flag=!this.flag;
						if(this.flag){
							this.$nextTick(() => {
								setTimeout(()=>{
									this.scroll=new BScroll(this.$refs.shopcar,{
										click:true
									});
								}, 1000)
							});
						}
					}, 100);
				}
				
			},
			clean(){
			 	this.icon='car';
			 	this.flag2=true;
			},
			changeFlag(a){
				this.flag2=a;
			},
			end(){
				if(this.minPrice!=="结算"){
					return;
				}else{
					this.flag2=true;
					this.icon='end';
				}
			}
		},
		
	}
</script>

<style lang="less" scoped>
	.shopcar{
		position: fixed;
		bottom:0rem;
		z-index:12;
		width: 100%;
		height: 0.8rem;
		background-color:#141d27;
		.shopcar-icon{
			width:0.7rem;
			height:0.7rem;
			border-radius:50%;
			border:0.16rem solid #141d27;
			position:relative;
			bottom:0.28rem;
			left:0.26rem;
			color:rgba(255,255,255,0.4);
			background-color:#2b343c;
			.icon{
				position:absolute;
				left: 50%;
				top: 50%;
				margin-left:-0.18rem;
				margin-top:-0.18rem;
				font-size: 0.4rem;

			}
			&.active{
				background-color:rgb(0,160,220);
				color:rgba(255,255,255,1);
			}
			.shopcar-counts{
				width: 0.36rem;
				height: 0.36rem;
				border-radius: 50%;
				background-color: #CE0000;
				position: absolute;
				z-index: 2;
				text-align: center;
				line-height: 0.36rem;
				color: white;
				right: -0.16rem;
				top:-0.12rem;
				font-size: 0.24rem;
			}	
		}
		.shopcar-money{
			position:absolute;
			font-size:0.32rem;
			font-weight:700;
			color:rgba(255,255,255,0.4);
			bottom:50%;
			margin-bottom:-0.16rem;
			left:1.6rem;
			display: inline-block;
			padding-right:0.16rem;
			border-right:0.02rem solid rgba(255,255,255,0.1);
			&.active{
				color:white;
			}
		}
		.shopcar-deliveryPrice{
			position:absolute;
			height: 0.32rem;
			display: inline-block;
			font-size:0.2rem;
			font-weight:200;
			color:rgba(255,255,255,0.4);
			bottom:50%;
			margin-bottom:-0.18rem;
			left:2.6rem;
			margin-left: 0.18rem;
			line-height: 0.32rem;
		}
		.shopcar-minPrice{
			position:absolute;
			right: 0;
			width:1.8rem;
			height:0.8rem;
			font-size:0.22rem;
			text-align: center;
			line-height: 0.8rem;
			top:0;
			color:rgba(255,255,255,0.4);
			background-color:rgba(255,255,255,0.1);
			&.active{
				background-color:#00b43c;
				color:rgba(255,255,255,1);
			}
		}
		.shopcar-details-box{
			position: absolute;
			top:-11rem;
			z-index: -1;
			width: 100%;
			height: 11rem;
			background-color: rgba(7,17,27,0.9);
			.shopcar-details{
			    position: absolute;
				bottom:0rem;
				width: 100%;
				font-size: 0.22rem;
				max-height:4.8rem;
				background-color: white;
				overflow: hidden;
				.shopcar-details-title{
					position:fixed;
					width:88%;
					z-index: 2;
					background: #f3f5f7;
    				border-bottom: 1px solid rgba(7,17,27,0.1);
    				padding:0.18rem;
    				padding-left: 0.4rem;
    				padding-right: 0.4rem;
					display: flex;
					color: rgba(7,17,27,0.7);
					justify-content:space-between;
				}
				.shopcar-details-clean{
					color: rgb(0, 160, 220);
				}
				ul{	
					background-color: white;
					padding: 0.36rem;
					padding-top:0.52rem;
					padding-bottom:0;
					padding-right: 0.36rem;
					.shopcar-details-li{
						display: block;
						border-bottom: 1px solid rgba(7,17,27,0.1);
						padding-top: 0.32rem;
						padding-bottom: 0.32rem;
						.shopcar-details-li-count{
							position: relative;
							top:0.28rem;
						}
						.shopcar-details-li-money{
							color: red;
							position: absolute;
							right: 1.8rem;
							font-weight: bold;
							font-size: 0.24rem;
							span{
								font-size: 0.16rem;
							}
						}
					}
				}
			}
		}
	}
	
</style>