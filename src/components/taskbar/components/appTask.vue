<template>
	<div class="appTask">
		{{appList}}
	</div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		computed: {
			appList(){
				return this.$store.getters['appTaskManage/getList'];
			}
		}
	}
</script>
sty
