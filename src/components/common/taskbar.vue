<template>
	<div class='taskbar' :class='position'>
		<span>{{ parentMessage }}</span>
	</div>
</template>

<script>
	import winStyle from '@/winStyle/explorer'
	export default {
		data() {
			return {
				position: 'left'
			}
		},
		props: {
			parentMessage: {
				type: String,
				default: '这是任务栏'
				// require: true // 必填
			}
		},
		created() {
			this.position = ['bottom','left','top','right'][winStyle.layout - 1];
		}
	}

</script>
<style lang="stylus" scoped>
	.taskbar
		position absolute
		background-color #141617
		&.left {
			left 0
			height 100%
			width 70px
		}

		&.bottom {
			bottom 0
			height 50px
			width 100%
		}
</style>
