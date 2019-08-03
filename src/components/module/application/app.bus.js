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
}
systemSettingApp.prototype = {
	create: function () {
		const systemSettingCur = Vue.extend(systemSetting);
		const D_systemSetting = new systemSettingCur({
			data: function () {
				return {
					page: this.page,
					bus: this.bus,
				}
			}.bind(this),
		}).$mount();
		desktop().appendChild(D_systemSetting.$el);
	},
	show: function (option) {
		if (!this.isCreate) {
			this.create();
			this.isCreate = true;
		}
		this.bus.$emit('pageChange', option);
	},

}

export default {
	systemSettingApp: new systemSettingApp()
}
