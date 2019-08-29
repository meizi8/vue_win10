export default {
	namespaced: true,
	state: {
		allTasks: [],
	},
	getters: {
		getList(state){
			const list = [];
			state.allTasks.forEach(item => {
				if(item.showTasks){
					list.push(item);
				}
			});
			return list;
		}
	},
	mutations: {
		addTask(state,appInfo){
			state.allTasks.push(appInfo);
		},
		removeTask(state,appId){
			const removeIndex = state.allTasks.findIndex(item=>item.id === appId);
			if(removeIndex > -1){
				state.allTasks.splice(removeIndex,1);
			}
		},
		addZIndex(state, extend){
			const task = state.allTasks.find(item => item.id === extend.id);
			if(task){
				task.zIndex = extend.zIndex;
			}
		}
	},
	actions: {
		addTask({ commit },appInfo){
			commit('addTask',appInfo);
		},
		removeTask({ commit },appId){
			commit('removeTask',appId);
		},
	}
}
