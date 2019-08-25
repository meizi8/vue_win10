const defaultStyle = {
	layout: 1, //任务栏位置 1.bottom 2.left 3.top 4.right
	taskbarHeight: 40, //任务栏高度，bottom,top 有效
	taskbarWidth: 70, //任务栏高度，bottom,top 有效
	backgroundType: 1, //桌面背景 1.图片 2.纯色 3.幻灯片,
	backgroundColor: '#4a5459', //默认背景颜色
	backgroundImg: [require("static/img/wallpaper.jpg")], //默认桌面图片
	integratingDegree: 1, //契合度     1.填充 2.适应 3.拉升 4.平铺 5.居中
}


const localStyle = localStorage.getItem('styleConfig');
let styleConfig;
if (localStyle) {
	styleConfig = JSON.parse(localStyle);
	let temp = false;
	for (const key in defaultStyle) {
		if (styleConfig[key] === undefined) {
			styleConfig[key] = defaultStyle[key];
			temp = true;
		}
	}
	if (temp) {
		updateStyleConfig(styleConfig);
	}
} else {
	styleConfig = defaultStyle;
	localStorage.setItem('styleConfig', JSON.stringify(styleConfig));
}

//保存配置
function updateStyleConfig(styleConfig) {
	localStorage.setItem('styleConfig', JSON.stringify(styleConfig));
}

export default {
	namespaced: true,
	state: {
		...styleConfig
	},
	getters: {
		getNewestBackgroundImg: state => {
			return state.backgroundImg[0];
		}
	},
	mutations: {
		setStyle(state, obj) {
			const key = obj.key;
			const value = obj.value;
			state[key] = value;
			updateStyleConfig(state);
		},
		addBackgroundImg(state, addr) {
			const backgroundImg = state.backgroundImg;
			if (backgroundImg.length >= 5) { //最大存储5张
				backgroundImg.pop();
			}
			backgroundImg.unshift(addr);
			updateStyleConfig(state);
		},
		//切换了背景图片
		toggleBackgroundImg(state, index){
			const backgroundImg = state.backgroundImg;
			backgroundImg.unshift(backgroundImg.splice(index,1)[0]);
			updateStyleConfig(state);
		}
	}
}
