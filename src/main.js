import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Axios from 'axios'

Vue.prototype.$http = Axios;

import Home from './componentes/Home.vue'
import Colaborar from './componentes/Colaborar.vue'
import Contato from './componentes/Contato.vue'
import Cadastro from './componentes/Cadastro.vue'
import Colaboracoes from './componentes/Colaboracoes.vue'
import Exportar from './componentes/Exportar.vue'
import PainelUsuario from './componentes/PainelUsuario.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	history: true,
	routes: [
		{ path: '/', component: Home },
		{ path: '/colaborar', component: Colaborar },
		{ path: '/contato', component: Contato },
		{ path: '/cadastro', component: Cadastro },
		{ path: '/colaboracoes', component: Colaboracoes },
		{ path: '/exportar', component: Exportar },
		{ path: '/painel', component: PainelUsuario }
	]
})

new Vue({
	router,
  	el: '#app',
  	render: h => h(App)
})
