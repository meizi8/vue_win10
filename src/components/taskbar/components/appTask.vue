<template>
	<div class="appTask">
		<div v-for="item in appList" :key="item.id" class="appItem">
			<div class="wrap">
				<i v-if="item.iconfont" class="iconfont" :class="item.iconClass"></i>
				<span>{{item.appName}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		computed: {
			appList(){
				return this.$store.getters['appTaskManage/getList'];
			}
		}
	}
</script>
<style lang="less" scoped>
	.appTask {
		height: 100%;
		.appItem {
			float: left;
			height: 100%;
			width: 160px;
			padding: 0 5px;
			box-sizing: border-box;
			position: relative;
			.wrap {
				height: 100%;
				display: flex;
				align-items: center;
				padding: 0 5px;
				position: relative;
				&::before {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					border-bottom: 2px solid #cdc6c4;
				}
				i {
					font-size: 18px;
				}
				span {
					margin-left: 10px;
				}
			}
			&:hover {
				background-color: rgba(99, 99, 99, 0.4);
			}
			&:hover::before {
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				border-bottom: 2px solid #cdc6c4;
			}
		}
	}
</style>
