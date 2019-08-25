import Vue from "vue";
import systemSetting from '../systemSetting/systemSetting.vue';
import store from '@/store/index';

const desktop = function () {
	return document.getElementById('wallpaper');
}

const createVue = function () {
	return new Vue();
};
const generateId = function () {
	return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}

const systemSettingApp = function () {
	this.id = generateId();
	this.name = '设置';
	this.iconfont = true;	//是否字体图标
	this.iconClass = '';	//字体图标类名
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
			store
		}).$mount();
		desktop().appendChild(this.vm.$el);
		store.dispatch('appTaskManage/addTask',{
			id: this.id,
			appName: this.name,
			iconfont: this.iconfont,	//是否字体图标
			iconClass: this.iconClass,	//字体图标类名
			show: true,	//显示在任务栏
		})
	},
	show: function (option) {
		if (!this.isCreate) {
			this.create();
			this.isCreate = true;
		}
		this.bus.$emit('pageChange', option);
	},
	destroy: function () {
		store.dispatch('appTaskManage/removeTask',this.id);
		this.vm.$el.parentNode.removeChild(this.vm.$el)
		this.vm.$destroy();
		this.isCreate = false;
	},
}

export default {
	systemSettingApp: new systemSettingApp()
}
