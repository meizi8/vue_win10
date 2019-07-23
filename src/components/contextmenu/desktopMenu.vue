<template>
	<div class="wrap" :style="`top: ${site.clientY}px;left: ${site.clientX}px;`">
		<!-- <div>{{text}}</div> -->
		<div>{{JSON.stringify(site)}}</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: ['site']
	}

</script>

<style scoped>
	.wrap {
		position: absolute;
		z-index: 99999;
		background-color: rgba(0, 0, 0, 0.8);
		color: #fff;
		padding: 10px;
		border-radius: 10px;
	}
</style>
