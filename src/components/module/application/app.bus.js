import Vue from "vue";
import systemSetting from './systemSetting.vue'

const desktop = function () {
	return document.getElementById('wallpaper');
}

const createVue = function () {
	return new Vue();
};

const systemSettingApp = function () {
	this.isCreate = false;
	this.page = '';
	this.bus = createVue();
	this.vm;
}
systemSettingApp.prototype = {
	create: function () {
		this.bus.$once('destroy', () => {
			this.destroy();
		});
		const systemSettingCur = Vue.extend(systemSetting);
		this.vm = new systemSettingCur({
			data: function () {
				return {
					page: this.page,
					bus: this.bus,
				}
			}.bind(this),
		}).$mount();
		desktop().appendChild(this.vm.$el);
	},
	show: function (option) {
		if (!this.isCreate) {
			this.create();
			this.isCreate = true;
		}
		this.bus.$emit('pageChange', option);
	},
	destroy: function () {
		this.vm.$el.parentNode.removeChild(this.vm.$el)
		this.vm.$destroy();
		this.isCreate = false;
	},
}

export default {
	systemSettingApp: new systemSettingApp()
}
