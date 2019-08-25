import Vue from 'vue'
import Vuex from 'vuex'

import style from "./modules/style";
import time from "./modules/time.js";
import taskIcon from './modules/taskIcon'
Vue.use(Vuex)


const store = new Vuex.Store({
	modules: {
		style,
		time,
		taskIcon,
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
