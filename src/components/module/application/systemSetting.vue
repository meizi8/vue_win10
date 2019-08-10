<template>
	<windowContarl @contextmenu.prevent.stop="rightClick" style="min-width: 500px;min-height:320px;">
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
						<div class="background" v-show="page=='background'">
							<div class="title">背景</div>
							<div class="example">
								<div class="exampleBG" style="background-color:#4c4a48;">
									<div class="exampleStartMenu">
										<div>开始菜单(写不动了)</div>
									</div>
								</div>
								<div class="exampleContarl"></div>
							</div>
							<div class="item background-setting">
								<div class="item-title">背景</div>
								<select name="" id="" @change='backgroundSetting' v-model='backgroundSet'>
									<option value="1">图片</option>
									<option value="2">纯色</option>
									<!-- <option value="">幻灯片放映</option> -->
								</select>
							</div>
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
					flot: 'background',
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
		computed: {
			backgroundSet(){
				console.log('=================');
				return this.$store.state.style.background;
			}
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
			},
			backgroundSetting(e){
				// console.log(e.target.value);
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
				> div {
					padding: 20px;
				}
				.title {
					font-size: 30px;
					font-weight: 500;
					margin-bottom: 20px;
				}
				.item {
					margin-top: 30px;
					.item-title {
						margin-bottom: 10px;
						font-size: 20px;
					}
					&.background-setting {
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
		}

		.background {
			.example {
				position: relative;
				width: 320px;
				height: 190px;
				.exampleBG {
					height: 180px;
					width: 100%;
					position: relative;
					.exampleStartMenu{
						position: absolute;
						left: 0;
						bottom: 0;
						width: 150px;
						height: 120px;
						background-color: #0c0b0b;
						color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
				.exampleContarl{
					width: 100%;
					height: 10px;
					background-color: #040404;
				}
			}
		}

	}

</style>
