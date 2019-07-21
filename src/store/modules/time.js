const update = {
	callback: function () {}
};
function updateTime() {
	update.callback(new Date());
	setTimeout(updateTime, 1000);
}
updateTime();

export default {
	value: new Date(),
	update
};
