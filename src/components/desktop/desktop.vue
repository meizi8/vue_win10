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
				let style;
				switch (this.$store.state.style.backgroundType) {
					case 1:	//图片
						const integratingDegree = this.$store.state.style.integratingDegree;
						style = `background-color: ${this.$store.state.style.backgroundColor};background-image: url('${this.$store.getters["style/getNewestBackgroundImg"]}');`;
						// 1.填充 cover
						// 2.适应 center center/contain  no-repeat
						// 3.拉升 center center/100% 100%  no-repeat
						// 4.平铺 contain repeat
						if(integratingDegree === 1){
							style += 'background-position: center center;';
							style += 'background-size: cover;';
							style += 'background-repeat: no-repeat;';
						} else if(integratingDegree === 2){
							style += 'background-position: center center;';
							style += 'background-size: contain;';
							style += 'background-repeat: no-repeat;';
						} else if(integratingDegree === 3){
							style += 'background-position: center center;';
							style += 'background-size: 100% 100%;';
							style += 'background-repeat: no-repeat;';
						} else if(integratingDegree === 4){
							style += 'background-size: contain;';
						}
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
					clientX: event.layerX,
					clientY: event.layerY,
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
