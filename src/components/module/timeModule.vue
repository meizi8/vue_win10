<template>
	<div class="timeModule" @click.stop>
		<div class="header">
			<div class="big">{{curTime | moment('HH:mm:ss')}}</div>
			<span @click='selectCurMonth' class="small">{{curTime | moment('YYYY年MM月DD日')}}</span>
		</div>
		<div class="body">
			<div class="control">
				<div class="selectMonth">{{selectMonth | moment('YYYY年MM月')}}</div>
				<div class="arrow">
					<div class="arrow-top" @click="selectLastMonth">
						<i class="iconfont icon-arrow-up-s"></i>
					</div>
					<div class="arrow-bottom" @click="selectNextMonth">
						<i class="iconfont icon-arrow-down-s"></i>
					</div>
				</div>
			</div>
			<div class="table">
				<div class="title">
					<div class="period" v-for="(item, index) in ['一','二','三','四','五','六','日']" :key="'key1-'+index">
						{{item}}
					</div>
				</div>
				<div class="date" v-if="monthDays">
					<div class="day other" v-for="(day,index) in lastMonthDays" :key="'key2-'+index">
						{{day | moment('D')}}
					</div>
					<div class="day" v-for="(day,index) in monthDays" :key="index"
						:class="curTime.getDate() == day.getDate() && curTime.getFullYear() == day.getFullYear() && curTime.getMonth() == day.getMonth()? 'active':''">
						{{day | moment('D')}}
					</div>
					<div class="day other" v-for="(day,index) in nextMonthDays" :key="'key3-'+index">
						{{day| moment('D')}}
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<span>日期和时间设置</span>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				selectMonth: new Date(), //当前选中月份
				firstDay: null, //选中月份的第一天
				nextMonthFristDay: null, //选中月份的下个月第一天
				monthDays: null, //当前月总共天数
				lastMonthDays: [], //显示上个月的天数
				nextMonthDays: 0, //显示下个月的天数
				col: 6, //显示6行
			}
		},
		computed: {
			...mapState('time',{
				curTime: state=>state.curTime,
			}),
		},
		watch: {
			selectMonth(value) {
				this.firstDay = this.getFirstDay(value);
				this.nextMonthFristDay = this.getNextMonthFristDay(this.firstDay);
				this.monthDays = this.getMonthDays(this.nextMonthFristDay);
				this.lastMonthDays = this.getLastMonthDays(this.firstDay);
				this.nextMonthDays = this.getNextMonthDays(this.lastMonthDays.length, this.monthDays.length, this
					.nextMonthFristDay);
			}
		},
		created() {
			this.selectCurMonth();
		},
		methods: {
			selectCurMonth(){
				this.selectMonth = new Date();
			},
			getFirstDay(month) {
				return new Date(month.setDate(1));
			},
			getNextMonthFristDay(firstDay) {
				return new Date(new Date(this.firstDay).setMonth(this.firstDay.getMonth() + 1));
			},
			getMonthDays(nextMonthFristDay) {
				const lastDay = new Date(nextMonthFristDay.getTime() - 86400000);
				let count = 0;
				const allDate = lastDay.getDate();
				const curMonthDay = [];
				while (allDate > count++) {
					curMonthDay.push(new Date(new Date(lastDay).setDate(count)));
				}
				return curMonthDay;
			},
			getLastMonthDays(firstDay) {
				const lastMonthDays = [];
				for (var i = 1; i < firstDay.getDay(); i++) {
					lastMonthDays.push(new Date(firstDay.getTime() - 86400000 * i))
				}
				return lastMonthDays;
			},
			getNextMonthDays(lastMonthDaysLength, monthDaysLength, nextMonthFristDay) {
				const nextMonthDays = [];
				const needShowSum = this.col * 7 - lastMonthDaysLength - monthDaysLength;
				for (var i = 0; i < needShowSum; i++) {
					nextMonthDays.push(new Date(nextMonthFristDay.getTime() + 86400000 * i));
				}
				return nextMonthDays;
			},
			selectLastMonth() {
				this.selectMonth = new Date(this.selectMonth.setMonth(this.selectMonth.getMonth() - 1));
			},
			selectNextMonth() {
				this.selectMonth = new Date(this.selectMonth.setMonth(this.selectMonth.getMonth() + 1));
			},
		}
	}

</script>

<style lang="less" scoped>
	.timeModule {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 365px;
		height: 500px;
		background-color: #1d1d1deb;
		padding: 5px;
		font-size: 14px;

		.header {
			height: 110px;
			border-bottom: 1px solid #555;
			padding: 20px;

			.big {
				font-size: 42px;
				margin-bottom: 10px;
			}

			.small {
				font-size: 14px;
				color: #d9d1ce;
				cursor: pointer;
				&:hover {
					color: #fff;
				}
			}
		}

		.control {
			display: flex;
			color: #fff;
			height: 50px;
			line-height: 50px;
			padding: 0 20px;

			.selectMonth {
				flex: 5;
				font-size: 14px;
				padding-left: 10px;
			}

			.arrow {
				flex: 2;
				display: flex;
				text-align: center;

				div {
					display: flex;
					flex: 1;
					justify-content: center;
					cursor: pointer;

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
					height: 40px;
					width: 14.2857142857143%;
				}

				.day {
					&.active {
						background-color: #7a7574;
					}

					&.other {
						color: #777;
					}

					&:hover {
						border: 1px solid #000;
					}
				}
			}
		}

		.footer {
			flex: 1;
			padding-left: 34px;
			display: flex;
			align-items: center;

			span {
				cursor: pointer;
				color: #ccc;
				font-size: 13px;

				&:hover {
					color: #bbb;
				}
			}
		}
	}

</style>
