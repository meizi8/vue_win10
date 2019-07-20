<template>
	<div class="explorer" :class="getLayout">
		<desktop class="desktop"></desktop>
		<taskbar class="taskbar" :style="getTaskbarClass"></taskbar>
	</div>
</template>

<script>
	import taskbar from '@/components/common/taskbar';
	import desktop from '@/components/common/desktop';
	export default {
		// name: 'explorer',
		data() {
			return {

			}
		},
		computed:{
			getLayout(){
				return ['bottom','left','top','right'][this.$store.state.style.layout - 1];
			},
			getTaskbarClass(){
				return (this.$store.state.style.layout === 1 || this.$store.state.style.layout === 3) ? `height: ${this.$store.state.style.taskbarHeight}px`: `width: ${this.$store.state.style.taskbarWidth}px`;
			}
		},
		created() {
		},
		components: {
			taskbar,
			desktop
		},
	}

</script>

<style lang="stylus" scoped>
	.explorer
		height 100%
		display flex
		flex-wrap nowrap
		.desktop
			flex 1
		&.bottom
			flex-direction column
			.taskbar
				// width 100%
				// height 55px
		&.left
			flex-direction row-reverse
			.taskbar
				// width 70px
		&.top
			flex-direction column-reverse
			.taskbar
				// width 100%
				// height 55px
		&.right
			.taskbar
				// width 70px
</style>

