<template>
	<div class="wallpaper" :style="`background-image: url('${wallpaperSrc}')`">

	</div>
</template>

<script>
	export default {
		data() {
			return {
				defaultWallpaper: false,

			}
		},
		props: {

		},
		created() {

		},
		computed: {
			wallpaperSrc() {
				return this.$store.state.style.wallpaper ? this.$store.state.style.wallpaper : require('static/img/wallpaper.jpg');
			}
		}
	}

</script>
<style lang="stylus" scoped>
	.wallpaper
		color #fff
		background-size cover
		background-position center
</style>
