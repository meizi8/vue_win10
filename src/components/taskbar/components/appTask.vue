<template>
	<div :class="['appTask',layout]">
		<div v-for="item in appList" :key="item.id" class="appItem" @click="item.click">
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
			},
			layout(){
				return ['bottom','left','top','right'][this.$store.state.style.layout-1];
			}
		}
	}
</script>
<style lang="less" scoped>
	.appTask {
		height: 100%;
		&.top .appItem {
			&:hover::before,.wrap::before  {
				top: 0;
			}
		}
		&.bottom .appItem {
			&:hover::before,.wrap::before  {
				bottom: 0;
			}
		}
		&.right .appItem {
			&:hover::before,.wrap::before  {
				right: 0;
			}
		}
		&.left .appItem {
			&:hover::before,.wrap::before  {
				left: 0;
			}
		}

		&.bottom,&.top {
			.appItem {
				position: relative;
				float: left;
				height: 100%;
				width: 160px;
				padding: 0 5px;
				box-sizing: border-box;
				.wrap {
					height: 100%;
					display: flex;
					align-items: center;
					padding: 0 5px;
					position: relative;
					&::before {
						content: '';
						position: absolute;
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
					width: 100%;
					border-bottom: 2px solid #cdc6c4;
				}
			}
		}
		&.left,&.right {
			.appItem {
				position: relative;
				height: 50px;
				padding: 5px 0px;
				box-sizing: border-box;
				width: 100%;
				margin-top: 1px;
				.wrap {
					height: 100%;
					display: flex;
					align-items: center;
					padding: 0 5px;
					position: relative;
					&::before {
						content: '';
						position: absolute;
						height: 100%;
						top: 0;
						border-left: 2px solid #cdc6c4;
					}
					i {
						font-size: 18px;
						margin-left: 5px;
					}
					span {
						margin-left: 5px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 12px;
						line-height: 14px;
					}
				}
				&:hover {
					background-color: rgba(99, 99, 99, 0.4);
				}
				&:hover::before {
					content: '';
					position: absolute;
					top: 0;
					height: 100%;
					border-left: 2px solid #cdc6c4;
				}
			}
		}
	}
</style>
