import folder from "./fileSystem/folder";
const allFile = localStorage.getItem('fileSystem');
const fileSystem = allFile ? JSON.parse(allFile) : [{type:'notepad',name: '使用帮助.txt' ,localData:'这是个寂寞的天，下着有些伤心的雨'}];


