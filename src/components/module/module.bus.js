import Vue from 'vue'

const allModuleBus = [];

function createVue(module) {
	const vue = new Vue();
	allModuleBus.push({
		module,
		component: vue
	});
	return vue;
}


function hideAllModule(not) {
	allModuleBus.forEach(item => {
		if(!not || not.indexOf(item.module)<0)
		item.component.$emit('hide')
	})
}

const timeModuleBus = createVue('timeModuleBus');
const desktopMenuModuleBus = createVue('desktopMenuModuleBus');
export {
	timeModuleBus,
	desktopMenuModuleBus,

	hideAllModule
}
