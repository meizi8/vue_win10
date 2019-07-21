<template>
	<div :class="getSytle">
		<div class="win">
			<i class="iconfont icon-windows"></i>
		</div>
		<div class="tasks"></div>
		<div class="icon">站位aasdasda</div>
		<div class="time">{{getCurtime}}</div>
		<div class="message">
			<i class="iconfont icon-message"></i>
		</div>
		<div class="showDesktop"></div>
	</div>
</template>

<script>
	import curTime from '@/commonJs/curTime'
	export default {
		data() {
			return {
				position: 'left'
			}
		},
		props: {

		},
		created() {
			// setInterval(() => {

			// 	console.log(curTime);
			// }, 1000);
			// this.timeInit();
		},
		computed:{
			getSytle(){
				return ['bottom','left','top','right'][this.$store.state.style.layout - 1];
			},
			getCurtime(){
				return curTime.time;
			}
		},
		methods: {
			// timeInit(){
			// 	const updateTime = () => {
			// 		this.curTime = new Date();
			// 	}
			// 	updateTime();
			// 	setTimeout(updateTime, 1000);
			// }
		},
		filters: {

		}
	}

</script>

<style lang="stylus" scoped>
	.taskbar
		display flex
		.win
			display flex
			align-items center
			justify-content center
			width 60px
			.iconfont
				font-size 28px
		.message
			width 50px
			display flex
			align-items center
			justify-content center
			.iconfont
				font-size 20px
		.win:hover ,.showDesktop:hover ,.message:hover
			background-color rgba(255,255,255,.2)



		&.bottom,&.top
			background-color #141617
			color #fff
			// .win
			// 	display flex
			// 	align-items center
			// 	justify-content center
			// 	width 60px
			.tasks
				flex 1
				background-color #ccc
			.showDesktop
				width 10px
				border-left .5px solid #fff;

</style>
