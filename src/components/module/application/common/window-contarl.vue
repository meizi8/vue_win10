<template>
	<div style="width:1022px;height:730px;left: 20px;top: 50px;" class="window-contorl" @click="contorlClick"
		@contextmenu.prevent.stop="contorlClick" ref="move">
		<div class="border-cursor">
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
			<slot v-if="fatherDom" :father="fatherDom"></slot>
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
				fatherDom: null,
			}
		},
		created() {

		},
		mounted() {
			this.fatherDom = this.$refs.move;
		},
		methods: {
			contorlClick() {
				hideAllModule();
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
