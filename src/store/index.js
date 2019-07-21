import Vue from 'vue'
import Vuex from 'vuex'
import defaultStyle from '@/config/explorer'

import time from '@/store/modules/time'
import network from '@/store/modules/network'

Vue.use(Vuex)
const config = localStorage.getItem('config') || defaultStyle;

time.update.callback = function (time) {
	store.commit('updateTime',time)
}

network.update.callback = function (status) {
	store.commit('updateNetwork',status)
}

const store = new Vuex.Store({
	state: {
		style: {
			...config
		},
		curTime: time.value,	//当前时间
		network: network.value,	//网络状态
	},
	mutations: {
		updateTime(state,time){
			state.curTime = time;
		},
		updateNetwork(state,status){
			state.network = status;
		}
	}
})

export default store
