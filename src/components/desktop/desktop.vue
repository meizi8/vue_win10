<template>
	<div id="wallpaper" class="wallpaper" :style="`background-image: url('${wallpaperSrc}')`"
		@contextmenu.self.prevent="showDesktopMenu($event)" @click='desktopClick'>
		<!-- 桌面右键菜单 -->
		<desktopMenu v-show="isShowDesktopMenu" :site="desktopMenuSite"></desktopMenu>
		<timeModule></timeModule>
	</div>
</template>

<script>
	import desktopMenu from "@/components/contextmenu/desktopMenu.vue";
	import timeModule from '@/components/module/timeModule'
	export default {
		data() {
			return {
				defaultWallpaper: false,
				isShowDesktopMenu: false,
				desktopMenuSite: {}
			};
		},
		props: {},
		created() {},
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
			}
		},
		components: {
			desktopMenu,
			timeModule
		}
	};

</script>
<style lang="less" scoped>
	.wallpaper {
		color: #fff;
		background-size: cover;
		background-position: center;
	}

</style>
