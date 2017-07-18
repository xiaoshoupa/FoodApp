import types from '../types.js'
import axios from 'axios'
const state = {
	foodShow:false,
	food:{},
	btnText:["全部","满意","不满意"],
	onlyContent:false,
	ratingList:[],
	selectType:2,
	sellerRating:[]
}

const getters = {
	foodShow(state){
		return state.foodShow;
	},
	food(state){
		return state.food;
	},
	onlyContent(state){
		return state.onlyContent;
	},
	ratingList(state){
		return state.ratingList;
	},
	sellerRating(state){
		return state.sellerRating;
	},
	btnText(state){
		return state.btnText;
	}
}

const actions = {
	getFoods({commit,state},food){
		commit(types.SHOW_FOOD,food);
	},
	//是否有内容
	onlyContent({commit,state}){
		commit(types.ONLY_CONTENT);
	},
	//筛选
	selectR({commit,state},rating){
		commit(types.SHOW_RATING,rating);
	},
	//筛选类型
	selectType({commit,state},stype){
		commit(types.SELECT_TYPE,stype);
	},
	//初始化数据
	getRatings({commit,state}){
		axios.get('/api/ratings').then(resp => {
			if(resp.data.error==0){
				commit(types.GET_RATINGS,resp.data.data);
			}
		});
	},
	// 改变筛选按钮文字
	changeBtnText({commit,state}){
		commit(types.BTNTEXT_CHANGE);
	}
}

const mutations = {
	//显示隐藏
	[types.SHOW_FOOD](state,food){
		state.foodShow=!state.foodShow;
		state.food=food;
		state.ratingList = food.ratings;
	},
	//是否有内容
	[types.ONLY_CONTENT](state){
		state.onlyContent=!state.onlyContent;
	},
	//筛选
	[types.SHOW_RATING](state,rating){
		let listTemp=[];//临时数组用做筛选
		//全选
		if(state.selectType==2){
			listTemp=rating;
		}
		//满意或不满意
		if(state.selectType==0||state.selectType==1){
			for(var i=0;i<rating.length;i++){
				if(rating[i].rateType==state.selectType){
					listTemp.push(rating[i]);
				}
			}
		}
		//是否有内容
		if(state.onlyContent){
			state.ratingList=listTemp.filter(list=>{
				return list.text!="";
			})
		}else{
			state.ratingList=listTemp;
		}

	},
	//筛选类型
	[types.SELECT_TYPE](state,type){
		state.selectType=type;
	},
	//初始化数据
	[types.GET_RATINGS](state,data){
		state.sellerRating=data;
		state.ratingList=data;
		state.btnText=["全部","满意","不满意"];
	},
	//改变按钮文字
	[types.BTNTEXT_CHANGE](state){
		state.btnText=['全部','推荐','吐槽'];
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}