<template>
	<div class="iconList">
		<ul>
			<li v-for="(item, index) in iconList" :key="index">
				<div v-for="(one,idx) in item.multimode" :key="idx">
					<!-- 多状态数量 -->
					<div v-if="one.status==item.status">
						<!-- 找到当前状态 -->
						<div v-if="item.iconfont">
							<!-- 判断是否字体图标 -->
							<i :class="one.className"></i> <!-- 显示对应状态的图标 -->
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "taskicon",
		data() {
			return {};
		},
		created() {},
		computed: {
			iconList() {
				return this.$store.state.taskIcon;
			}
		}
	};

</script>
<style lang="less" scoped>
	.iconList {
		height: 100%;

		ul {
			display: flex;
			height: 100%;

			li {
				height: 100%;
				width: 24px;
				display: flex;
				justify-content: center;
				align-items: center;

				&:hover {
					background-color: rgba(99, 99, 99, 0.4);
				}

				i {
					font-size: 16px;
				}
			}
		}
	}

</style>
