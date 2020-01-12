/*
* @Author:             old jia
* @Email:              jiaminxin@outlook.com
* @Date:               2020-01-10 18:08:54
* @Last Modified by:   jiandandaoxingfu
* @Last Modified time: 2020-01-12 10:19:11
*/

const axios = require('axios');
const request_headers = {	
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8', 
	'Accept-Encoding': 'gzip, deflate', 
	'Accept-Language': 'zh-CN,zh;q=0.9', 
	'Cache-Control': 'max-age=0', 
	'Connection': 'keep-alive', 
	'Content-Type': 'application/x-www-form-urlencoded', 
	'Host': 'apps.webofknowledge.com', 
	'Origin': 'http://apps.webofknowledge.com/', 
	'Upgrade-Insecure-Requests': 1, 
	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36 OPR/63.0.3368.107', 
}


class Crawl {
	constructor() { }

	search_page(url) {
		return axios({
			url: url, 
			headers: request_headers
		}).then( (res) => {
			let data = res.data.replace(/&amp;/g, '&');
			this.qid = data.match(/qid=(\d+)/)[1];
			// this.cite_num = 
		})
	}
}

exports.Crawl = Crawl;