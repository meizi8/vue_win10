<template>
	<div class="timeModule">
		<div class="header">
			<div class="big">{{curTime | moment('HH:mm:ss')}}</div>
			<div class="small">{{curTime | moment('YYYY年MM月DD日')}}</div>
		</div>
		<div class="body">
			<div class="control">
				<div class="selectMouth">{{selectMouth | moment('YYYY年MM月')}}</div>
				<div class="arrow">
					<div class="arrow-top">
						<i class="iconfont icon-arrow-up-s"></i>
					</div>
					<div class="arrow-bottom">
						<i class="iconfont icon-arrow-down-s"></i>
					</div>
				</div>
			</div>
			<div class="table">
				<div class="title">
					<div class="period" v-for="(item, index) in ['一','二','三','四','五','六','日']" :key="index">
						{{item}}
					</div>
				</div>
				<div class="date" v-if="mouthDays">
					<div class="day" v-for="(day,idx) in mouthDays" :key="idx">
						<div v-if="curTime.getDate() == day" class="active">
							{{day}}
						</div>
						<div v-else>
							{{day}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selectMouth: new Date(),
				firstDay: null,
				lastDay: null,
				mouthDays: null,
			}
		},
		computed: {
			curTime() {
				return this.$store.state.curTime;
			}
		},
		watch: {
			selectMouth(value) {
				console.log(value);
				this.firstDay = new Date(new Date(this.selectMouth).setDate(1));
				console.log('firstDay', this.firstDay);
				this.lastDay = new Date(new Date(this.firstDay).setMonth(this.firstDay.getMonth() + 1));
				console.log('lastDay', this.lastDay);
				this.mouthDays = (this.lastDay - this.firstDay) / 86400000;
				console.log('mouthDays', this.mouthDays);
			}
		},
		created() {
			// this.selectMouth = new Date();
			var date = new Date();
			date.setMonth(date.getMonth()+1);
			this.selectMouth = date;
		},
	}

</script>

<style lang="less" scoped>
	.timeModule {
		box-sizing: border-box;
		width: 365px;
		height: 500px;
		background-color: #292c2d;
		padding: 5px;

		.header {
			height: 110px;
			border-bottom: 1px solid #555;
			padding: 20px;

			.big {
				font-size: 42px;
			}

			.small {
				margin-top: 10px;
				font-size: 14px;
				color: #d9d1ce;
			}
		}

		.control {
			display: flex;
			color: #fff;
			height: 50px;
			line-height: 50px;
			padding: 0 20px;

			.selectMouth {
				flex: 5;
				font-size: 14px;
			}

			.arrow {
				flex: 2;
				display: flex;
				text-align: center;
				// justify-content: flex-end;

				div {
					// flex: 1;
					display: flex;

					.iconfont {
						font-size: 26px;
					}
				}
			}
		}

		.table {

			box-sizing: border-box;
			padding: 0 20px;

			.date,
			.title {
				display: flex;
				flex-wrap: wrap;

				.day,
				.period {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 35px;
					width: 14.2857142857143%;
				}

				.day {
					.active {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #7a7574;
					}

					&:hover {
						border: 1px solid #000;
					}
				}
			}
		}
	}

</style>
