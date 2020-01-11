/*
 * @Author:       old jia
 * @Date:                2018-09-27 00:14:10
 * @Last Modified by:   jiandandaoxingfu
 * @Last Modified time: 2020-01-11 20:06:26
 * @Email:               jiaminxin@outlook.com
 */

const { Crawl } = require('./spider.js');
const { print2pdf } = require('./print.js');
const {	app, BrowserWindow } = require('electron')
const {	Menu, MenuItem, dialog,	ipcMain } = require('electron')
const {	appMenuTemplate } = require('./appmenu.js')
const path = require('path')


let mainWindow, subWindow, page_type, subWindow_is_show = false;
let crawl = new Crawl(2018);


app.on('ready', function() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 600,
		show: false,
		webPreferences: {
        	javascript: true,
        	plugins: true,
        	nodeIntegration: false, // 不集成 Nodejs
        	webSecurity: false,
        	preload: path.join(__dirname, 'renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
    	}
	})
	mainWindow.maximize()

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
		show: false,
	})

	subWindow.loadURL('http://apps.webofknowledge.com');
	page_type = 'root';

	subWindow.webContents.on('dom-ready', (event) => {
		let url = subWindow.webContents.getURL();
		if( url.includes('no_cite') ) {
			page_type = 'no_cite';
			ipcMain.send('status', 'no_cite');
		} else if( url.includes('no_2018_cite') ) {
			page_type = 'no_2018_cite';
			ipcMain.send('status', 'no_2018_cite');
		}

		if( page_type === 'root' ) {
			crawl.sid = url.match(/SID.*?&/)[0].slice(4, -1);
		} else if( page_type === 'search_result' ) {
			crawl.search_page(url);
			subWindow.webContents.executeJavaScript(`
				let len = document.querySelectorAll('div.search-results-item').length;
				let cite_item = document.querySelector('a.snowplow-times-cited-link');
				if( len > 1 || !cite_item ) {
					window.location.href = 'https://www.baidu.com?error=no_cite';
				} else {
					cite_item.click();
				}
			`)
			page_type = 'cite';
		} else if( page_type === 'cite' ) {
			subWindow.webContents.executeJavaScript(`
				let has_2018 = document.getElementById('PublicationYear_tr').innerHTML.includes('PublicationYear_2018');
				if( has_2018 ) {
					let inputs = document.getElementById('PublicationYear_tr').getElementsByTagName('input');
					let button = document.getElementById('PublicationYear_tr').querySelector('button[alt="精炼"]');
					for( let input of inputs ) {
						if( input.value.includes("2018") ) {
							input.click();
							button.click();
						}
					}
				} else {
					window.location.href = 'https://www.baidu.com?error=no_2018_cite';
				}
			`)
			page_type = 'refine';
		} else if( page_type === 'refine' ) {
			setTimeout(() => {
				print2pdf(subWindow, crawl.title + '_cite_page.pdf', () => {
					ipcMain.send('status', 'cite_page_printed');
				});
			}, 500);
			subWindow.loadURL(`http://apps.webofknowledge.com/OutboundService.do?action=go&displayCitedRefs=true&displayTimesCited=true&displayUsageInfo=true&viewType=summary&product=WOS&mark_id=WOS&colName=WOS&search_mode=GeneralSearch&locale=zh_CN&view_name=WOS-summary&sortBy=PY.D%3BLD.D%3BSO.A%3BVL.D%3BPG.A%3BAU.A&mode=outputService&qid=${crawl.qid}&SID=${crawl.sid}&format=formatForPrint&filters=HIGHLY_CITED+HOT_PAPER+OPEN_ACCESS+PMID+USAGEIND+AUTHORSIDENTIFIERS+ACCESSION_NUM+FUNDING+SUBJECT_CATEGORY+JCR_CATEGORY+LANG+IDS+PAGEC+SABBR+CITREFC+ISSN+PUBINFO+KEYWORDS+CITTIMES+ADDRS+CONFERENCE_SPONSORS+DOCTYPE+ABSTRACT+CONFERENCE_INFO+SOURCE+TITLE+AUTHORS++&selectedIds=1&mark_to=1&mark_from=1&queryNatural=${crawl.title}&count_new_items_marked=0&MaxDataSetLimit=&use_two_ets=false&DataSetsRemaining=&IsAtMaxLimit=&IncitesEntitled=yes&value(record_select_type)=pagerecords&markFrom=1&markTo=1&fields_selection=HIGHLY_CITED+HOT_PAPER+OPEN_ACCESS+PMID+USAGEIND+AUTHORSIDENTIFIERS+ACCESSION_NUM+FUNDING+SUBJECT_CATEGORY+JCR_CATEGORY+LANG+IDS+PAGEC+SABBR+CITREFC+ISSN+PUBINFO+KEYWORDS+CITTIMES+ADDRS+CONFERENCE_SPONSORS+DOCTYPE+ABSTRACT+CONFERENCE_INFO+SOURCE+TITLE+AUTHORS++&&&totalMarked=1`);
			page_type = 'detail';
		} else if( page_type === 'detail' ) {
			setTimeout(() => {
				print2pdf(subWindow, crawl.title + '_detail_page.pdf', () => {
					ipcMain.send('status', 'detail_page_printed');
				});
				console.log('detail_page_printed');
			}, 500);
			page_type = 'done';
		}
	})

	subWindow.on('closed', () => {
		// 通常会把多个 window 对象存放在一个数组里面，
		subWindow = null
	})

	ipcMain.on('search_title_2_main', (event, message) => {
		if( !crawl.sid ) return;
		let url = 'http://apps.webofknowledge.com/WOS_GeneralSearch.do?fieldCount=1&action=search&product=WOS&search_mode=GeneralSearch&SID=_sid_&max_field_count=25&max_field_notice=%E6%B3%A8%E6%84%8F%3A+%E6%97%A0%E6%B3%95%E6%B7%BB%E5%8A%A0%E5%8F%A6%E4%B8%80%E5%AD%97%E6%AE%B5%E3%80%82&input_invalid_notice=%E6%A3%80%E7%B4%A2%E9%94%99%E8%AF%AF%3A+%E8%AF%B7%E8%BE%93%E5%85%A5%E6%A3%80%E7%B4%A2%E8%AF%8D%E3%80%82&exp_notice=%E6%A3%80%E7%B4%A2%E9%94%99%E8%AF%AF%3A+%E4%B8%93%E5%88%A9%E6%A3%80%E7%B4%A2%E8%AF%8D%E5%8F%AF%E4%BB%A5%E5%9C%A8%E5%A4%9A%E4%B8%AA%E5%AE%B6%E6%97%8F%E4%B8%AD%E6%89%BE%E5%88%B0+%28&input_invalid_notice_limits=+%3Cbr%2F%3E%E6%B3%A8%E6%84%8F%3A+%E6%BB%9A%E5%8A%A8%E6%A1%86%E4%B8%AD%E6%98%BE%E7%A4%BA%E7%9A%84%E5%AD%97%E6%AE%B5%E5%BF%85%E9%A1%BB%E8%87%B3%E5%B0%91%E4%B8%8E%E4%B8%80%E4%B8%AA%E5%85%B6%E4%BB%96%E6%A3%80%E7%B4%A2%E5%AD%97%E6%AE%B5%E7%9B%B8%E7%BB%84%E9%85%8D%E3%80%82&sa_params=WOS%7C%7C7AVrjhmEcJpyJsy2QBT%7Chttp%3A%2F%2Fapps.webofknowledge.com%7C%27&formUpdated=true&value%28input1%29=title&value%28select1%29=TI&value%28hidInput1%29=&limitStatus=collapsed&ss_lemmatization=On&ss_spellchecking=Suggest&SinceLastVisit_UTC=&SinceLastVisit_DATE=&period=Range+Selection&range=ALL&startYear=1985&endYear=2020&editions=SCI&editions=SSCI&editions=AHCI&editions=ISTP&editions=ESCI&editions=CCR&editions=IC&update_back2search_link_param=yes&ssStatus=display%3Anone&ss_showsuggestions=ON&ss_numDefaultGeneralSearchFields=1&ss_query_language=&rs_sort_by=PY.D%3BLD.D%3BSO.A%3BVL.D%3BPG.A%3BAU.A';
		url = url.replace('_sid_', crawl.sid)
			     .replace('title', message.title);
		subWindow.loadURL(url);
		crawl.title = message.title;
		page_type = 'search_result';

	});

	ipcMain.on('show_subWindow', (event, message) => {
		if( subWindow_is_show ) {
			subWindow.hide()
		} else {
			subWindow.show();
		}
		subWindow_is_show = !subWindow_is_show;

	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})


