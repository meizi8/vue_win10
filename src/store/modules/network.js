const update = {
	callback: function () {}
};
window.addEventListener("online", function () {
	//网络在线
	update.callback(true);
})

window.addEventListener("offline", function () {
	//网络离线
	update.callback(false);
})
module.exports = {
	value: navigator.onLine,
	update
};
