<template>
	<div class="goods">
		<!-- 左侧菜单 -->
		<div class="menu-wrapper">
			<ul>
				<li v-for="(item,k) in goods" :class = "{'current' : currentIndex === k,'currentBorder':currentIndex+1 === k}"  @click="change(k,goods.length,$event)" class="menuList">
					<div class="noborder">
						<!-- 图标 -->
						<img src="../../../static/images/rexiao.png" height="16" width="16" v-if="k==0" style="margin-top:0.34rem;">
						<img src="../../../static/images/tuijian.png" height="14" width="14" v-if="k==1" style="margin-top:0.38rem;">
						<img src="../../../static/images/special_2@2x.png" height="14" width="14" v-if="k==2">
						<span >
							{{item.name}}
						</span>
					</div>	
				</li>
				<!-- 底部留白 -->
				<li class="menuList"><br><br><br><br></li>
			</ul>
		</div>
		<!-- 右侧食物清单 -->
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="foodList">
					<div class="foods-title"><span>{{item.name}}</span></div>
					<ul>
						<li v-for="(food,k) in item.foods" class="foods-body" @click="getFoods(food)">
							<img :src="food.icon" class="f-img">
							<div class="f-div">
								<span class="f-name">{{food.name}}</span>
								<span class="f-description">{{food.description}}</span>
								<span class="f-sell">月售{{food.sellCount}}份</span>
								<span class="f-rating">好评率{{food.rating}}%</span>
								<div>
									<span class="f-price"><span>&yen;</span>{{food.price}}</span>
									&nbsp;<span v-if="food.oldPrice!=''" class="f-oldprice"> <span>&yen;</span>{{food.oldPrice}}</span>
								</div>
								<!-- 数量 -->
								<div class="food-count">
									<count :food="food"></count>
								</div>
							</div>
						</li>
					</ul>
				</li>
				<li class="foodList"><br></li>
			</ul>
		</div>
		<foodsDetails></foodsDetails>	
	</div>
	
</template>

<script>
	import {mapGetters} from 'vuex'
	import count from '../count/count.vue'
	import foodsDetails from '../foodsDetails/foodsDetails.vue'
	export default {
		created(){
			this.$store.dispatch('getGoods').then(()=>{		
			});
		},
		data(){
			return {
				count:0,
				heightList:[],
				scrollY:0,
			}
		},
		components:{
			count,
			foodsDetails
		},
		watch: {
			goods(){
				this.$nextTick(()=>{
					this.loadDatas();
					this.heightInit()
				});
			}
		},
		computed:{
			...mapGetters([
				'goods'
			]),
			//判断当前高度与初始化高度
			currentIndex(){
				var menuList=document.getElementsByClassName('menuList');
				for ( let i = 0 ; i < this.heightList.length ; i++){
					let h1 = this.heightList[i];
					let h2 = this.heightList[i+1];
					if ( this.scrollY >= h1 && this.scrollY < h2){
						this.menuScroll.scrollToElement(menuList[i-1],300);
						return i;
					}
				}
				return 0
			}
		},
		methods:{
			// 初始化数据
			loadDatas(){
				this.menuScroll=new BScroll(document.getElementsByClassName('menu-wrapper')[0],{
					click:true
				});
				this.foodsScroll=new BScroll(document.getElementsByClassName('foods-wrapper')[0],{
					probeType:3,
					click:true
				});
				//获取当前高度
				 this.foodsScroll.on('scroll',(pos) => {             
                    // 绝对值取整
                    this.scrollY = Math.abs(Math.round(pos.y));

                })
			},
			//初始化高度
			heightInit(){
				var foodsList=this.$refs.foodsWrapper.getElementsByClassName("foodList");
				let heights=0;
				this.heightList.push(heights);
				for(var i =0;i<foodsList.length;i++){
					heights+=foodsList[i].clientHeight;
					this.heightList.push(heights);
				}
			},
			//左侧点击滚动
			change(k,l,e){
				
				// 判断元素是否存在
				 if( !e._constructed){
                    return;
                }
                let foodsList = this.$refs.foodsWrapper.getElementsByClassName('foodList');
                let el = foodsList[k];
                this.currentIndex=k;
                this.foodsScroll.scrollToElement(el,300);
			},
			//获取详情页
			getFoods(food){
				this.$store.dispatch('changeBtnText');
				this.$store.dispatch('getFoods',food);
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.goods{
		display: flex;
		position: absolute;
		top:3.2rem;
		bottom: 0rem;
		overflow: hidden;
		width: 100%;
		// 左侧菜单
		.menu-wrapper{
			flex:0 0 1.6rem;
			width: 1.6rem;
			font-size: 0.2rem;
			background-color: #f3f5f7;
			text-align: center;
			color: #7e8c8d;
			li{
				width: 100%;
				margin: 0 auto;
				line-height: 0.3rem;
				
				// 菜单文字
				div{
					display: table;
					width: 1.12rem;
					margin: 0 auto;
					border-top: 1px solid rgba(7,17,27,0.1);
					span{
					height: 1rem;
					display: table-cell;
					vertical-align: middle;
						
					}
					img{
						margin-top: 0.24rem;
					}
				}
				//当前选中样式
				&.current{
					color: #ff7300;
					background-color: white;	
					border-top:none;
					position:relative;
					z-index:777;
					div{
						border-top:none;
						span{
						}
					}

				}
				&.currentBorder{
					div{
						border-top:none;
						span{
						}
					}
				}				
			}
			li:last-child{
				div{

				border-bottom: 1px solid rgba(7,17,27,0.1);
				}
			}
		}
		// 右侧食物清单
		.foods-wrapper{
			flex:1;
			width: 100%;
			//食物类别
			.foods-title{
				width: 100%;
				height: 0.42rem;
				line-height: 0.42rem;
				padding-left: 0.12rem;
				border-left: 0.06rem solid #d9dde1;
				font-size: 0.22rem;
				background-color: #f3f5f7;
				color: rgb(147,153,159);
				
			}
			// 食物主体内容
			.foods-body{
				display: flex;
				margin: 0.32rem;
				font-size: 0.18rem;
				color:rgb(147,153,159);
				border-bottom: 1px solid rgba(7,17,27,0.1);
				padding-bottom: 0.32rem;
				position: relative;
				// 食物图片
				.f-img{
					width:0.9rem;
					height:0.9rem;
				}
				// 食物描述性文字
				.f-div{
					flex:1;
					margin-left: 0.2rem;
					line-height: 0.32rem;
					.f-name{
						color:rgb(7,17,27);
						font-size: 0.23rem;
						margin-top: 0.04rem;
						display: block;
					}
					.f-description{
						width:2rem;
						overflow: hidden;
						white-space: nowrap;
    					text-overflow: ellipsis;
						display: block;
					}
					.f-sell{
						display: inline-block;
						margin-right: 0.1rem;
					}
					.f-price{
						font-size: 0.28rem;
                        color:red;
                        span{
							font-size: 0.14rem;
						}
					}
					.f-oldprice{
						text-decoration: line-through;
                        font-size: 0.2rem;
                        color:#8b9298;
						span{
							font-size: 0.1rem;
						}
					}
					.food-count{
						margin-top: -0.06rem;
					}
					
				}	
			}
			// 食物最后一个留白
			.foods-body:last-child{
				border:none;
				padding-bottom: 0;
				.f-click{
					bottom: -0.1rem;
				}
			}
		}
	}
	
</style>