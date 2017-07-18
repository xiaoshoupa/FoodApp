<template>
	<div class="ratingBtn">
		<!-- 按钮box -->
		<div class="ratBtns">
			<!-- 全选按钮 -->
			<span class="ratBtn all" @click="selectR(2,rating,'all')" :class="{'active':flag1}">{{btnText[0]}}
				<!-- 按钮内部数据 -->
				<span class="ratCount" v-for="(v,k) in rating" v-if="k==0">{{rating.length}}</span>
			</span>
			<!-- 好评按钮 -->
			<span class="ratBtn positive" @click="selectR(0,rating,'good')" :class="{'active':flag2}">{{btnText[1]}}
				<!-- 按钮内部数据 -->
				<span class="ratCount" v-for="(v,k) in rating" v-if="k==0">{{rating | good}}</span>
			</span>
			<!-- 差评按钮 -->
			<span class="ratBtn negative" @click="selectR(1,rating,'bad')" :class="{'active1':flag3}">{{btnText[2]}}
				<!-- 按钮内部数据 -->
				<span class="ratCount" v-for="(v,k) in rating" v-if="k==0">{{rating | bad}}</span>
			</span>
		</div>
		<!-- 只查看内容 -->
		<div class="check" :class="{'active':blue==true}">
			<!-- 触发事件盒子 -->
			<div class="check-box" @click="change1(rating)" :class="{'active':blue==true}">
				<!-- 图标 -->
				<span class="icon-check_circle checks"></span>
				<!-- 文字 -->
				<span class="check-font">只看有内容评价</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		props:{
			rating:{
				type:Array
			}
		},
		data(){
			return {
				blue:false,//只查看内容标志
				flag1:true,//全选标志
				flag2:false,//满意标志
				flag3:false//差评标志
			}
		},
		created(){
			this.$nextTick(() => {
				setTimeout(()=>{
					this.$store.dispatch('selectType',2);//默认全选
					this.$store.dispatch('selectR',this.rating);//初始化数据
				},100);
			})
		},
		methods:{
			change1(rating){
				this.blue=!this.blue;
				this.$store.dispatch('onlyContent');
				this.$store.dispatch('selectR',rating);
			},
			//控制点选按钮样式动态改变
			selectR(type,rating,icon){
				//全选
				if(icon=='all'){
					this.flag1=true;
					this.flag2=false;
					this.flag3=false;
					if(this.flag2==false&&this.flag3==false){
						//选中时重新获取数据
						if(this.flag1){
								this.$store.dispatch('selectType',type);			
								this.$store.dispatch('selectR',rating);
						}
						return;
					}
				}
				//好评
				if(icon=='good'){
					this.flag1=false;
					this.flag2=true;
					this.flag3=false;
					if(this.flag1==false&&this.flag3==false){
						if(this.flag2){
								this.$store.dispatch('selectType',type);			
								this.$store.dispatch('selectR',rating);
						}
						return;
					}
				}
				//差评
				if(icon=='bad'){
					this.flag1=false;
					this.flag2=false;
					this.flag3=true;
					if(this.flag1==false&&this.flag2==false){
						if(this.flag3){	
							this.$store.dispatch('selectType',type);					
							this.$store.dispatch('selectR',rating);
						}
						return;
					}	
				}

			}
		},
		filters:{
			//好评数量过滤
			good:(data)=>{
				let l=0;
				for(var i=0;i<data.length;i++){
					if(data[i].rateType==0){
						l++;
					}
				}
				return l;
			},
			//差评数量过滤
			bad:(data)=>{
				let l=0;
				for(var i=0;i<data.length;i++){
					if(data[i].rateType==1){
						l++;
					}
				}
				return l;
			},

		},
		computed:{
			...mapGetters([
				'btnText'
			])
		}
	}	
</script>

<style lang="less" scoped>
	.ratingBtn{
		padding-left:0.36rem;
		position: relative;
		top:-0.78rem;
		//按钮box
		.ratBtns{
			padding-bottom:0.18rem;
			margin-right: 0.36rem;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			//单个按钮样式
			.ratBtn{
				display: inline-block;
				width:1rem;
				height: 0.46rem;
				font-size:0.2rem;
				text-align:center;
				line-height: 0.46rem;
				border-radius:0.06rem;
				//按钮内数据
				.ratCount{
					font-size:0.16rem;
				}
				//全部
				&.all{
					color: #4d555d;
					background:rgba(0,160,220,0.2);
				}
				//好评
				&.positive{
					color: #4d555d;
					background:rgba(0,160,220,0.2);
				}
				//差评
				&.negative{
					background: rgba(77,85,93,0.2);
				}
				//全选与好评选中状态
				&.active{
					color:#fff;
					background: #00a0dc;
				}
				//差评选中状态
				&.active1{
					color: white;
					background: #4d555d;
				}
			}
		}
		//只看有内容评价
		.check{
			color: rgb(147,153,159);
			margin-right: 0.36rem;
			height:0.6rem;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			// 触发事件盒子
			.check-box{
				height:0.6rem;
				width:2.2rem;
				//图标
				.checks{
					position: relative;
					top: -0.36rem;
					font-size: 0.36rem;
				}
				//文字
				.check-font{
					position: relative;
					left:-0.16rem;
					top: -0.44rem;
					font-size: 0.22rem;
				}
				//选中状态
				&.active{
					color: #00c850;
				}
			}
			
		}
	}
</style>