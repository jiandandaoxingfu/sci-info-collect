/*
 * @Author:       old jia
 * @Date:                2018-09-27 00:14:10
 * @Last Modified by:   Administrator
 * @Last Modified time: 2020-01-10 17:53:30
 * @Email:               jiaminxin@outlook.com
 */
const {	app, BrowserWindow } = require('electron')
const {	Menu, MenuItem, dialog,	ipcMain } = require('electron')
const {	appMenuTemplate } = require('./appmenu.js')
const path = require('path')

let mainWindow, subWindow;

app.on('ready', function() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 600,
		webPreferences: {
        	javascript: true,
        	plugins: true,
        	nodeIntegration: false, // 不集成 Nodejs
        	webSecurity: false,
        	preload: path.join(__dirname, 'renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
    	}
	})

	mainWindow.loadURL('http://localhost:3000/')
	// mainWindow.webContents.openDevTools({mode:'right'});
	mainWindow.on('closed', () => {
		// 通常会把多个 window 对象存放在一个数组里面，
		mainWindow = null
	})
	const menu = Menu.buildFromTemplate(appMenuTemplate)
	Menu.setApplicationMenu(menu);


	subWindow = new BrowserWindow({
		width: 1200,
		height: 600,
		webPreferences: {
        	javascript: true,
        	plugins: true,
        	nodeIntegration: false, // 不集成 Nodejs
        	webSecurity: false,
        	preload: path.join(__dirname, 'renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API        	
    	}
	})

	subWindow.loadURL('http://apps.webofknowledge.com/WOS_GeneralSearch_input.do?product=WOS&SID=7DBXuf8BGjDHjAXvhAb&search_mode=GeneralSearch')
	// subWindow.webContents.openDevTools({mode:'right'});
	subWindow.on('closed', () => {
		// 通常会把多个 window 对象存放在一个数组里面，
		subWindow = null
	})



	ipcMain.on('search_title_2_main', (event, message) => {
		subWindow.loadURL('http://apps.webofknowledge.com/WOS_GeneralSearch_input.do?product=WOS&SID=7DBXuf8BGjDHjAXvhAb&search_mode=GeneralSearch');
		subWindow.webContents.executeJavaScript(`
			document.getElementById('value(input1)').value = "${message.title}";
			document.getElementById('select2-select1-container').innerHTML='标题'; 
			document.getElementById('searchCell1').firstElementChild.firstElementChild.click();
		`)
		mainWindow.webContents.send('search_title_to_subwindow', message);
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})