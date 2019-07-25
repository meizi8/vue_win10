<template>
	<div id="app" @contextmenu.prevent="">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: "App"
	};

</script>

<style lang="less" scoped>
	#app {
		height: 100%;
	}

</style>
