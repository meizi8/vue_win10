const curTime = {};
function updateTime() {
	curTime.time = new Date();
	setTimeout(updateTime, 1000);
}
updateTime();

module.exports = curTime;
