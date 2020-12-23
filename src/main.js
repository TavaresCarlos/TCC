import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Axios from 'axios'

Vue.prototype.$http = Axios;

Vue.use(VueRouter)

const router = new VueRouter({
	history: true,
	routes: [{

	}]
})

new Vue({
	router,
  	el: '#app',
  	render: h => h(App)
})
