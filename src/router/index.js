import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import explorer from '@/components/explorer'
import notFound from '@/components/404'

Vue.use(Router)

export default new Router({
	// mode: 'history',
	routes: [{
		path: '/',
		name: 'HelloWorld',
		component: HelloWorld
	},{
		path: '/home',
		name: 'explorer',
		component: explorer
	},{
		path: '*',
		name: '404NotFound',
		component: notFound
	}]
})
