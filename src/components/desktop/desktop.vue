<template>
	<div id="wallpaper" class="wallpaper" :style="backgroundStyle"
		@contextmenu="showDesktopMenu($event)" @click='desktopClick'>
		<!-- 桌面右键菜单 -->
		<desktopMenu v-show="isShowDesktopMenu" :site="desktopMenuSite"></desktopMenu>
	</div>
</template>

<script>
	import { desktopMenuModuleBus,hideAllModule } from "../module/module.bus";
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
			this.InitBus();
		},
		computed: {
			backgroundStyle(){
				let style
				switch (this.$store.state.style.backgroundType) {
					case 1:	//图片
						style = `background: ${this.$store.state.style.backgroundColor} url('${this.$store.state.style.backgroundImg}') center center/cover no-repeat;`;
						break;
					case 2:	//纯色
						style = `background-color: ${this.$store.state.style.backgroundColor};`;
						break;

					default:
						break;
				}
				return style;
			}
		},
		methods: {
			showDesktopMenu(event) {
				hideAllModule();
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
			InitBus(){
				desktopMenuModuleBus.$on('hide',()=>{
					this.isShowDesktopMenu = false;
				})
			}
		},
		components: {
			desktopMenu: () => import('../module/desktopMenu'),
		}
	};

</script>
<style lang="less" scoped>
	.wallpaper {
		position: relative;
		color: #fff;
		background-size: cover;
		background-position: center;
	}

</style>
