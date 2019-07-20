import Vue from 'vue'
import Vuex from 'vuex'
import defaultStyle from '@/config/explorer'

Vue.use(Vuex)
const winStyle = localStorage.getItem('style') || defaultStyle;


export default new Vuex.Store({
	state: {
		style: {
			...winStyle
		},
		count: 0,
	},
	mutations: {
		increment(state) {
			state.count++
		},
		layoutChange(state){
			console.log(22222);
			console.log(state.style);
		}
	}
})
