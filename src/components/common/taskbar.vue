<template>
    <div class='taskbar'>
        <span>{{ parentMessage }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            parentMessage: {
                type: String,
                default: '这是任务栏'
                // require: true // 必填
            }
		},
		created(){
			console.log(1);
		}
    }
</script>
<style lang="less" scoped>
	.taskbar {
		position: absolute;

	}
</style>


