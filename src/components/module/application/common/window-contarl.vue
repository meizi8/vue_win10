<template>
	<div style="width:1022px;height:730px;left: 20px;top: 50px;" class="window-contorl" @click="contorlClick"
		@contextmenu.prevent.stop="contorlClick" ref="move">
		<div class="border-cursor">
			<div class="right type1" v-right></div>
			<div class="left type1" v-left></div>
			<div class="top type1" v-top></div>
			<div class="bottom type1" v-bottom></div>
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
			left: {
				update: function (el, binding, vnode) {
					const windowContorl = vnode.context.$el;
					const desktop = windowContorl.parentNode;
					const desktopClientWidth = desktop.clientWidth;
					const minWidth = parseInt(windowContorl.style.minWidth) || 0;

					el.onmousedown = e => {
						const windowContorlWdith = parseInt(windowContorl.style.width);
						const lastPosition = windowContorl.style.right == '';
						const left = parseInt(windowContorl.style.left);

						windowContorl.style.left = '';
						windowContorl.style.right = (lastPosition ?  desktopClientWidth - left - windowContorlWdith : parseInt(windowContorl.style.right))+'px';

						const disX = e.clientX;

						document.onmousemove = e => {
							const x = e.clientX - disX;
							if (windowContorlWdith + x < minWidth) return;
							windowContorl.style.width = windowContorlWdith - x + 'px';
						};
						document.onmouseup = e => {
							document.onmousemove = null;
							document.onmouseup = null;
						};
					}
				}
			},
			right: {
				update: function (el, binding, vnode) {
					const windowContorl = vnode.context.$el;
					const desktop = windowContorl.parentNode;
					const desktopClientWidth = desktop.clientWidth;
					const minWidth = parseInt(windowContorl.style.minWidth) || 0;

					el.onmousedown = e => {
						const windowContorlWdith = parseInt(windowContorl.style.width);
						const lastPosition = windowContorl.style.left == '';
						const right = parseInt(windowContorl.style.right);

						windowContorl.style.right = '';
						windowContorl.style.left = (lastPosition ?  desktopClientWidth - right - windowContorlWdith : parseInt(windowContorl.style.left))+'px';

						const disX = e.clientX;

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
			},
			bottom: {
				update: function (el, binding, vnode) {
					const windowContorl = vnode.context.$el;
					const desktop = windowContorl.parentNode;
					const desktopClientHeight = desktop.clientHeight;
					const minHeight = parseInt(windowContorl.style.minHeight) || 0;

					el.onmousedown = e => {
						const windowContorlHeight = parseInt(windowContorl.style.height);
						const lastPosition = windowContorl.style.top == '';
						const bottom = parseInt(windowContorl.style.bottom);

						windowContorl.style.bottom = '';
						windowContorl.style.top = (lastPosition ?  desktopClientHeight - bottom - windowContorlHeight : parseInt(windowContorl.style.top))+'px';

						const disY = e.clientY;

						document.onmousemove = e => {
							const y = e.clientY - disY;
							if (windowContorlHeight + y < minHeight) return;
							windowContorl.style.height = windowContorlHeight + y + 'px';
						};
						document.onmouseup = e => {
							document.onmousemove = null;
							document.onmouseup = null;
						};
					}
				}
			},
			top: {
				update: function (el, binding, vnode) {
					const windowContorl = vnode.context.$el;
					const desktop = windowContorl.parentNode;
					const desktopClientHeight = desktop.clientHeight;
					const minHeight = parseInt(windowContorl.style.minHeight) || 0;

					el.onmousedown = e => {
						const windowContorlHeight = parseInt(windowContorl.style.height);
						const lastPosition = windowContorl.style.bottom == '';
						const top = parseInt(windowContorl.style.top);

						windowContorl.style.top = '';
						windowContorl.style.bottom = (lastPosition ?  desktopClientHeight - top - windowContorlHeight : parseInt(windowContorl.style.bottom))+'px';

						const disY = e.clientY;

						document.onmousemove = e => {
							const y = e.clientY - disY;
							if (windowContorlHeight + y < minHeight) return;
							windowContorl.style.height = windowContorlHeight - y + 'px';
						};
						document.onmouseup = e => {
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
