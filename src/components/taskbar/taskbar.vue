<template>
	<div :class="getSytle">
		<div class="win">
			<i class="iconfont icon-windows"></i>
		</div>
		<div class="tasks"></div>
		<div class="taskicon">
			<taskicon></taskicon>
		</div>
		<div class="time">
			<div class="detail">{{getCurTime | moment('HH:mm')}}</div>
			<div class="date">{{getCurTime | moment('YYYY/MM/DD')}}</div>
		</div>
		<div class="message">
			<i class="iconfont icon-message"></i>
		</div>
		<div class="showDesktop"></div>
	</div>
</template>

<script>
	import taskicon from './components/taskicon'
	export default {
		data() {
			return {

			}
		},
		props: {

		},
		created() {

		},
		computed:{
			getSytle(){
				return ['bottom','left','top','right'][this.$store.state.style.layout - 1];
			},
			getCurTime(){
				return this.$store.state.curTime;
			}
		},
		methods: {

		},
		components: {
			taskicon
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
			width 48px
			.iconfont
				font-size 22px
		.message
			width 50px
			display flex
			align-items center
			justify-content center
			.iconfont
				font-size 20px
		.win:hover ,.showDesktop:hover ,.message:hover ,.time:hover
			background-color rgba(99,99,99,.4)

		&.bottom,&.top
			background-color #141617
			color #fff
			// .win
			.time
				display flex
				flex-direction column
				align-items center
				justify-content space-around
				padding 3px 8px
			.tasks
				flex 1
				// background-color #ccc
			.showDesktop
				width 10px
				border-left .5px solid #fff;
			.taskicon
				display flex
				align-items center
				justify-content center
				padding-left 8px
				padding-right 8px
</style>
