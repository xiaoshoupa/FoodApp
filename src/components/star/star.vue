<template>
	<div class="star">
		<!-- 循环输出星星 -->
		<span :class="v" v-for="v in starList" class="stars"></span>
	</div>
</template>
<script>
	export default {
		props:['score','size'],
		created(){
			this.$nextTick(()=>{
				setTimeout(()=>{
					this.initStar();
				},10);
			})
		},
		data(){
			return {
				starList:[],
				starLength:5
			}
		},
		methods:{
			initStar(){
				this.starList=[];
				var onstar=Math.floor(this.score);//获取整数
				var half=this.score-onstar;//获取小数
				// 输出整颗
				for(var i=0;i<this.starLength;i++){
					if(i<=onstar-1){
						this.starList.push('on '+this.size);
					}
				}
				// 输出半颗
				if(half>=0.5){
					this.starList.push('half '+this.size);
				}
				// 不足补全空心
				if(this.starList.length<this.starLength){
					let offlength=this.starLength-this.starList.length;
					for(var i =0;i<offlength;i++){
						this.starList.push('off '+this.size);
					}
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.stars{
		display: inline-block;
		background-size: cover;
		width: 0.42rem;
		height: 0.42rem;
		vertical-align:bottom;
		// 整颗
		&.on{
			background-image: url('../../../static/images/star36_on@2x.png');
		}
		// 半颗
		&.half{
			background-image: url('../../../static/images/star36_half@2x.png');
		}
		// 空心
		&.off{
			background-image: url('../../../static/images/star36_off@2x.png');
		}
		// 大小控制
		&.big{
			width: 0.32rem;
			height: 0.32rem;
			margin-right:0.16rem;
		}
		&.small{
			width: 0.24rem;
			height: 0.24rem;
			margin-right:0.1rem;
			margin-top:-0.02rem;
		}
		&.mini{
			width: 0.18rem;
			height: 0.18rem;
			margin-right:0.08rem;
		}

	}
</style>