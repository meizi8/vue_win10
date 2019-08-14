import Vue from 'vue'

import axios from 'axios'
Vue.prototype.$axios= axios

const service = axios.create({
	timeout: 30000 // 请求超时时间
})
