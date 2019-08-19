<template>
	<div class="plate">
		<div class="title">任务栏</div>
		<div class="content">
			<div class="item">
				<div class="item-title">锁定任务栏</div>
				<!-- <select name="" id="" @change='backgroundTypeChange' v-model='backgroundType'>
					<option value="1">图片</option>
					<option value="2">纯色</option>
				</select> -->
			</div>
			<div class="item">
				<div class="item-title">任务栏在屏幕上的位置</div>
				<select @change="setLayout" v-model="layout">
					<option value="2">靠左</option>
					<option value="3">顶部</option>
					<option value="4">顶右</option>
					<option value="1">底部</option>
				</select>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				layout: null,
			}
		},
		created() {
			this.layout = this.$store.state.style.layout; //任务栏位置 1.bottom 2.left 3.top 4.right
			console.log(this.layout);
		},
		methods: {
			setLayout(e) {
				const type = +e.target.value;
				this.$store.commit('setStyle', {
					key: 'layout',
					value: type
				});
			}
		},
	}

</script>
<style lang="less" scoped>

</style>
