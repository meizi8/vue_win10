<template>
	<div class="wrap" ref="aa" :style="style">
		<ul>
			<li>查看</li>
			<li>排列方式</li>
			<li>刷新</li>
			<li>新建</li>
			<li>个性化</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				style: null
			};
		},
		props: {
			site: Object
		},
		watch: {
			site(obj) {
				let style;
				if (
					this.site.clientX + this.$refs.aa.scrollWidth >
					this.site.clientWidth
				) {
					style = `right: 0;`;
				} else {
					style = `left: ${this.site.clientX}px;`;
				}

				if (
					this.site.clientY + this.$refs.aa.scrollHeight >
					this.site.clientHeight
				) {
					style += `top: ${this.site.clientY -
                    this.$refs.aa.scrollHeight}px;`;
				} else {
					style += `top: ${this.site.clientY}px;`;
				}
				this.style = style;
			}
		}
	};

</script>
<style lang="less" scoped>
	.wrap {
		position: absolute;
		z-index: 99999;
		width: 250px;
		background-color: #f2f2f2;
		color: #000;
		line-height: 24px;

		ul {
			border: 1px solid #a0a0a0;
			box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

			li {
				padding-left: 34px;
				padding-right: 10px;
				position: relative;
				font-size: 12px;
				overflow: hidden;

				&:before {
					content: '';
					position: absolute;
					left: 10px;
					top: 50%;
					width: 16px;
					height: 16px;
					margin-top: -8px;
					background-color: #ff0;
				}

				&:hover {
					background-color: #d9d9d9;
				}
			}
		}
	}

</style>
