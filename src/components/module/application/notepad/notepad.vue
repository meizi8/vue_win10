<template>
	<windowContarl @contextmenu.prevent.stop="rightClick" style="min-width: 500px;min-height:320px;width:1022px;height:730px;left: 20px;top: 50px;" :style="'z-index:'+zIndex+';'" v-show="isShow">
		<template v-slot:default="slotProps">
			111111111111111111111111
		</template>
	</windowContarl>
</template>

<script>
	import windowContarl from '../common/window-contarl';
	export default {
		data(){
			return {
				isShow: true,
				zIndex: 99999,
			}
		},
		created(){

		},
		components: {
			windowContarl
		}
	}
</script>

<style lang="less" scoped>
	* {
		color: #000;
	}
</style>
