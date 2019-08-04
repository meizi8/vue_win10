<template>
	<div id="systemSetting" style="width:1265px;height:860px">
		<!-- <div class="win-contarl">
			设置
		</div> -->
		<div class="setting-left">
			<div class="win-title">设置</div>
			<div class="subject">
				<div class="title">个性化</div>
				<ul class="menu">
					<li>背景</li>
					<li>颜色</li>
				</ul>
			</div>

		</div>
		<div class="setting-rigth">
			<div class="win-control">
				<div class="minimize">最小化</div>
				<div class="Windowed">窗口化</div>
				<div class="maximize">最大化</div>
				<div class="close">关闭</div>
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

			}
		},
		created() {
			this.bus.$on('pageChange', page => {
				console.log('systemSetting pageChange: ', page);
				this.page = page;
			})
		}
	}

</script>
<style lang="less" scoped>
	#systemSetting {
		color: #000;
		position: absolute;
		left: 20px;
		top: 50px;
		display: flex;

		.setting-left {
			width: 320px;
			background-color: rgba(255, 255, 255, .9);
			.subject {
				.menu {
					line-height: 48px;
					font-size: 14px;
					li {
						&:hover {
							background-color: rgba(200, 200, 200, .9);
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
