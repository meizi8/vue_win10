<template>
	<div class="window-contorl" @click="contorlClick"
		@contextmenu.prevent.stop="contorlClick" ref="move" v-show="isShow" :style="[{zIndex:zIndex},parentStyle]" >
		<div class="border-cursor" v-show="!maximizeStatus">
			<div class="right type1" v-scale.right></div>
			<div class="left type1" v-scale.left></div>
			<div class="top type1" v-scale.top></div>
			<div class="bottom type1" v-scale.bottom></div>
			<div class="right-top type2" v-scale.right.top></div>
			<div class="left-top type2" v-scale.left.top></div>
			<div class="right-bottom type2" v-scale.right.bottom></div>
			<div class="left-bottom type2" v-scale.left.bottom></div>
		</div>
		<div class="content">
			<slot v-if="fatherDom" :father="fatherDom" :minimality='minimality' :windowed='windowed' :maximize='maximize' :toggleImize='toggleImize' :maximizeStatus='maximizeStatus' :close='close'></slot>
		</div>
	</div>
</template>
<script>
	import {
		hideAllModule
	} from '../../module.bus';
	export default {
		data() {
			return {
				isShow: true,
				fatherDom: null,
				maximizeStatus: false,
				zIndex: 99999,
			}
		},
		props: {
			bus: {
				type: Object,
				default: {}
			},
			parentStyle: {
				type: Object,
				default: {}
			},
		},
		created() {
			this.bus.$on('toggle', () => {
				this.isShow = !this.isShow;
			}).$on('show', (zIndex) => {
				this.zIndex = zIndex;
				this.isShow = true;
			}).$on('hide', () => {
				this.isShow = false;
			});
		},
		mounted() {
			this.fatherDom = this.$refs.move;
		},
		methods: {
			contorlClick() {
				hideAllModule();
			},
			//最小化
			minimality(){
				this.isShow = false;
				this.bus.$emit('removeIndex');
			},
			//窗口化
			windowed(){
				this.$refs.move.style.left = this.minstyle.left;
				this.$refs.move.style.top = this.minstyle.top;
				this.$refs.move.style.height = this.minstyle.height;
				this.$refs.move.style.width = this.minstyle.width;
				this.maximizeStatus = false;
			},
			//最大化
			maximize(){
				this.minstyle = {	//保存最小化样式
					left: this.$refs.move.style.left,
					top: this.$refs.move.style.top,
					height: this.$refs.move.style.height,
					width: this.$refs.move.style.width,
				};
				this.$refs.move.style.left = 0;
				this.$refs.move.style.top = 0;
				this.$refs.move.style.height = '100%';
				this.$refs.move.style.width = '100%';
				this.maximizeStatus = true;
			},
			//窗口化、最大化切换
			toggleImize(){
				this.maximizeStatus ? this.windowed() : this.maximize();
			},
			close(){
				this.bus.$emit('removeIndex');
				this.bus.$emit('destroy');
			}
		},
		directives: {
			scale: {
				update: function (el, binding, vnode) {
					const windowContorl = vnode.context.$el;
					const desktop = windowContorl.parentNode;
					const desktopClientWidth = desktop.clientWidth;
					const desktopClientHeight = desktop.clientHeight;
					const minHeight = parseInt(windowContorl.style.minHeight) || 0;
					const minWidth = parseInt(windowContorl.style.minWidth) || 0;

					el.onmousedown = e => {
						const windowContorlHeight = parseInt(windowContorl.style.height);
						const windowContorlWdith = parseInt(windowContorl.style.width);

						let top, right, bottom, left, disX, disY;

						if(binding.modifiers.top){
							top = parseInt(windowContorl.style.top);

							windowContorl.style.top = '';
							windowContorl.style.bottom = desktopClientHeight - top - windowContorlHeight + 'px';

							disY = e.clientY;
						}

						if(binding.modifiers.bottom){
							bottom = parseInt(windowContorl.style.bottom);

							windowContorl.style.top = desktopClientHeight - bottom - windowContorlHeight + 'px';

							disY = e.clientY;
						}

						if(binding.modifiers.left){
							left = parseInt(windowContorl.style.left);

							windowContorl.style.left = '';
							windowContorl.style.right = desktopClientWidth - left - windowContorlWdith + 'px';

							disX = e.clientX;
						}

						if(binding.modifiers.right){
							right = parseInt(windowContorl.style.right);

							windowContorl.style.left = desktopClientWidth - right - windowContorlWdith + 'px';

							disX = e.clientX;
						}

						document.onmousemove = e => {
							if(binding.modifiers.top || binding.modifiers.bottom){
								const y = e.clientY - disY;
								if (windowContorlHeight + (binding.modifiers.top?-y:y) < minHeight) {
									windowContorl.style.height = minHeight + 'px';
								} else {
									windowContorl.style.height = windowContorlHeight +(binding.modifiers.top?-y:y) + 'px';
								}
							}

							if(binding.modifiers.left || binding.modifiers.right){
								const x = e.clientX - disX;
								if (windowContorlWdith + (binding.modifiers.left?-x:x) < minWidth) {
									windowContorl.style.width = minWidth + 'px';
								} else {
									windowContorl.style.width = windowContorlWdith + (binding.modifiers.left?-x:x) + 'px';
								}
							}
						};
						document.onmouseup = e => {
							if(binding.modifiers.left){
								windowContorl.style.right = '';
								windowContorl.style.left = e.clientX + 'px';
							}

							if(binding.modifiers.top){
								windowContorl.style.bottom = '';
								windowContorl.style.top = e.clientY + 'px';
							}

							document.onmousemove = null;
							document.onmouseup = null;
						};
					}
				}
			},
		}
	}

</script>
<style lang="less" scoped>
	.window-contorl {
		position: absolute;
		overflow: hidden;

		.border-cursor {
			.type1 {
				position: absolute;
				z-index: 10;
			}

			.type2 {
				position: absolute;
				z-index: 11;
				height: 7px;
				width: 7px;
			}

			.top {
				height: 7px;
				width: 100%;
				top: -3px;
				cursor: n-resize;
			}

			.right {
				height: 100%;
				width: 7px;
				right: -3px;
				cursor: e-resize;
			}

			.bottom {
				height: 7px;
				width: 100%;
				bottom: -3px;
				cursor: s-resize;
			}

			.left {
				height: 100%;
				width: 7px;
				left: -3px;
				cursor: w-resize;
			}

			.right-top {
				right: -3px;
				top: -3px;
				cursor: ne-resize;
			}

			.right-bottom {
				right: -3px;
				bottom: -3px;
				cursor: se-resize;
			}

			.left-bottom {
				left: -3px;
				bottom: -3px;
				cursor: sw-resize;
			}

			.left-top {
				left: -3px;
				top: -3px;
				cursor: nw-resize;
			}
		}

		.content {
			width: 100%;
			height: 100%;
		}
	}

</style>
