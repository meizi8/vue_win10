const state = {
	curTime: new Date(),
}
const mutations = {
	updateTime(state, time) {
		state.curTime = time;
	},
}
!function updateTime() {
	state.curTime = new Date();
	setTimeout(updateTime, 1000);
}()
export default {
	namespaced: true,
	state,
	mutations,
}
