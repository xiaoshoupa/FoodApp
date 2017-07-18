import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import seller from './modules/seller'
import goods from './modules/goods'
import ratings from './modules/ratings'

Vue.use(Vuex);

export default new Vuex.Store({
	getters,
	actions,
	modules:{
		seller,
		goods,
		ratings
	}
});
