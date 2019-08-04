<template>
	<div id="systemSetting" style="width:1022px;height:730px">
		<div class="setting-left">
			<div class="win-title">设置</div>
			<div class="subject">
				<div class="title">个性化</div>
				<ul class="menu">
					<li v-for="item in menuList" :key="item.flot" :class="page==item.flot?'active':''" @click='togglePage(item.flot)'>
						<i class="icon"></i>
						<span>{{item.text}}</span>
					</li>
				</ul>
			</div>

		</div>
		<div class="setting-rigth">
			<div class="win-control">
				<div class="minimize">最小化</div>
				<div class="Windowed">窗口化</div>
				<div class="maximize">最大化</div>
				<div class="close" @click="close">关闭</div>
			</div>
			<div class="backgrounp" v-show="page=='backgrounp'">
				背景页面
			</div>
			<div class="color" v-show="page=='color'">
				颜色页面
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				page: '',
				menuList: [{
					flot:'backgrounp',
					text:'背景',
				},{
					flot:'color',
					text:'颜色',
				},]
			}
		},
		created() {
			this.bus.$once('pageChange', page => {
				console.log('systemSetting pageChange: ', page);
				this.page = page;
			})
		},
		methods: {
			togglePage(e){
				this.page = e;
			},

			close(){
				this.bus.$emit('destroy')
			}
		},
	}

</script>
<style lang="less" scoped>
	#systemSetting {
		color: #000;
		position: absolute;
		left: 20px;
		top: 50px;
		display: flex;
		border: 1px solid #707070;

		.setting-left {
			width: 320px;
			background-color: rgba(255, 255, 255, .9);

			.subject {
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
			flex: 1;
			background-color: #fff;

			.win-control {
				display: flex;
				justify-content: flex-end;
			}
		}
	}

</style>
