import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './base.css'
import './assets/iconfont/iconfont.css'

Vue.use(require('vue-moment'));
Vue.directive('drag', {
	inserted: function (el,binding,vnode) {
		const target = binding.value.move;
		el.onmousedown = (e) => {
			//算出鼠标相对元素的位置
			let disX = e.clientX - target.offsetLeft;
			let disY = e.clientY - target.offsetTop;

			document.onmousemove = (e)=>{
				//用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
				let left = e.clientX - disX;
				let top = e.clientY - disY;

				//移动当前元素
				target.style.left = left + 'px';
				target.style.top = top + 'px';
			};
			document.onmouseup = (e) => {
				document.onmousemove = null;
				document.onmouseup = null;
			};
		};
	}
})

Vue.config.devtools = true;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
})
