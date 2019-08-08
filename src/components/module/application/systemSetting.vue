<template>
	<windowContarl @contextmenu.prevent.stop="rightClick" style="min-width: 500px;">
  		<template v-slot:default="slotProps">
			<div id="systemSetting">
				<div class="win-header" v-drag:target="slotProps.father">
					<div class="win-title">设置</div>
					<div class="win-control">
						<div class="minimize">
							<i class="iconfont icon-minimality"></i>
						</div>
						<div class="windowed">
							<i class="iconfont icon-windowed"></i></div>
						<div class="maximize">
							<i class="iconfont icon-maximize"></i></div>
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
									<i class="icon"></i>
									<span>{{item.text}}</span>
								</li>
							</ul>
						</div>

					</div>
					<div class="setting-rigth">
						<div class="backgrounp" v-show="page=='backgrounp'">
							背景页面
						</div>
						<div class="color" v-show="page=='color'">
							颜色页面
						</div>
					</div>
				</div>
			</div>
  		</template>
	</windowContarl>
</template>
<script>
	import {
		hideAllModule
	} from '../module.bus.js'
	import windowContarl from './common/window-contarl';
	export default {
		data() {
			return {
				page: '',
				menuList: [{
					flot: 'backgrounp',
					text: '背景',
				}, {
					flot: 'color',
					text: '颜色',
				}, ]
			}
		},
		created() {
			this.bus.$once('pageChange', page => {
				console.log('systemSetting pageChange: ', page);
				this.page = page;
			})
		},
		methods: {
			togglePage(e) {
				this.page = e;
			},
			rightClick() {
				hideAllModule();
			},

			close() {
				this.bus.$emit('destroy')
			}
		},
		components: {
			windowContarl
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

							.icon {
								position: absolute;
								left: 18px;
								top: 50%;
								transform: translateY(-50%);
								background-color: yellow;
								height: 20px;
								width: 20px;
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

			.setting-rigth {
				padding-top: 35px;
				flex: 1;
				background-color: #fff;
			}
		}


	}

</style>
