import Vue from 'vue'
import { hideAllModule } from '../components/module/module.bus'

Vue.directive('move', {
	bind: function (el, binding, vnode) {
		const target = binding.value.dom;	//DOM元素
		if (binding.value.allowMove) {
			el.onmousedown = (e) => {
				hideAllModule();
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
	},
	componentUpdated: function (el, binding, vnode) {
		const target = binding.value.dom;	//DOM元素
		if (binding.value.allowMove) {
			el.onmousedown = (e) => {
				hideAllModule();
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
		} else {
			el.onmousedown = null;
		}
	},
	unbind: function (el, binding, vnode) {
		el.onmousedown = null;
	}
})
