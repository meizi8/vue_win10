<template>
	<div>
		<span>{{ parentMessage }}</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				position: 'left'
			}
		},
		props: {
			parentMessage: {
				type: String,
				default: '桌面'
				// require: true // 必填
			}
		},
		created() {

		}
	}

</script>
<style lang="stylus" scoped>
	
</style>
