import types from '../types.js'
import axios from 'axios'

const state={
	seller:{},
	detailShow:false,
}

const getters={
	seller(state){
		return state.seller;
	},
	detailShow(state){
		return state.detailShow;
	}
}

const actions={
	// 初始化数据
	getSeller({commit,state}){
		axios.get('/api/seller').then(resp => {
			if(resp.data.error==0){
				commit(types.GET_SELLER,resp.data.data);
			}
		});
	},
	// 显示详情页
	showDetail({commit}){
		commit(types.SHOW_DETAIL);
	},
	// 
	closeDetail({commit}){
		commit(types.SHOW_DETAIL);
	}
}

const mutations={
	[types.GET_SELLER](state,data){
		state.seller=data;
	},
	[types.SHOW_DETAIL](state){
		state.detailShow=!state.detailShow;
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}