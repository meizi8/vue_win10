<template>
	<windowContarl @contextmenu.prevent.stop="rightClick" style="min-width: 500px;min-height:320px;width:1022px;height:730px;left: 20px;top: 50px;" :style="'z-index:'+zIndex+';'" v-show="isShow" class="windowContarl" ref="windowContarl">
		<template v-slot:default="slotProps">
			<div id="systemSetting">
				<div class="win-header" v-move="{'dom':slotProps.father,allowMove: !maximizeStatus}">
					<div class="win-title">设置</div>
					<div class="win-control">
						<div class="minimize">
							<i class="iconfont icon-minimality" @click="minimality"></i>
						</div>
						<div class="windowed" v-if="maximizeStatus">
							<i class="iconfont icon-windowed" @click="windowed"></i></div>
						<div class="maximize" v-if="!maximizeStatus">
							<i class="iconfont icon-maximize" @click="maximize"></i></div>
						<div class="close" @click="close">
							<i class="iconfont icon-close"></i>
						</div>
					</div>
				</div>
				<div class="win-content">
					<div class="setting-left">
						<div class="subject">
							<div class="title">个性化</div>
							<ul class="menu">
								<li v-for="item in menuList" :key="item.flot" :class="page==item.flot?'active':''"
									@click='togglePage(item.flot)'>
									<i class="iconfont" :class="item.iconClassName"></i>
									<span>{{item.text}}</span>
								</li>
							</ul>
						</div>

					</div>
					<div class="setting-rigth">
						<!-- 背景设置模块 -->
						<background  class="background" v-show="page=='background'"></background>
						<div class="color" v-show="page=='color'">
							<!-- 颜色页面 -->
							未开发
						</div>
						<taskbar class="taskbar" v-show="page=='taskbar'"></taskbar>
					</div>
				</div>
			</div>
		</template>
	</windowContarl>
</template>
<script>
	import {
		hideAllModule
	} from '../../module.bus.js'
	import windowContarl from '../common/window-contarl';
	import background from './background/background'
	import taskbar from './taskbar/taskbar'
	export default {
		data() {
			return {
				isShow: true,
				page: '',
				menuList: [{
					flot: 'background',
					text: '背景',
					iconClassName:'icon-background'
				}, {
					flot: 'color',
					text: '颜色',
					iconClassName:'icon-color'
				},{
					flot: 'taskbar',
					text: '任务栏',
					iconClassName:'icon-taskbar'
				}, ],
				maximizeStatus: false,	//最大化状态
				zIndex: 99999,
			}
		},
		created() {
			this.bus.$on('pageChange', page => {
				console.log('systemSetting pageChange: ', page);
				this.page = page;
			});
			this.bus.$on('toggle', () => {
				this.isShow = !this.isShow;
			});
			this.bus.$on('show', (zIndex) => {
				this.zIndex = zIndex;
				this.isShow = true;
			});
			this.bus.$on('hide', () => {
				this.isShow = false;
			});
		},

		methods: {
			togglePage(e) {
				this.page = e;
			},
			rightClick() {
				hideAllModule();
			},
			//关闭
			close() {
				this.bus.$emit('removeIndex');
				this.bus.$emit('destroy')
			},
			//最小化
			minimality(){
				this.isShow = false;
				this.bus.$emit('removeIndex');
			},
			windowed(){
				if(this.minstyle){
					this.$refs.windowContarl.$el.style.left = this.minstyle.left;
					this.$refs.windowContarl.$el.style.top = this.minstyle.top;
					this.$refs.windowContarl.$el.style.height = this.minstyle.height;
					this.$refs.windowContarl.$el.style.width = this.minstyle.width;
					this.maximizeStatus = false;
				}
			},
			//最大化
			maximize(){
				this.minstyle = {
					left: this.$refs.windowContarl.$el.style.left,
					top: this.$refs.windowContarl.$el.style.top,
					height: this.$refs.windowContarl.$el.style.height,
					width: this.$refs.windowContarl.$el.style.width,
				};	//保存最小化样式
				this.$refs.windowContarl.$el.style.left = 0;
				this.$refs.windowContarl.$el.style.top = 0;
				this.$refs.windowContarl.$el.style.height = '100%';
				this.$refs.windowContarl.$el.style.width = '100%';
				this.maximizeStatus = true;
			}
		},
		components: {
			windowContarl,
			background,
			taskbar
		}
	}

</script>
<style lang="less" scoped>
	#systemSetting {
		color: #000;
		border: 1px solid #707070;
		width: 100%;
		height: 100%;

		.win-header {
			position: absolute;
			height: 35px;
			line-height: 35px;
			width: 100%;

			.win-title {
				float: left;
			}

			.win-control {
				float: right;
				display: flex;

				>div {
					width: 48px;

					.iconfont {
						font-size: 24px;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					&:hover {
						background-color: #e6e6e6;
					}

					&.close:hover {
						color: #fff;
						background-color: #e81123;
					}
				}
			}
		}

		.win-content {
			display: flex;
			height: 100%;

			.setting-left {
				padding-top: 35px;
				width: 320px;
				background-color: rgba(255, 255, 255, .9);

				.subject {
					.title {
						height: 30px;
						line-height: 20px;
						font-weight: 600;
					}

					.menu {
						line-height: 48px;
						font-size: 14px;

						li {
							position: relative;
							cursor: pointer;

							span {
								padding-left: 50px;
							}

							.iconfont {
								position: absolute;
								left: 18px;
								top: 50%;
								transform: translateY(-50%);
								height: 16px;
								width: 16px;
								font-size: 16px;
								line-height: 20px;
							}

							&:hover {
								background-color: rgba(200, 200, 200, .9);
							}

							&.active::after {
								content: '';
								position: absolute;
								left: 0;
								top: 50%;
								transform: translateY(-50%);
								width: 5px;
								height: 25px;
								background-color: #7a7574;
							}
						}
					}
				}

			}

			/deep/ .setting-rigth {
				padding-top: 35px;
				flex: 1;
				background-color: #fff;

				>div {
					padding: 20px 0 0 20px;
					display: flex;
					flex-direction: column;
					height: 100%;

					.title {
						font-size: 30px;
						font-weight: 500;
						margin-bottom: 20px;
					}
				}

				.content {
					overflow-y: auto;
					padding-bottom: 40px;
					.item {
						margin-top: 40px;

						.item-title {
							margin-bottom: 10px;
							font-size: 16px;
						}
					}
				}
				select {
					width: 280px;
					height: 32px;
					padding-left: 10px;
					border: 2px solid #999;

					&:hover {
						border-color: #666;
				}
			}

			}
		}
	}

</style>
