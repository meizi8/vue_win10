<template>
	<div class="error">
		<span class="aaa">404</span> <br><br><br><br><br><br>
		<span class="bbb">{{time}}秒后回到首页,或<span class="gohome" @click="goHome">点击此处</span>立即跳转</span>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				time: 3
			};
		},
		created() {},
		mounted() {
			const s1 = () => {
				if (--this.time > 0) {
					this.timeout = setTimeout(s1, 1000);
				} else {
					this.goHome();
				}
			};
			s1();
		},
		methods: {
			goHome() {
				this.$router.push("/");
			}
		}
	};

</script>
<style lang="less" scoped>
	.error {
		text-align: center;
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translate(-50%, -50%);

		.aaa {
			font-size: 100px;
		}

		.bbb {
			font-size: 40px;

			.gohome {
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}

</style>
