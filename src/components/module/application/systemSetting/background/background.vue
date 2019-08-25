<template>
	<div class="plate">
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
				</select>
			</div>
			<div class="item selectImg" v-if="backgroundType==1">
				<div class="item-title">选择图片</div>
				<div class="historyImg clearfix">
					<div v-for="(item,index) in userSetBackgroundImg" :key="index" @click="toggleBackgroundImg(index)">
						<div :style="'background:url('+ item +') center center/cover no-repeat;height:100%;'"></div>
					</div>
				</div>
				<div class="selectImgBtn">
					<label>
						浏览
						<input type="file" accept="image/jpeg,image/jpg,image/png,image/bmp" @change="photoUpload"
							style="display:none;">
					</label>
					<span class="progress" v-if="progress">
						<span class="current" :style="`background-color: ${this.$store.state.style.backgroundColor};width: ${this.progress};`"></span>
					</span>
				</div>
			</div>
			<div class="item IntegratingDegree" v-if="backgroundType==1">
				<div class="item-title">选择契合度</div>
				<select name="" id="" @change='setIntegratingDegree' v-model='integratingDegree'>
					<option value="1">填充</option>
					<option value="2">适应</option>
					<option value="3">拉升</option>
					<option value="4">平铺</option>
				</select>
			</div>
			<div class="item backgroundColor-setting">
				<div class="item-title">选择你的颜色</div>
				<div class="color-box">
					<div v-for="(item,index) in backgroundColorList" :key="index"
						:style="'background-color:'+ item + ';'" :class="item==userSetBackgroundColor&&'active'"
						@click='backgroundColorChange(item)'></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import api from 'http/api.js';
	export default {
		data() {
			return {
				backgroundType: null,
				integratingDegree: null,
				progress: null,	//文件上传进度
				backgroundColorList: ['#ff8c00', '#e81123', '#d13438', '#c30052', '#bf0077', '#9a0089', '#881798',
					'#744da9', '#10893e', '#107c10', '#018574', '#2d7d9a', '#0063b1', '#6b69d6', '#8e8cd8', '#8764b8',
					'#038387', '#486860', '#525e54', '#7e735f', '#4c4a48', '#515c6b', '#4a5459', '#000000'
				],
			}
		},
		created() {
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
			backgroundStyle() {
				let style
				switch (this.$store.state.style.backgroundType) {
					case 1: //图片
						const integratingDegree = this.$store.state.style.integratingDegree;
						style =
							`background-color: ${this.$store.state.style.backgroundColor};background-image: url('${this.$store.getters['style/getNewestBackgroundImg']}');`;
						// 1.填充 cover
						// 2.适应 center center/contain  no-repeat
						// 3.拉升 center center/100% 100%  no-repeat
						// 4.平铺 contain repeat
						if (integratingDegree === 1) {
							style += 'background-position: center center;';
							style += 'background-size: cover;';
							style += 'background-repeat: no-repeat;';
						} else if (integratingDegree === 2) {
							style += 'background-position: center center;';
							style += 'background-size: contain;';
							style += 'background-repeat: no-repeat;';
						} else if (integratingDegree === 3) {
							style += 'background-position: center center;';
							style += 'background-size: 100% 100%;';
							style += 'background-repeat: no-repeat;';
						} else if (integratingDegree === 4) {
							style += 'background-size: contain;';
						}
						break;
					case 2: //纯色
						style = `background-color: ${this.$store.state.style.backgroundColor};`;
						break;

					default:
						break;
				}
				return style;
			}
		},
		methods: {
			backgroundTypeChange(e) {
				const type = +e.target.value;
				this.$store.commit('style/setStyle', {
					key: 'backgroundType',
					value: type
				});
			},
			backgroundColorChange(color) {
				this.$store.commit('style/setStyle', {
					key: 'backgroundColor',
					value: color
				});
			},
			photoUpload(e) {
				const file = e.target.files[0];
				const formData = new FormData();
				formData.append('file', file);
				this.progress = '0%';
				this.$axios.post(api.photoUpload, formData, {
					onUploadProgress: progressEvent => {
						this.progress = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';	//更新文件上传进度
					}
				}).then(res => {
					if (res.data.code == 0) {
						const url = api.baseUrl + res.data.data.url;
						this.$store.commit('style/addBackgroundImg', url);
					}
				}).finally(()=>{
					this.progress = null;
				})
			},
			//切换了选中图片
			toggleBackgroundImg(index) {
				this.$store.commit('style/toggleBackgroundImg', index);
			},
			//选择契合度
			setIntegratingDegree(e) {
				const type = +e.target.value;
				this.$store.commit('style/setStyle', {
					key: 'integratingDegree',
					value: type
				});
			}
		},
	}

</script>
<style lang="less" scoped>
	.plate {
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

		.backgroundColor-setting {
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

		.selectImg {
			.historyImg {
				>div {
					float: left;
					width: 76px;
					height: 76px;
					margin-right: 3px;
				}
			}
			.selectImgBtn {
				position: relative;
				margin-top: 5px;
				label {
					display: inline-block;
					text-align: center;
					width: 90px;
					height: 30px;
					line-height: 30px;
					background-color: #ccc;
					box-sizing: border-box;

					&:hover {
						// line-height: 26px;
						// border: 2px solid #7a7a7a;
						box-shadow: inset 0 0 0px 2px #7a7a7a;
					}
				}
				.progress {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					margin-left: 50px;
					width: 100px;
					height: 3px;
					line-height: 3px;
					border-radius: 10px;
					text-align: center;
					color: #fff;
					background-color: #ccc;
					.current {
						position: absolute;
						overflow: hidden;
						left: 0;
						height: 100%;
						border-radius: 10px;
					}
				}
			}
		}
	}

</style>
