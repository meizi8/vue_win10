import Vue from 'vue'
import Vuex from 'vuex'
import defaultStyle from '@/config/explorer'

import time from '@/store/modules/time'
import network from '@/store/modules/network'

Vue.use(Vuex)
const config = localStorage.getItem('config') || defaultStyle;

time.update.callback = function (time) {
	store.commit('updateTime', time)
}

network.update.callback = function (status) {
	store.commit('updateNetwork', status)
}

const store = new Vuex.Store({
	state: {
		style: {
			...config
		},
		taskIcon: [{
			name: 'network',
			status: network.value == true ? 1 : 2, //当前状态
			iconfont: true, //是否字体图标
			multimode: [{ //打开状态
				status: 1,
				className: 'iconfont icon-network'
			}, { //关闭状态
				status: 2,
				className: 'iconfont icon-network-error'
			}]
		}, {
			name: 'sound',
			status: 1,
			iconfont: true,
			multimode: [{
				status: 1,
				className: 'iconfont icon-vocal'
			}, {
				status: 2,
				className: 'iconfont icon-mute'
			}]
		}], //任务栏小图标
		curTime: time.value, //当前时间
		network: network.value, //网络状态
	},
	mutations: {
		updateTime(state, time) {
			state.curTime = time;
		},
		updateNetwork(state, status) {
			const network = state.taskIcon.find(item => item.name == 'network');
			network.status = status == true ? 1 : 2;
		}
	}
})

export default store
