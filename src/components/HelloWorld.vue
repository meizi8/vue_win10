<template>
	<div class="hello">
		<router-link to="home">主页</router-link>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created(){
			this.$router.push('/home');
		}
	}

</script>

<style scoped>

</style>
