<template>
	<div class="explorer">
		<div>{{msg}}</div>
		<taskbar></taskbar>
	</div>
</template>

<script>
	import taskbar from '@/components/common/taskbar';
	export default {
		// name: 'explorer',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		components: {
			taskbar
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
