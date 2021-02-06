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

import Root from './componentes/painel/Root.vue'
import ConfiguracaoInicial from './componentes/painel/ConfiguracaoInicial.vue'

import Anonimo from './componentes/painel/Anonimo.vue'

import Colaborador from './componentes/painel/Colaborador.vue'
import Administrador from './componentes/painel/Administrador.vue'
import Perfil from './componentes/painel/Perfil.vue'
import TrocarSenha from './componentes/painel/TrocarSenha.vue'
import Colaboracao from './componentes/painel/Colaboracao.vue'
import AdicionarCategorias from './componentes/painel/AdicionarCategorias.vue'
import AdiconarSubcategorias from './componentes/painel/AdiconarSubcategorias.vue'
import VerContatos from './componentes/painel/VerContatos.vue'
import VerColaboracoes from './componentes/painel/VerColaboracoes.vue'

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
		{ path: '/colaborador', component: Colaborador, children: [
			{ path: '/colaborador/perfil', component: Perfil },
			{ path: '/colaborador/trocarSenha', component: TrocarSenha },
			{ path: '/colaborador/colaboracao', component: Colaboracao}
		]},
		{ path: '/administrador', component: Administrador, children: [
			{ path: '/administrador/perfil', component: Perfil },
			{ path: '/administrador/trocarSenha', component: TrocarSenha },
			{ path: '/administrador/colaboracao', component: Colaboracao },
			{ path: '/administrador/adicionarCategorias', component: AdicionarCategorias },
			{ path: '/administrador/adicionarSubcategorias', component: AdiconarSubcategorias },
			{ path: '/administrador/verContatos', component: VerContatos },
			{ path: '/administrador/verColaboracoes', component: VerColaboracoes }
		]},
		{ path: '/root', component: Root, children: [
			{ path: '/root/ConfiguracaoInicial', component: ConfiguracaoInicial },
		]},
		{ path: '/anonimo', component: Anonimo, children: [
			{ path: '/anonimo/colaboracao', component: Colaboracao },
			{ path: '/anonimo/perfil', component: Perfil }
		]}
	]
})

new Vue({
	router,
  	el: '#app',
  	render: h => h(App)
})
