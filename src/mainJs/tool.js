import Vue from "vue";
const createVue = function () {
	return new Vue();
};
const generateId = function () {
	return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}

export {
	createVue,
	generateId,
}
