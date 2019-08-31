import Vue from "vue";
import systemSetting from '../systemSetting/systemSetting.vue';
import store from '@/store/index';
import {generateId,createVue} from '@/mainJs/tool';

const desktop = function () {
	return document.getElementById('wallpaper');
}

const zIndex = {
	count: 1000, //当前累计层级
	topAppArr: [],	//当前顶级窗口app的id顺序
	getIndex: function(){
		return this.count++;
	},
	addTopApp: function (id) {
		this.topAppArr.push(id);
	},
	removeTopId: function (id) {
		this.topAppArr = this.topAppArr.filter(item=>item.indexOf(id)==-1);
	},
	getTopId: function () {
		return this.topAppArr[this.topAppArr.length-1];
	}
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


		this.bus.$once('destroy', () => {
			this.destroy();
		});
		this.bus.$on('removeIndex', () => {
			zIndex.removeTopId(this.id);
		});

		zIndex.addTopApp(this.id);
		store.dispatch('appTaskManage/addTask',{
			id: this.id,
			appName: this.name,
			iconfont: this.iconfont,	//是否字体图标
			iconClass: 'icon-setting',	//字体图标类名
			showTasks: true,	//显示在任务栏
			zIndex: zIndex.getIndex(),
			click: () => {	//点击任务栏app触发
				if(zIndex.getTopId() === this.id){
					zIndex.removeTopId(this.id);
					this.bus.$emit('hide');
				} else {
					zIndex.addTopApp(this.id);
					this.bus.$emit('show',zIndex.getIndex());
				}
			}
		})
	},
	show: function (option) {
		if (this.isCreate) {
			zIndex.addTopApp(this.id);
			this.bus.$emit('show', zIndex.getIndex());
		} else {
			this.create();
			this.isCreate = true;
			this.bus.$emit('pageChange', option);
		}
	},
	hide: function () {

	},
	destroy: function () {
		store.dispatch('appTaskManage/removeTask',this.id);
		this.vm.$el.parentNode.removeChild(this.vm.$el);
		this.bus.$destroy();	//彻底销毁实例方法
		this.vm.$destroy();
		this.isCreate = false;
	},
}

export default {
	systemSettingApp: new systemSettingApp()
}
