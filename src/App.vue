<template>
  <div id="app">
  	<!--<app-header></app-header>-->
  	<app-content></app-content>
  	<!--<app-footer></app-footer>-->
  </div>
</template>

<script>
	import AppContent from './layout/AppContent.vue'
	import AppFooter from './layout/AppFooter.vue'

	export default{
		components: {
			AppContent, AppFooter
		}
	}
  
</script>

<style>

</style>
