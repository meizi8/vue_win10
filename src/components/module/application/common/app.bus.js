import Vue from "vue";
import systemSetting from '../systemSetting/systemSetting.vue';
import notepad from '../notepad/notepad.vue';
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

//系统设置
class SystemSettingApp{
	constructor(){
		this.id = generateId();
		this.name = '设置';
		this.iconfont = true;	//是否字体图标
		this.iconClass = '';	//字体图标类名
		this.isCreate = false;
		this.page = '';
		this.bus = createVue();
		this.vm;
	}
	create() {
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
	}
	show(option) {
		if (this.isCreate) {
			zIndex.addTopApp(this.id);
			this.bus.$emit('show', zIndex.getIndex());
		} else {
			this.create();
			this.isCreate = true;
			this.bus.$emit('pageChange', option);
		}
	}
	hide() {

	}
	destroy() {
		store.dispatch('appTaskManage/removeTask',this.id);
		this.vm.$el.parentNode.removeChild(this.vm.$el);
		this.bus.$destroy();	//彻底销毁实例方法
		this.vm.$destroy();
		this.isCreate = false;
	}
}


//记事本
class Notepad{
	constructor(name,data){
		this.id = generateId();
		this.name = name || '记事本';
		this.data = data;
		this.iconfont = true;	//是否字体图标
		this.iconClass = '';	//字体图标类名
		this.isCreate = false;
		this.page = '';
		this.bus = createVue();
		this.vm;
	}
	create() {
		const notepadCur = Vue.extend(notepad);
		this.vm = new notepadCur({
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
	}
	show(option) {
		if (this.isCreate) {
			zIndex.addTopApp(this.id);
			this.bus.$emit('show', zIndex.getIndex());
		} else {
			this.create();
			this.isCreate = true;
			this.bus.$emit('pageChange', option);
		}
	}
	hide() {

	}
	destroy() {
		store.dispatch('appTaskManage/removeTask',this.id);
		this.vm.$el.parentNode.removeChild(this.vm.$el);
		this.bus.$destroy();	//彻底销毁实例方法
		this.vm.$destroy();
		this.isCreate = false;
	}
}

export default {
	systemSettingApp: new SystemSettingApp(),
	Notepad,

}
