
export default {
	namespaced: true,
	state: {
		list: [{
			name: 'network',
			status: navigator.onLine, //当前网络状态
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
	},
	actions: {
		updateNetworkStatus ({ state,commit },status) {
			// commit('updateNetworkStatus', status == true ? 1 : 2);
			state.list.find(item => item.name === 'network').status = status == true ? 1 : 2;
		},
	},
}
