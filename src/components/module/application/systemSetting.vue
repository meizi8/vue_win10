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
							<div class="content">
								<div class="example">
									<div class="exampleBG" :style="backgroundStyle">
										<div class="exampleStartMenu">
											<div>开始菜单(写不动了)</div>
										</div>
									</div>
									<div class="exampleContarl"></div>
								</div>
								<div class="item background-setting">
									<div class="item-title">背景</div>
									<select name="" id="" @change='backgroundTypeChange' v-model='backgroundType'>
										<option value="1">图片</option>
										<option value="2">纯色</option>
										<!-- <option value="">幻灯片放映</option> -->
									</select>
								</div>
								<div class="item selectImg" v-if="backgroundType==1">
									<div class="item-title">选择图片</div>
									<div class="historyImg clearfix">
										<div v-for="(item,index) in userSetBackgroundImg" :key="index" @click="toggleBackgroundImg(index)">
											<div :style="'background:url('+ item +') center center/cover no-repeat;height:100%;'"></div>
										</div>
									</div>
									<label class="selectImgBtn">
										浏览
										<input type="file" accept="image/jpeg,image/jpg,image/png,image/bmp" @change="photoUpload" style="display:none;">
									</label>
								</div>
								<div class="item IntegratingDegree" v-if="backgroundType==1">
									<div class="item-title">选择契合度</div>
									<select name="" id="" @change='setIntegratingDegree' v-model='integratingDegree'>
										<option value="1">填充</option>
										<option value="2">适应</option>
										<option value="3">拉升</option>
										<option value="4">平铺</option>
										<option value="5">居中</option>
									</select>
								</div>
								<div class="item backgroundColor-setting">
									<div class="item-title">选择你的颜色</div>
									<div class="color-box">
										<div v-for="(item,index) in backgroundColorList" :key="index" :style="'background-color:'+ item + ';'" :class="item==userSetBackgroundColor?'active':''" @click='backgroundColorChange(item)'></div>
									</div>
								</div>
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
	import api from 'http/api.js';
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
				}, ],
				backgroundType: null,
				integratingDegree: null,
				backgroundColorList: ['#ff8c00','#e81123','#d13438','#c30052','#bf0077','#9a0089','#881798','#744da9','#10893e','#107c10','#018574','#2d7d9a','#0063b1','#6b69d6','#8e8cd8','#8764b8','#038387','#486860','#525e54','#7e735f','#4c4a48','#515c6b','#4a5459','#000000'],
			}
		},
		created() {
			this.bus.$once('pageChange', page => {
				console.log('systemSetting pageChange: ', page);
				this.page = page;
			});
			this.backgroundType = this.$store.state.style.backgroundType;
			this.integratingDegree = this.$store.state.style.integratingDegree;
		},
		computed: {
			userSetBackgroundColor() {
				return this.$store.state.style.backgroundColor;
			},
			userSetBackgroundImg() {
				return this.$store.state.style.backgroundImg;
			},
			backgroundStyle(){
				if(this.$store.state.style.backgroundType == 1){
					return `background: ${this.userSetBackgroundColor} url('${this.$store.getters.getNewestBackgroundImg}') center center/cover no-repeat;`
				} else {
					return `background-color: ${this.userSetBackgroundColor};`
				}
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
			backgroundTypeChange(e) {
				const type = +e.target.value;
				this.$store.commit('setStyle', {
					key: 'backgroundType',
					value: type
				});
			},
			backgroundColorChange(color){
				this.$store.commit('setStyle', {
					key: 'backgroundColor',
					value: color
				});
			},
			photoUpload(e){
				const file = e.target.files[0];
				const formData = new FormData();
				formData.append('file', file);
				this.$axios.post(api.photoUpload,formData,{
					onUploadProgress: progressEvent => {
						let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
						console.log(complete);	//上传文件进度
					}
				}).then(res=>{
					if(res.data.code == 0){
						const url = api.baseUrl + res.data.data.url;
						this.$store.commit('addBackgroundImg', url);
					}
				})
			},
			//切换了选中图片
			toggleBackgroundImg(index){
				this.$store.commit('toggleBackgroundImg', index);
			},
			//选择契合度
			setIntegratingDegree(e){
				const type = +e.target.value;
				this.$store.commit('setStyle', {
					key: 'integratingDegree',
					value: type
				});
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

						&.background-setting,
						&.IntegratingDegree {
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
						&.backgroundColor-setting {
							.color-box {
								width: 346px;
								div {
									float: left;
									width: 40px;
									height: 40px;
									margin-right: 2px;
									margin-bottom: 2px;
									&.active {
										border: 2px solid #000;
										position: relative;
										&::after {
											content: '√';
											position: absolute;
											width: 20px;
											height: 20px;
											line-height: 20px;
											top: 0;
											right: 0;
											background-color: #000;
											color: #fff;
											text-align: center;
										}
									}
								}
							}
						}
						&.selectImg {
							.historyImg {
								> div {
									float: left;
									width: 76px;
									height: 76px;
									margin-right: 3px;
								}
							}
							.selectImgBtn {
								margin-top: 5px;
								display: inline-block;
								text-align: center;
								width: 90px;
								height: 30px;
								line-height: 30px;
								background-color: #ccc;
								box-sizing: border-box;
								&:hover {
									line-height: 26px;
									border: 2px solid #7a7a7a;
								}
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

					.exampleStartMenu {
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

				.exampleContarl {
					width: 100%;
					height: 10px;
					background-color: #040404;
				}
			}
		}

	}

</style>
