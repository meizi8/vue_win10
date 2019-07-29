<template>
	<div class="explorer" :class="getLayout" @click.capture="windowClick" @contextmenu="windowRightClick">
		<desktop class="desktop"></desktop>
		<taskbar class="taskbar" :style="getTaskbarClass"></taskbar>
	</div>
</template>

<script>
	import taskbar from "@/components/taskbar/taskbar";
	import desktop from "@/components/desktop/desktop";
	import timeModuleBus from './module/timeModule.bus'

	export default {
		// name: 'explorer',
		data() {
			return {};
		},
		computed: {
			getLayout() {
				return ["bottom", "left", "top", "right"][
					this.$store.state.style.layout - 1
				];
			},
			getTaskbarClass() {
				return this.$store.state.style.layout === 1 ||
					this.$store.state.style.layout === 3 ?
					`height: ${this.$store.state.style.taskbarHeight}px` :
					`width: ${this.$store.state.style.taskbarWidth}px`;
			}
		},
		created() {},
		components: {
			taskbar,
			desktop
		},
		methods: {
			windowClick(){
				console.log('点击了window左键');
				timeModuleBus.$emit('show',0);
			},
			windowRightClick(){
				console.log('点击了右键');
			}
		}
	};

</script>

<style lang="less" scoped>
	.explorer {
		height: 100%;
		display: flex;
		flex-wrap: nowrap;

		.desktop {
			flex: 1;
			background-color: #222;
		}

		&.bottom {
			flex-direction: column;
		}

		&.left {
			flex-direction: row-reverse;
		}

		&.top {
			flex-direction: column-reverse;
		}
	}

</style>
