<template>
	<div id="wallpaper" class="wallpaper" :style="`background-image: url('${wallpaperSrc}')`"
		@contextmenu.self.prevent="showDesktopMenu($event)" @click='desktopClick'>
		<!-- 桌面右键菜单 -->
		<desktopMenu v-show="isShowDesktopMenu" :site="desktopMenuSite"></desktopMenu>
		<timeModule v-if="showTimeModule" :class="timeModuleClass"></timeModule>
	</div>
</template>

<script>
	import timeModuleBus from '@/components/module/timeModule.bus'

	export default {
		data() {
			return {
				defaultWallpaper: false,
				isShowDesktopMenu: false,
				showTimeModule: false,
				desktopMenuSite: {}
			};
		},
		props: {},
		created() {
			this.defindBus();
		},
		computed: {
			wallpaperSrc() {
				return this.$store.state.style.wallpaper ?
					this.$store.state.style.wallpaper :
					require("static/img/wallpaper.jpg");
			}
		},
		methods: {
			showDesktopMenu(event) {
				this.desktopMenuSite = {
					clientX: event.clientX,
					clientY: event.clientY,
					clientWidth: event.srcElement.clientWidth,
					clientHeight: event.srcElement.clientHeight
				};
				this.isShowDesktopMenu = true;
			},
			desktopClick() {
				this.isShowDesktopMenu = false;
			},
			defindBus() {
				//时间模块
				timeModuleBus.$on('hide', () => {
					this.showTimeModule = false;
				}).$on('toggle', param => {
					if (param) {
						this.timeModuleClass = ['right-bottom', 'left-bottom', 'right-top', 'right-bottom'][this
							.$store.state.style.layout - 1
						]
						this.showTimeModule = !this.showTimeModule;
					}
				})
			}
		},
		components: {
			desktopMenu: () => import('../contextmenu/desktopMenu.vue'),
			timeModule: () => import('../module/timeModule')
		}
	};

</script>
<style lang="less" scoped>
	.wallpaper {
		position: relative;
		color: #fff;
		background-size: cover;
		background-position: center;

		.right-bottom {
			position: absolute;
			right: 0;
			bottom: 0;
		}


		.left-bottom {
			position: absolute;
			left: 0;
			bottom: 0;
		}

		.right-top {
			position: absolute;
			right: 0;
			top: 0;
		}
	}

</style>
