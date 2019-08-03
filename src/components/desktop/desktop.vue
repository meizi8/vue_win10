<template>
	<div id="wallpaper" class="wallpaper" :style="`background-image: url('${wallpaperSrc}')`"
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
			wallpaperSrc() {
				return this.$store.state.style.wallpaper ?
					this.$store.state.style.wallpaper :
					require("static/img/wallpaper.jpg");
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
