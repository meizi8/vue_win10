<template>
	<div class="window-contorl" @click="contorlClick" @contextmenu.prevent.stop="contorlClick" ref="move">
		<slot v-if="fatherDom" :father="fatherDom"></slot>
	</div>
</template>
<script>
	import { hideAllModule } from '../../module.bus';
	export default {
		data(){
			return {
				fatherDom: null,
			}
		},
		created() {

		},
		mounted(){
			this.fatherDom = this.$refs.move;
		},
		methods: {
			contorlClick(){
				hideAllModule();
			}
		}
	}

</script>
<style lang="less" scoped>
	.window-contorl {
		position: absolute;
	}
</style>

