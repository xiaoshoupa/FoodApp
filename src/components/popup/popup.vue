<template>
	<!-- 弹窗动画 -->
	<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<!-- 弹窗背景 -->
		<div class="popup" v-show="flags">
			<!-- 弹窗主体 -->
			<div class="popup-box">
				<!-- 弹窗文字 -->
				<span v-if="icon=='car'">您确定清空购物车吗？</span>
				<span v-if="icon=='end'">本次消费:{{end}}元</span>
				<!-- 弹窗按钮 -->
				<div class="popup-box-btn">
					<span @click="clean" v-if="icon=='car'">确定</span>
					<span @click="back" v-if="icon=='car'">取消</span>
					<span @click="clean" v-if="icon=='end'" style="flex:1">确定</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default	{
		props:['flags','foods','icon'],
		methods:{
			// 清空
			clean(){	
				this.foods.forEach(food => {
					food.count=0;
				});
				this.$emit('hide',false);
			},
			// 返回
			back(){
				this.$emit('hide',false);
			}
		},
		computed:{
			// 累积消费
			end(){
				let allMoney=0;
				this.foods.forEach(food =>{
					allMoney+=food.count*food.price;
				})
				return allMoney;
			}
		}
	}
</script>

<style lang="less" scoped>
	.popup{
		width:100%;
		height:11.4rem;
		background: rgba(7,17,27,0.9);
		position: absolute;
		z-index: 999;
		top:-10.6rem;
		// 弹窗背景
		.popup-box{
			width: 4.2rem;
			height: 2.2rem;
			margin:0 auto;
			margin-top: 74%;
			text-align: center;
			font-size:0.28rem;
			line-height: 1.4rem;
			border-top-left-radius: 0.4rem;
			border-top-right-radius: 0.4rem;
			background: white;
			position:relative;
			// 弹窗按钮
			.popup-box-btn{
				width:100%;
				height:0.8rem;
				position:absolute;
				bottom:0;
				border-top:1px solid #ccc;
				display:flex;
				span{
					display: inline-block;
					width:2.4rem;
					height:0.8rem;
					line-height:0.9rem;
				}
				span:last-child{
					border-left: 1px solid #ccc;
				}
			}
		}
	}
</style>