import Vue from 'vue'
import Vuex from 'vuex'

import style from "./modules/style";
import time from "./modules/time";
import taskIcon from './modules/taskIcon';
import appTaskManage from "./modules/appTaskManage";
Vue.use(Vuex)


const store = new Vuex.Store({
	modules: {
		style,
		time,
		taskIcon,
		appTaskManage,
	}
})

//网络监听
!function () {
	window.addEventListener("online", function () {
		//网络在线
		store.dispatch('taskIcon/updateNetworkStatus',true);
	})

	window.addEventListener("offline", function () {
		//网络离线
		store.dispatch('taskIcon/updateNetworkStatus',false);
	})
}();



export default store
