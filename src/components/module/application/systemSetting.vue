<template>
	<div>
		{{page}}
	</div>
</template>
<script>
export default {
	data(){
		return {
			
		}
	},
	created(){
		this.bus.$on('pageChange',page => {
			console.log('systemSetting pageChange: ',page);
			this.page = page;
		})
	}
}
</script>
<style lang="less" scoped>
	div {
		font-size: 99px;
		color: #fff;
	}
</style>

