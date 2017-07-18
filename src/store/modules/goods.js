import types from '../types.js'
import axios from 'axios'

const state={
	goods:[]
}

const getters={
	goods(state){
		return state.goods;
	}
}

const actions={
	// 初始化数据
	getGoods({commit,state}){
		axios.get('/api/goods').then(resp => {
			if(resp.data.error==0){
				commit(types.GET_GOODS,resp.data.data);
			}
		});
	}
}

const mutations={
	[types.GET_GOODS](state,data){
		state.goods=data;
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}