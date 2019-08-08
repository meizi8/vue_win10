<template>
	<div style="width:1022px;height:730px;left: 20px;top: 50px;" class="window-contorl" @click="contorlClick"
		@contextmenu.prevent.stop="contorlClick" ref="move">
		<div class="border-cursor">
			<div class="right type1" v-right></div>
			<div class="left type1"></div>
			<div class="top type1"></div>
			<div class="bottom type1"></div>
			<div class="right-top type2"></div>
			<div class="left-top type2"></div>
			<div class="right-bottom type2"></div>
			<div class="left-bottom type2"></div>
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
			right: {
				update: function (el, binding, vnode) {
					const windowContorl = vnode.context.$el;
					const desktop = windowContorl.parentNode;
					// const desktopClientWidth = desktop.clientWidth;
					// const desktopClientHeight = desktop.clientHeight;
					// const left = parseInt(windowContorl.style.left);

					const minWidth = parseInt(windowContorl.style.minWidth);

					el.onmousedown = e => {
						
						const disX = e.clientX;
						const windowContorlWdith = parseInt(windowContorl.style.width);

						document.onmousemove = e => {
							const x = e.clientX - disX;
							if (windowContorlWdith + x < minWidth) return;
							windowContorl.style.width = windowContorlWdith + x + 'px';
						};
						document.onmouseup = e => {
							document.onmousemove = null;
							document.onmouseup = null;
						};
					}
				}
			}
		}
	}

</script>
<style lang="less" scoped>
	.window-contorl {
		position: absolute;

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
